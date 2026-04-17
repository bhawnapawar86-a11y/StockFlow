// app/ui/dashboard/admin/EmployeeTable.tsx

import { getEmployees } from "@/app/lib/data";

export default async function EmployeeTable() {
  const employees = await getEmployees();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border border-gray-700 rounded-xl overflow-hidden">

        <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="p-3">S.No</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp: any, i: number) => (
            <tr
              key={emp.id}
              className="border-t border-gray-700 hover:bg-gray-800 transition"
            >
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{emp.name}</td>
              <td className="p-3">{emp.email}</td>
              <td className="p-3">{emp.role}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}