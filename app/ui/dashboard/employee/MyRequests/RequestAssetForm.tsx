'use client';

import { createRequest } from '@/app/lib/actions';

export default function RequestAssetForm({ assets = [] }: { assets?: any[] }) {
  return (
    <form
      action={createRequest}
      className="flex gap-4 flex-wrap bg-gray-800 p-4 rounded-lg border border-gray-700"
    >
      <input
        type="hidden"
        name="employeeId"
        value="25884c31-ddac-4540-8ac3-95675ec19b44"
      />

      <select
        name="assetId"
        required
        className="p-2 rounded bg-gray-900 border border-gray-600"
      >
        <option value="">Select Asset</option>

        {assets.map((asset: any) => (
          <option key={asset.id} value={asset.id}>
            {asset.name} ({asset.category})
          </option>
        ))}
      </select>

      <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
        Request Asset
      </button>
    </form>
  );
}