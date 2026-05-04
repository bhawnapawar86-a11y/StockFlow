import { updateRequestStatus } from "@/app/lib/actions";

export default function RequestTable({ requests }: any) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#1e293b] shadow-lg">

      <table className="w-full text-sm text-gray-200">

        {/* HEADER */}
        <thead className="bg-[#0f172a] text-gray-400 uppercase text-xs tracking-wide">
          <tr>
            <th className="p-4 text-left">S.No</th>
            <th className="p-4 text-left">Employee</th>
            <th className="p-4 text-left">Asset</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {requests.map((r: any, i: number) => (
            <tr
              key={r.id}
              className="border-t border-gray-700 hover:bg-[#334155] transition"
            >

              <td className="p-4 font-medium">{i + 1}</td>

              <td className="p-4">{r.employee_name}</td>

              <td className="p-4">{r.asset_name}</td>

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

              {/* ACTION */}
              <td className="p-4 flex gap-2">

                {/* APPROVE */}
                <form action={updateRequestStatus.bind(null, r.id, "approved")}>
                  <button className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded-md text-xs">
                    Approve
                  </button>
                </form>

                {/* REJECT */}
                <form action={updateRequestStatus.bind(null, r.id, "rejected")}>
                  <button className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md text-xs">
                    Reject
                  </button>
                </form>

              </td>

            </tr>
          ))}

          {/* EMPTY STATE */}
          {requests.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-400">
                No requests found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}