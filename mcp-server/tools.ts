import { sql } from "./db";


// ADD EMPLOYEE

export async function addEmployee(
name:string,
email:string,
role:string
){

await sql`

INSERT INTO employee
(name,email,role)

VALUES
(${name},${email},${role})

`;

return `Employee ${name} added`;

}



// ADD ASSET

export async function addAsset(
name:string,
category:string,
quantity:number
){


await sql`

INSERT INTO assets
(name,category,quantity,allocated)

VALUES
(${name},${category},${quantity},0)

`;


return `Asset ${name} added`;

}



// SHOW ASSETS

export async function showAssets(){

const data =
await sql`

SELECT
name,
category,
quantity,
allocated

FROM assets

ORDER BY id DESC

`;


return data;

}



// SHOW EMPLOYEES

export async function showEmployees(){


return await sql`

SELECT
name,
email,
role

FROM employee

ORDER BY id DESC

`;

}