import { updateRequestStatus } from "@/app/lib/actions";

export default function RequestTable({ requests }: any) {
  return (
    <table className="w-full text-sm text-white border border-gray-700">
      
      <thead className="bg-gray-900 text-gray-400">
        <tr>
          <th className="p-3 text-left">S.No</th>
          <th className="p-3 text-left">Employee</th>
          <th className="p-3 text-left">Asset</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {requests.map((r: any, i: number) => (
          <tr key={r.id} className="border-t border-gray-700">

            <td className="p-3">{i + 1}</td>

            <td className="p-3">{r.employee_name}</td>

            <td className="p-3">{r.asset_name}</td>

            <td className="p-3">
              <span className="text-yellow-400">
                {r.status}
              </span>
            </td>

            <td className="p-3 flex gap-2">
              
              {/* APPROVE */}
              <form action={updateRequestStatus.bind(null, r.id, "approved")}>
                <button className="bg-green-600 px-3 py-1 rounded">
                  Approve
                </button>
              </form>

              {/* REJECT */}
              <form action={updateRequestStatus.bind(null, r.id, "rejected")}>
                <button className="bg-red-600 px-3 py-1 rounded">
                  Reject
                </button>
              </form>

            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}