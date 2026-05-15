import { addAsset } from "@/app/lib/actions";

export default function AddAssetForm() {
  return (
    <form action={addAsset} className="flex gap-4">

      <input
        name="name"
        placeholder="Asset Name"
        className="p-2 bg-gray-800 border rounded"
      />

      <input
        name="category"
        placeholder="Category"
        className="p-2 bg-gray-800 border rounded"
      />

      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        className="p-2 bg-gray-800 border rounded"
      />

      <button
        type="submit"
        className="bg-green-600 px-4 py-2 rounded"
      >
        Save
      </button>

    </form>
  );
}