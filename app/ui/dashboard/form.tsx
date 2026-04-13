'use client';

import { useState } from 'react';

export default function EmployeeForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newEmployee = {
      id: Date.now(),
      name,
      role,
    };

    console.log('Added:', newEmployee);

    // TODO: later table me add karenge (state lift up karege)

    onClose();
  }

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Add Employee</h2>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2"
        />

        <button className="bg-green-600 text-white px-3 rounded">
          Save
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}