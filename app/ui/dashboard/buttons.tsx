'use client';

import { useState } from 'react';
import EmployeeForm from './form';

export default function EmployeeButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Employee
      </button>

      {open && <EmployeeForm onClose={() => setOpen(false)} />}
    </div>
  );
}