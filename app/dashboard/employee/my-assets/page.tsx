import MyAssetTable from "@/app/ui/dashboard/employee/MyAssets/MyAssetTable";

export default function Page() {
  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">
        My Assets
      </h1>


      
      <MyAssetTable />

    </div>
  );
}