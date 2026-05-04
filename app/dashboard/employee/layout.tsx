import SideNav from '@/app/ui/dashboard/sidenav';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  // 🔒 PROTECTION
  if (role !== 'employee') {
    redirect('/login');
  }

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <SideNav role="employee" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-950 text-white">
        {children}
      </div>

    </div>
  );
}