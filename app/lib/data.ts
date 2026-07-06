import { sql } from "./db";

// ================= DASHBOARD STATS =================
export async function fetchAssetData() {
  const total = await sql`
    SELECT COALESCE(SUM(quantity),0) AS total
    FROM assets
  `;

  const allocated = await sql`
    SELECT COALESCE(SUM(allocated),0) AS allocated
    FROM assets
  `;

  const totalValue = Number(total[0].total);
  const allocatedValue = Number(allocated[0].allocated);

  return {
    totalAssets: totalValue,
    allocated: allocatedValue,
    remaining: totalValue - allocatedValue,
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
  return await sql`

    SELECT
      r.id,
      r.status,
      r.created_at,

      COALESCE(e.name, 'Unknown') AS employee_name,
      COALESCE(a.name, 'Unknown Asset') AS asset_name

    FROM requests r

    LEFT JOIN employee e
      ON e.id = r.employee_id

    LEFT JOIN assets a
      ON a.id = r.asset_id

    ORDER BY r.id DESC

  `;
}

// ================= EMPLOYEE ASSETS =================
export async function getEmployeeAssets(employeeId: string) {

  const data = await sql`

    SELECT 
      a.id,
      a.name,
      a.category,
      a.quantity,
      a.allocated,
      r.status

    FROM requests r

    JOIN assets a 
    ON a.id = r.asset_id

    JOIN employee e
    ON e.id = r.employee_id

    WHERE e.id = ${employeeId}
    AND r.status = 'approved'

    ORDER BY r.id DESC

  `;

  return data;
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