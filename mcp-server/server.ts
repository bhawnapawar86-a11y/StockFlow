import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { sql } from "./db.js";
import { z } from "zod";

const server = new McpServer({
  name: "stockflow-mcp",
  version: "1.0.0",
});

// ================= ADD EMPLOYEE =================

server.tool(
  "add_employee",
  "Add a new employee",
  {
    name: z.string(),
    email: z.string(),
    role: z.string(),
  },
  async ({ name, email, role }) => {

    await sql`
      INSERT INTO employee (name, email, role)
      VALUES (${name}, ${email}, ${role})
    `;

    return {
      content: [
        {
          type: "text",
          text: `✅ Employee ${name} added successfully`,
        },
      ],
    };
  }
);
 

// ================= ADD ASSET =================

server.tool(
  "add_asset",
  "Add a new asset",
  {
    name: z.string(),
    category: z.string(),
    quantity: z.number(),
  },
  async ({ name, category, quantity }) => {

    await sql`
      INSERT INTO assets (name, category, quantity, allocated)
      VALUES (${name}, ${category}, ${quantity}, 0)
    `;

    return {
      content: [
        {
          type: "text",
          text: `✅ Asset ${name} added successfully`,
        },
      ],
    };
  }
);

// ================= PENDING REQUESTS =================

server.tool(
  "get_pending_requests",
  "Show all pending requests",
  {},
  async () => {

    const requests = await sql`
      SELECT
        requests.id,
        employee.name as employee_name,
        assets.name as asset_name
      FROM requests
      JOIN employee
        ON employee.id = requests.employee_id
      JOIN assets
        ON assets.id = requests.asset_id
      WHERE requests.status = 'pending'
    `;

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(requests, null, 2),
        },
      ],
    };
  }
);

// ================= AVAILABLE ASSETS =================

server.tool(
  "dashboard_summary",
  "Show asset summary",
  {},
  async () => {

    const result = await sql`
      SELECT
        SUM(quantity) as total,
        SUM(allocated) as allocated
      FROM assets
    `;

    const total = Number(result[0].total || 0);
    const allocated = Number(result[0].allocated || 0);

    const available = total - allocated;

    return {
      content: [
        {
          type: "text",
          text:
            `Total Assets: ${total}
Allocated: ${allocated}
Available: ${available}`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);

console.log("MCP Server Running...");