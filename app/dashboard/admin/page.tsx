import { cookies } from 'next/headers';
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

      {/* ADD EMPLOYEE FORM */}
      <EmployeeSection />

      {/* EMPLOYEE TABLE */}
      <div className="mt-8 bg-[#1e293b] p-6 rounded-xl border border-gray-700">

        <h2 className="text-lg font-medium mb-4">
          Employee List
        </h2>

        <EmployeeTable />

      </div>

    </main>
  );
}