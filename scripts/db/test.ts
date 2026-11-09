import assert from "node:assert/strict";
import { execFile, execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { join, resolve } from "node:path";
import { buildSeedSql } from "./seed";
import { DatabaseError, quote, seedAccounts, type Database, type Query } from "../../tests/database/support";
import { testAccounts } from "../../tests/database/accounts.test";
import { testContent } from "../../tests/database/content.test";
import { testConcurrency } from "../../tests/database/concurrency.test";

const approvedTemp = "/private/var/folders/2s/gmx5h6890s93d84f4rjrcsq80000gn/T/opencode";
const owner = "waymark_test_owner";
const databaseName = "waymark_isolated_test";
const project = resolve(process.argv[1] ? join(process.argv[1], "../../..") : ".");

async function unusedPort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") return server.close(() => reject(new Error("No test port allocated.")));
      server.close((error) => error ? reject(error) : resolvePort(address.port));
    });
  });
}

function prefixed(statement: string, options: Query = {}): string {
  return `\\set VERBOSITY verbose\nset statement_timeout = '15s';\nset lock_timeout = '8s';\nset standard_conforming_strings = on;\n${options.role ? `set role ${options.role};\n` : ""}${options.claims ? `set request.jwt.claims = ${quote(JSON.stringify(options.claims))};\n` : ""}${statement}\n`;
}

async function main(): Promise<void> {
  assert(process.argv.slice(2).every((arg) => arg === "--keep"), "Usage: npx tsx scripts/db/test.ts [--keep]");
  assert(existsSync(approvedTemp), "The approved temporary directory must exist.");
  const root = mkdtempSync(join(approvedTemp, "waymark-db-"));
  const data = join(root, "data");
  const log = join(root, "postgres.log");
  const port = await unusedPort();
  assert.notEqual(port, 5432, "Never use the default PostgreSQL port.");
  let stopped = false;
  let passed = 0;
  let succeeded = false;
  const env = { ...process.env, ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("PG"))),
    PGHOST: "127.0.0.1", PGHOSTADDR: "127.0.0.1", PGPORT: String(port), PGUSER: owner,
    PGDATABASE: databaseName, PGCONNECT_TIMEOUT: "5", PGPASSFILE: join(root, "no-password-file"),
    PGSSLMODE: "disable", PGAPPNAME: "waymark-isolated-database-tests" };
  const args = ["-X", "--no-password", "--host", "127.0.0.1", "--port", String(port), "--username", owner,
    "--dbname", databaseName, "-qAt", "-v", "ON_ERROR_STOP=1"];

  const stop = () => {
    if (stopped) return;
    if (existsSync(join(data, "postmaster.pid"))) {
      execFileSync("pg_ctl", ["-D", data, "-w", "-t", "20", "-m", "fast", "stop"], { timeout: 25000, stdio: "pipe" });
    }
    stopped = true;
  };
  const interrupted = () => {
    try { stop(); } finally { process.exit(130); }
  };
  process.once("SIGINT", interrupted);
  process.once("SIGTERM", interrupted);

  try {
    console.log(`Isolated PostgreSQL cluster: ${root} (127.0.0.1:${port}; never :5432)`);
    console.log("Auth is emulated; PostgreSQL SQL, transactions, roles, grants and RLS are real.");
    execFileSync("initdb", ["-D", data, "-U", owner, "--auth-local=trust", "--auth-host=trust", "--encoding=UTF8", "--locale=C", "--no-instructions"],
      { timeout: 30000, stdio: "pipe" });
    // Disable Unix sockets (macOS's short socket-path limit); TCP is localhost only.
    writeFileSync(join(data, "postgresql.auto.conf"), `listen_addresses = '127.0.0.1'\nport = ${port}\nunix_socket_directories = ''\nmax_connections = 20\nfsync = off\nfull_page_writes = off\nsynchronous_commit = off\n`);
    execFileSync("pg_ctl", ["-D", data, "-l", log, "-w", "-t", "20", "start"], { timeout: 25000, stdio: "pipe" });
    execFileSync("psql", ["-X", "--host", "127.0.0.1", "--port", String(port), "--username", owner, "--dbname", "postgres", "-v", "ON_ERROR_STOP=1", "-c", `create database ${databaseName};`],
      { env, timeout: 10000, stdio: "pipe" });

    const sql = (statement: string, options?: Query): string => {
      try {
        return execFileSync("psql", args, { input: prefixed(statement, options), env, timeout: 20000,
          maxBuffer: 16 * 1024 * 1024, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "stderr" in error) throw new DatabaseError(String(error.stderr));
        throw error;
      }
    };
    const sqlAsync = (statement: string, options?: Query): Promise<string> => new Promise((resolveSql, reject) => {
      const child = execFile("psql", args, { env, timeout: 20000, maxBuffer: 16 * 1024 * 1024, encoding: "utf8" }, (error: Error | null, stdout: string, stderr: string) => {
        if (error) reject(new DatabaseError(stderr));
        else resolveSql(stdout.trim());
      });
      child.stdin?.end(prefixed(statement, options));
    });
    // Prove we reached precisely the directory just initialized before executing
    // even the stand-in DDL. Environment DATABASE_URL/PG* can never select a DB.
    assert.equal(sql("show data_directory;"), data);
    assert.equal(sql("show listen_addresses;"), "127.0.0.1");
    assert.equal(sql("select current_database();"), databaseName);
    sql(readFileSync(join(project, "tests/database/auth-standins.sql"), "utf8"));
    for (const migration of readdirSync(join(project, "supabase/migrations")).filter((file) => file.endsWith(".sql")).sort()) {
      sql(readFileSync(join(project, "supabase/migrations", migration), "utf8"));
    }
    const seed = await buildSeedSql();
    sql(seed);
    const db: Database = {
      sql, sqlAsync, seed,
      reject(statement, sqlstate, options) {
        assert.throws(() => sql(statement, options), (error: unknown) => {
          assert(error instanceof DatabaseError, "Expected a PostgreSQL error.");
          assert.equal(error.sqlstate, sqlstate, error.message);
          return true;
        });
      },
      async test(name, run) {
        try { await run(); passed += 1; console.log(`PASS ${name}`); }
        catch (error) { throw new Error(`FAIL ${name}`, { cause: error }); }
      },
    };
    seedAccounts(db);
    await testAccounts(db);
    await testContent(db);
    await testConcurrency(db);
    succeeded = true;
    console.log(`\n${passed} PostgreSQL integration checks passed. Auth provider behavior is NOT verified.`);
  } finally {
    try { stop(); } finally {
      process.removeListener("SIGINT", interrupted);
      process.removeListener("SIGTERM", interrupted);
      if (stopped && succeeded && !process.argv.includes("--keep")) {
        assert.equal(realpathSync(root).startsWith(`${realpathSync(approvedTemp)}/waymark-db-`), true);
        rmSync(root, { recursive: true }); // Only this exact mkdtemp-created, stopped cluster.
        console.log("Isolated cluster stopped and removed.");
      } else {
        console.log(`Stopped cluster retained for diagnostics: ${root}`);
        if (!succeeded && existsSync(log)) console.error(readFileSync(log, "utf8").slice(-4000));
      }
    }
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
