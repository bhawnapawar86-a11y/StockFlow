'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavLinks({ role }: { role: 'admin' | 'employee' }) {
  const pathname = usePathname();

  const adminLinks = [
    { name: 'Home', href: '/dashboard/admin' },
    { name: 'Manage Asset', href: '/dashboard/admin/assets' },
    { name: 'Manage Requests', href: '/dashboard/admin/requests' },
  ];

  const employeeLinks = [
    { name: 'Home', href: '/dashboard/employee' },
    { name: 'My Asset', href: '/dashboard/employee/my-assets' },
    { name: 'My Requests', href: '/dashboard/employee/my-requests' },
  ];

  const links = role === 'admin' ? adminLinks : employeeLinks;

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'p-3 rounded-lg transition-all duration-200',
            {
              'bg-gray-800 text-white': pathname === link.href,
              'text-gray-300 hover:bg-gray-800 hover:text-white':
                pathname !== link.href,
            }
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}