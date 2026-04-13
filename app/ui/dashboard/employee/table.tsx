export default function EmployeeTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-md bg-white">
      <table className="min-w-full text-sm text-gray-800">

        {/* Header */}
        <thead className="bg-gray-200 text-gray-900">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">S.No</th>
            <th className="px-6 py-3 text-left font-semibold">Name</th>
            <th className="px-6 py-3 text-left font-semibold">Email</th>
            <th className="px-6 py-3 text-left font-semibold">Role</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-200">

          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 font-medium">1</td>
            <td className="px-6 py-4 font-medium">Bhawna</td>
            <td className="px-6 py-4">bhawna@gmail.com</td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 rounded-full text-xs bg-green-200 text-green-800 font-semibold">
                Employee
              </span>
            </td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 font-medium">2</td>
            <td className="px-6 py-4 font-medium">Rahul</td>
            <td className="px-6 py-4">rahul@gmail.com</td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 rounded-full text-xs bg-blue-200 text-blue-800 font-semibold">
                Employee
              </span>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}