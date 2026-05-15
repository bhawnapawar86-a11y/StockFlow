import { getEmployees } from "@/app/lib/data";

export default async function EmployeeTable() {
  const employees = await getEmployees();

  return (
    <div className="auto rounded-xl border border-gray-700 bg-[#1e293b] shadow-lg">
     
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-200">

          {/* HEADER */}
          <thead className="bg-[#0f172a] text-gray-400 uppercase text-xs tracking-wide">
            <tr>
              <th className="p-4 text-left">S.No</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {employees.map((emp: any, i: number) => (
              <tr
                key={emp.id}
                className="border-t border-gray-700 hover:bg-[#334155] transition"
              >
                <td className="p-4 font-medium">{i + 1}</td>

                <td className="p-4">{emp.name}</td>

                <td className="p-4">{emp.email}</td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">
                    {emp.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}