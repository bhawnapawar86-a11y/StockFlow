import EmployeeCards from '@/app/ui/dashboard/employee-cards';

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      <EmployeeCards />
    </main>
  );
}