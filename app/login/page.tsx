import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function LoginPage() {

  async function handleLogin(formData: FormData) {
    'use server';

    const cookieStore = await cookies(); // ✅ FIX (await)

    const id = (formData.get('id') as string)?.trim().toLowerCase();
    const password = (formData.get('password') as string)?.trim();

    if (id === 'admin' && password === 'admin123') {
      cookieStore.set('role', 'admin');
      redirect('/dashboard/admin');
    }

    if (id === 'employee' && password === 'emp123') {
      cookieStore.set('role', 'employee');
      redirect('/dashboard/employee');
    }

    redirect('/login');
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <form action={handleLogin} className="bg-gray-800 text-white p-8 rounded-2xl w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input name="id" placeholder="username" required className="w-full mb-4 p-3 rounded bg-gray-700" />

        <input name="password" type="password" placeholder="Password" required className="w-full mb-6 p-3 rounded bg-gray-700" />

        <button className="w-full bg-blue-600 p-3 rounded">Login</button>

      </form>
    </div>
  );
}