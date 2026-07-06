import { getEmployeeStats } from "@/app/lib/data";
import Card from "./card";

export default async function EmployeeCards() {
  const employeeId = "43d610d6-70d2-4c8b-8b0c-e1fa0339d30e";

  const stats = await getEmployeeStats(employeeId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      <Card title="Available Assets" value={stats.availableAssets} />
      <Card title="Total Requests" value={stats.totalRequests} />
      <Card title="Pending Requests" value={stats.pendingRequests} />

    </div>
  );
}