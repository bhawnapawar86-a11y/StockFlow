import { sql } from "./db";

// ================= DASHBOARD STATS =================
export async function fetchAssetData() {
  const total = await sql`
    SELECT COUNT(*) FROM assets
  `;

  const allocated = await sql`
    SELECT COUNT(*) FROM requests WHERE status = 'approved'
  `;

  return {
    totalAssets: Number(total[0].count),
    allocated: Number(allocated[0].count),
    remaining:
      Number(total[0].count) - Number(allocated[0].count),
  };
}

// ================= EMPLOYEES =================
export async function getEmployees() {
  const result = await sql`
    SELECT * FROM employee
    ORDER BY id DESC
  `;

  return result;
}

export async function getAssets() {
  return await sql`
    SELECT 
      id,
      name,
      category,
      quantity,
      allocated,
      (quantity - allocated) AS remaining
    FROM assets
    ORDER BY id DESC
  `;
}

// ================= REQUESTS =================
export async function getRequests() {
  const result = await sql`
    SELECT 
      r.id,
      r.status,
      r.created_at,

      e.name AS employee_name,
      a.name AS asset_name

    FROM requests r
    LEFT JOIN employee e ON e.id = r.employee_id
    LEFT JOIN assets a ON a.id = r.asset_id

    ORDER BY r.id DESC
  `;

  return result;
}

// ================= EMPLOYEE ASSETS =================
export async function getEmployeeAssets(employeeId: string) {
  return await sql`
    SELECT 
      assets.id,
      assets.name,
      assets.category,
      requests.status
    FROM requests
    JOIN assets ON assets.id = requests.asset_id
    WHERE requests.employee_id = ${employeeId}
      AND requests.status = 'approved'
    ORDER BY requests.id DESC
  `;
}

export async function getMyRequests(employeeId: string) {
  return await sql`
    SELECT 
      requests.id,
      requests.status,
      requests.created_at,
      assets.name,
      assets.category
    FROM requests
    JOIN assets ON assets.id = requests.asset_id
    WHERE requests.employee_id = ${employeeId}
    ORDER BY requests.created_at DESC
  `;
}

export async function getAdminStats() {
  const total = await sql`
    SELECT COALESCE(SUM(quantity), 0) AS total FROM assets
  `;

  const allocated = await sql`
    SELECT COALESCE(SUM(allocated), 0) AS allocated FROM assets
  `;

  const employees = await sql`
    SELECT COUNT(*) FROM employee
  `;

  return {
    totalAssets: Number(total[0].total),
    allocated: Number(allocated[0].allocated),
    remaining: Number(total[0].total) - Number(allocated[0].allocated),
    employees: Number(employees[0].count),
  };
}

export async function getEmployeeStats(employeeId: string) {
  
  const assets = await sql`
    SELECT COUNT(*) 
    FROM requests
    WHERE employee_id = ${employeeId}
    AND status = 'approved'
  `;

  const total = await sql`
    SELECT COUNT(*) 
    FROM requests
    WHERE employee_id = ${employeeId}
  `;
  
  const pending = await sql`
    SELECT COUNT(*) 
    FROM requests
    WHERE employee_id = ${employeeId}
    AND status = 'pending'
  `;

  return {
    availableAssets: Number(assets[0].count),
    totalRequests: Number(total[0].count),
    pendingRequests: Number(pending[0].count),
  };
}