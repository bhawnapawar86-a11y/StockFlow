import Card from "./card";
import { getAdminStats } from "@/app/lib/data";
export default async function AdminCards() {
  const stats = await getAdminStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      <Card title="Total Assets" value={stats.totalAssets} />
      <Card title="Allocated Assets" value={stats.allocated} />
      <Card title="Remaining Assets" value={stats.remaining} />
      <Card title="Employees" value={stats.employees} />

    </div>
  );
}