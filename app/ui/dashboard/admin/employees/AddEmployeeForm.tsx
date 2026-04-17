// app/ui/dashboard/admin/AddEmployeeForm.tsx

import { addEmployee } from "@/app/lib/actions";

export default function EmployeeForm() {
  return (
    <form action={addEmployee} className="flex flex-col gap-3">

      <input
        name="name"
        placeholder="Name"
        className="p-2 rounded bg-gray-800 border border-gray-600"
      />

      <input
        name="email"
        placeholder="Email"
        className="p-2 rounded bg-gray-800 border border-gray-600"
      />

      <input
        name="role"
        placeholder="Role"
        className="p-2 rounded bg-gray-800 border border-gray-600"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Add Employee
      </button>

    </form>
  );
}