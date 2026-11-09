import { AdminCatalogList } from "@/components/admin/catalog-list";
import type { AdminSearchParams } from "@/lib/admin/types";

export const instant = false;

export default function AdminGuidesPage({ searchParams }: { searchParams: AdminSearchParams }) {
  return <AdminCatalogList kind="guides" searchParams={searchParams} />;
}
