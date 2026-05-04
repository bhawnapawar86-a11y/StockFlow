'use client';

import { useState } from "react";
import { logout } from "@/app/lib/actions";

import { updateRequestStatus } from "@/app/lib/actions";
type ButtonProps = {
  onClick?: () => void;
};

// 1️⃣ Add Asset Button
export function AddAssetButton({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-medium transition"
    >
      Add Asset
    </button>
  );
}

// 2️⃣ Add Employee Button
export function AddEmployeeButton({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-md font-medium transition"
    >
      Add Employee
    </button>
  );
}

// 3️⃣ Request Asset Button
export function RequestAssetButton() {
  return (
    <button
      type="submit"
      className="px-5 py-2 bg-green-600 hover:bg-green-500 rounded-md font-medium transition"
    >
      Request Asset
    </button>
  );
}

// ui/dashboard/button.tsx

export function ApproveButton({ id }: { id: string }) {
  const action = updateRequestStatus.bind(null, id, "approved");

  return (
    <form action={action}>
      <button className="bg-green-500 px-3 py-1 rounded text-white">
        Approve
      </button>
    </form>
  );
}

export function RejectButton({ id }: { id: string }) {
  const action = updateRequestStatus.bind(null, id, "rejected");

  return (
    <form action={action}>
      <button className="bg-red-500 px-3 py-1 rounded text-white">
        Reject
      </button>
    </form>
  );
}

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="px-5 py-2 bg-red-600 hover:bg-red-500 rounded-md font-medium transition"
      >
        Logout
      </button>
    </form>
  );
}