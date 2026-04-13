import AdminCards from '@/app/ui/dashboard/admin-cards';
import EmployeeTable from '@/app/ui/dashboard/employee/table';
import EmployeeButtons from '@/app/ui/dashboard/buttons';

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Cards */}
      <AdminCards />

      {/* Employee Table */}
      <div className="mt-8">
  
  {/* Header row */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">
      Employee List
    </h2>

    <EmployeeButtons />
  </div>

  {/* Table */}
  <EmployeeTable />

</div>
      


    </main>
  );
}