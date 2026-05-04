import { getAssets } from "@/app/lib/data";

export default async function AssetList() {
  const assets = await getAssets();

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#1e293b] shadow-lg">

      <table className="w-full text-sm text-gray-200">

        {/* HEADER */}
        <thead className="bg-[#0f172a] text-gray-400 uppercase text-xs tracking-wide">
          <tr>
            <th className="p-4 text-left">S.No</th>
            <th className="p-4 text-left">Asset</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Allocated</th>
            <th className="p-4 text-left">Remaining</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {assets.map((asset: any, i: number) => (
            <tr
              key={asset.id}
              className="border-t border-gray-700 hover:bg-[#334155] transition"
            >
              <td className="p-4 font-medium">{i + 1}</td>

              <td className="p-4">{asset.name}</td>

              <td className="p-4">{asset.category}</td>

              
              <td className="p-4">
                <span className="text-blue-400 font-semibold">
                  {asset.quantity}
                </span>
              </td>

             
              <td className="p-4">
                <span className="text-yellow-400 font-semibold">
                  {asset.allocated}
                </span>
              </td>

         
              <td className="p-4">
                <span className="text-green-400 font-semibold">
                  {asset.remaining}
                </span>
              </td>
            </tr>
          ))}

          {assets.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-400">
                No assets found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}