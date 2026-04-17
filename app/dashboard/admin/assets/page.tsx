import AddAssetForm from "@/app/ui/dashboard/admin/assets/AddAssetForm";
import AssetList from "@/app/ui/dashboard/admin/assets/AssetList";

export default function ManageAssetsPage() {
  return (
    <div className="p-6 min-h-screen bg-[#0f172a] text-white">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Manage Assets
        </h1>
        <p className="text-gray-400 text-sm">
          Add and manage company assets
        </p>
      </div>

      {/* FORM */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
        <AddAssetForm />
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-[#1e293b] p-6 rounded-xl border border-gray-700">
        <h2 className="text-lg font-medium mb-4">
          Asset List
        </h2>

        <table className="w-full text-sm">

          {/* 🔥 UPDATED HEADER */}
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="text-left py-2 px-3">#</th>
              <th className="text-left py-2 px-3">Asset Name</th>
              <th className="text-left py-2 px-3">Category</th>
              <th className="text-left py-2 px-3">Total Stock</th>
              <th className="text-left py-2 px-3">Allocated</th>
              <th className="text-left py-2 px-3">Remaining</th>
            </tr>
          </thead>

          {/* 🔥 DYNAMIC TABLE BODY */}
          <AssetList />

        </table>
      </div>

    </div>
  );
}