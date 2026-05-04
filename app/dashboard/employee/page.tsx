import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import EmployeeCards from '@/app/ui/dashboard/employee-cards';

export default async function Page() {

  const cookieStore = await cookies(); 
  const role = cookieStore.get('role')?.value; 

  if (role !== 'employee') {
    redirect('/login');
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Employee Dashboard
      </h1>

      <EmployeeCards />
    </main>
  );
}