import { getMyRequests } from "@/app/lib/data";

export default async function MyRequestTable() {

  const employeeId = "43d610d6-70d2-4c8b-8b0c-e1fa0339d30e";
  const requests = await getMyRequests(employeeId);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#1e293b] shadow-lg">

      <table className="w-full text-sm text-gray-200">

        {/* HEADER */}
        <thead className="bg-[#0f172a] text-gray-400 uppercase text-xs tracking-wide">
          <tr>
            <th className="p-4 text-left">S.No</th>
            <th className="p-4 text-left">Asset</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {requests.map((r: any, i: number) => (
            <tr
              key={r.id}
              className="border-t border-gray-700 hover:bg-[#334155] transition"
            >

              {/* S.NO */}
              <td className="p-4 font-medium">{i + 1}</td>

              {/* ASSET */}
              <td className="p-4">{r.name}</td>

              {/* CATEGORY */}
              <td className="p-4">{r.category}</td>

              {/* DATE */}
              <td className="p-4">
                {new Date(r.created_at).toLocaleDateString()}
              </td>

              {/* STATUS BADGE */}
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      r.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : r.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                >
                  {r.status}
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}