import { Suspense } from "react";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

type Props = { searchParams: Promise<{ range?: string }> };

export default function AdminPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<p className="caption-category">Loading…</p>}>
      <AdminDashboard searchParams={searchParams} />
    </Suspense>
  );
}
