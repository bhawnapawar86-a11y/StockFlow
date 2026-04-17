import SideNav from '@/app/ui/dashboard/sidenav';

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <SideNav role="employee" />
      </div>

      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-950">
        {children}
      </div>

    </div>
  );
}