import { getAssets } from "@/app/lib/data";

export default async function AssetList() {
  const assets = await getAssets();

  return (
    <tbody>
  {assets.map((asset: any, i: number) => (
    <tr
      key={asset.id}
      className="border-b border-gray-800 hover:bg-[#334155]"
    >
      {/* S.NO */}
      <td className="py-3 px-3">{i + 1}</td>

      {/* NAME */}
      <td className="px-3">{asset.name}</td>

      {/* CATEGORY */}
      <td className="px-3">{asset.category}</td>

      {/* TOTAL */}
      <td className="px-3 text-blue-300">
        {asset.quantity}
      </td>

      {/* ALLOCATED */}
      <td className="px-3 text-yellow-300">
        {asset.allocated}
      </td>

      {/* REMAINING */}
      <td className="px-3 text-green-400">
        {asset.remaining}
      </td>
    </tr>
  ))}
</tbody>
  );
}