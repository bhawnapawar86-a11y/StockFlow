import { getRequests } from "@/app/lib/data";
import RequestTable from "@/app/ui/dashboard/admin/requests/RequestTable";



export default async function Page() {
  const requests = await getRequests();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Manage Requests
      </h1>

      <RequestTable requests={requests} />
    </div>
  );
}