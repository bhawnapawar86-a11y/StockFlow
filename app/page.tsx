import Link from 'next/link';
import Image from 'next/image';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {

  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (role === 'admin') {
    redirect('/dashboard/admin');
  }

  if (role === 'employee') {
    redirect('/dashboard/employee');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-5">

        <Image
          src="/logo.png"
          alt="StockFlow Logo"
          width={100}
          height={100}
          className="rounded-full"
        />

        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to StockFlow
        </h1>

        <p className="text-gray-500 text-center">
          Manage your inventory easily & efficiently
        </p>

        <Link
          href="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Log in
        </Link>

      </div>

    </div>
  );
}