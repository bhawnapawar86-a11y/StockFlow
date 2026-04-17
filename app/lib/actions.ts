// lib/actions.ts
"use server";

import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addEmployee(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  await sql`
    INSERT INTO employee (name, email, role)
    VALUES (${name}, ${email}, ${role})
  `;

  revalidatePath("/dashboard/admin");
  redirect("/dashboard/admin"); // 🔥 ADD THIS
}

export async function addAsset(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const quantity = Number(formData.get("quantity"));

  await sql`
    INSERT INTO assets (name, category, quantity, allocated)
    VALUES (${name}, ${category}, ${quantity}, 0)
  `;

  revalidatePath("/dashboard/admin/assets");
}

export async function createRequest(formData: FormData) {
  const employeeId = formData.get("employeeId") as string;
  const assetId = formData.get("assetId") as string;

  const date = new Date().toISOString();

  await sql`
    INSERT INTO requests (employee_id, asset_id, status, created_at)
    VALUES (${employeeId}, ${assetId}, 'pending', ${date})
  `;

  revalidatePath("/dashboard/admin/requests");
  revalidatePath("/dashboard/employee/MyRequests");
  revalidatePath("/dashboard/employee");
}

export async function updateRequestStatus(
  requestId: string,
  status: string
) {
  // 1. Update status
  await sql`
    UPDATE requests
    SET status = ${status}
    WHERE id = ${requestId}
  `;

  // 2. ONLY IF APPROVED → increment allocated
  if (status === "approved") {

    const request = await sql`
      SELECT asset_id FROM requests WHERE id = ${requestId}
    `;

    const assetId = request[0].asset_id;

    await sql`
      UPDATE assets
      SET allocated = allocated + 1
      WHERE id = ${assetId}
    `;
  }

  // 3. Refresh UI
  revalidatePath("/dashboard/admin/requests");
  revalidatePath("/dashboard/admin/assets");
  revalidatePath("/dashboard/employee/my-assets");
  revalidatePath("/dashboard/employee/my-requests");
  revalidatePath("/dashboard/employee");
}

