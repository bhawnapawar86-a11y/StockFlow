'use client';

import NavLinks from './nav-links';
import { logout } from '@/app/lib/actions';

export default function SideNav({ role }: { role: 'admin' | 'employee' }) {
  return (
    <div className="h-screen flex flex-col justify-between p-5 bg-gray-900 text-white">

      {/* 🔹 TOP */}
      <div>
        <h2 className="text-xl font-bold mb-8">
          StockFlow
        </h2>

        <NavLinks role={role} />
      </div>

      {/* 🔴 LOGOUT */}
      <form action={logout}>
        <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">
          Logout
        </button>
      </form>

    </div>
  );
}