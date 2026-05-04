import { cookies } from 'next/headers'; // ✅ FIX
import { redirect } from 'next/navigation';
import AdminCards from '@/app/ui/dashboard/admin-cards';
import EmployeeSection from "@/app/ui/dashboard/admin/employees/EmployeeSection";
import EmployeeTable from '@/app/ui/dashboard/admin/employees/EmployeeTable';

export default async function Page() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (role !== 'admin') {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
      
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <AdminCards />
      <EmployeeSection />
      <EmployeeTable />

    </main>
  );
}