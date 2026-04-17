import { getEmployeeAssets } from "@/app/lib/data";

export default async function MyAssetTable() {

  const employeeId = "25884c31-ddac-4540-8ac3-95675ec19b44";

  const assets = await getEmployeeAssets(employeeId);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#1e293b] shadow-lg">

      <table className="w-full text-sm text-gray-200">

        {/* HEADER */}
        <thead className="bg-[#0f172a] text-gray-400 uppercase text-xs tracking-wide">
          <tr>
            <th className="p-4 text-left">S.No</th>
            <th className="p-4 text-left">Asset</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {assets.map((a: any, i: number) => (
            <tr
              key={a.id}
              className="border-t border-gray-700 hover:bg-[#334155] transition"
            >

              {/* S.NO */}
              <td className="p-4 font-medium">{i + 1}</td>

              {/* ASSET */}
              <td className="p-4">{a.name}</td>

              {/* CATEGORY */}
              <td className="p-4">{a.category}</td>

              {/* STATUS BADGE */}
              <td className="p-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                  Assigned
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}