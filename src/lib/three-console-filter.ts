// Suppress the deprecation warning emitted by three.js' internal use of the
// deprecated THREE.Clock (react-three-fiber still uses it in v9). This is a
// cosmetic filter only; functionality is unaffected. Remove once R3F migrates
// to THREE.Timer.
const originalWarn = console.warn.bind(console);
console.warn = function (...args: unknown[]) {
  try {
    const message = args.length ? String(args[0]) : "";
    if (
      message.indexOf("Clock: This module has been deprecated") !== -1 ||
      (message.indexOf("THREE.Clock") !== -1 && message.indexOf("deprecated") !== -1)
    ) {
      return;
    }
  } catch {
    // fall through
  }
  return originalWarn(...args);
};
export {};