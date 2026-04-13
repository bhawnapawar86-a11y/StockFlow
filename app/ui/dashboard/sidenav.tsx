import NavLinks from './nav-links';

export default function SideNav({ role }: { role: 'admin' | 'employee' }) {
  return (
    <div className="h-full p-5 bg-gray-900">
      <h2 className="text-xl font-bold text-white mb-8">
        StockFlow
      </h2>

      <NavLinks role={role} />
    </div>
  );
}