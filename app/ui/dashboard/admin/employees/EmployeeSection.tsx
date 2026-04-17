'use client';

import { useState } from 'react';
import EmployeeForm from './AddEmployeeForm';

export default function EmployeeSection() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="mt-10 bg-gray-800 p-6 rounded-2xl shadow-lg">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Employee List
        </h2>

        <button
          onClick={() => setOpenForm(prev => !prev)}
          className="bg-blue-600 px-5 py-2 rounded-lg"
        >
          + Add Employee
        </button>
      </div>

      {openForm && (
        <div className="mb-6 bg-gray-900 p-4 rounded-xl border border-gray-700">
          <EmployeeForm />
        </div>
      )}

    </div>
  );
}