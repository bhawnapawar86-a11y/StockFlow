// lib/data.ts

export async function fetchAssetData() {
  const totalAssets = 100;
  const allocated = 65;
  const remaining = totalAssets - allocated;

  return {
    totalAssets,
    allocated,
    remaining,
  };
}