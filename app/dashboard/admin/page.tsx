// app/dashboard/admin/page.tsx

import AdminCards from '@/app/ui/dashboard/admin-cards';
import EmployeeSection from "@/app/ui/dashboard/admin/employees/EmployeeSection";
import EmployeeTable from '@/app/ui/dashboard/admin/employees/EmployeeTable';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
      
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <AdminCards />

      {/* client component */}
      <EmployeeSection />

      {/* ✅ server component (DB safe) */}
      <EmployeeTable />

    </main>
  );
}