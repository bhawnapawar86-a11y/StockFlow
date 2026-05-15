import AddAssetSection from "@/app/ui/dashboard/admin/assets/AddAssetSection";
import AssetList from "@/app/ui/dashboard/admin/assets/AssetList";

export default function ManageAssetsPage() {
  return (
    <div className="p-6 min-h-screen bg-[#0f172a] text-white">

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Manage Assets
        </h1>

        <p className="text-gray-400 text-sm">
          Add and manage company assets
        </p>
      </div>

      {/* ADD ASSET SECTION */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
        <AddAssetSection />
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-[#1e293b] p-6 rounded-xl border border-gray-700">

        <h2 className="text-lg font-medium mb-4">
          Asset List
        </h2>

        <AssetList />

      </div>

    </div>
  );
}