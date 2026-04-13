import { redirect } from 'next/navigation';

export default function LoginPage() {

  async function handleLogin(formData: FormData) {
    'use server';

    const id = (formData.get('id') as string)?.trim().toLowerCase();
    const password = (formData.get('password') as string)?.trim();

    // simple check (abhi dummy)
    if (id === 'admin' && password === 'admin123') {
      redirect('/dashboard/admin');
    } else if (id === 'employee' && password === 'emp123') {
      redirect('/dashboard/employee');
    } else {
      redirect('/login');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <form
        action={handleLogin}
        className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        {/* ID */}
        <input
          type="text"
          name="id"
          placeholder="username"
          required
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full mb-6 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}