"use client";

import { useState } from "react";
import AddAssetForm from "@/app/ui/dashboard/admin/assets/AddAssetForm";

export default function AddAssetSection() {
  const [open, setOpen] = useState(false);

  return (
    <div>

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        + Add Asset
      </button>

      {/* FORM */}
      {open && (
        <div className="mt-4">
          <AddAssetForm />
        </div>
      )}

    </div>
  );
}