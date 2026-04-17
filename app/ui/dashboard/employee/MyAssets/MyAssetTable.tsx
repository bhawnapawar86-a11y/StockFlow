import { getEmployeeAssets } from "@/app/lib/data";

export default async function MyAssetTable() {

  // 🔥 TEMP (baad me login se aayega)
  const employeeId = "25884c31-ddac-4540-8ac3-95675ec19b44";

  const assets = await getEmployeeAssets(employeeId);

  return (
    <table className="w-full border border-gray-700 mt-3 text-sm">
      <thead className="bg-[#1e293b] text-gray-300">
        <tr>
          <th className="p-3 text-left">S.no.</th>
          <th className="p-3 text-left">Asset Name</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>

      <tbody>
        {assets.length > 0 ? (
          assets.map((a: any, i: number) => (
            <tr
              key={a.id}
              className="border-t border-gray-700 hover:bg-[#0f172a]"
            >
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{a.name}</td>
              <td className="p-3">{a.category}</td>

              <td className="p-3">
                <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">
                  {a.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="p-4 text-center text-gray-400">
              No Assets Assigned
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}