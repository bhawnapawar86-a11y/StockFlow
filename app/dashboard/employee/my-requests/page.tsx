import RequestAssetForm from '@/app/ui/dashboard/employee/MyRequests/RequestAssetForm';
import MyRequestTable from '@/app/ui/dashboard/employee/MyRequests/MyRequestTable';
import { getAssets } from '@/app/lib/data';

export default async function Page() {
  const assets = await getAssets();

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">My Requests</h1>

      {/* 🔥 FORM */}
      <RequestAssetForm assets={assets} />

      {/* 🔥 TABLE */}
      <div className="mt-6">
        <MyRequestTable />
      </div>

    </div>
  );
}