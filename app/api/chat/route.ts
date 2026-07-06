import { NextResponse } from "next/server";
import OpenAI from "openai";
import { sql } from "@/app/lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});


export async function POST(req:Request){

try{

const {message,history=[]}=await req.json();


const completion =
await openai.chat.completions.create({

model:"gpt-4.1-mini",

messages:[

{
role:"system",
content:`

You are StockFlow AI Assistant.

Inventory and employee management assistant.

Rules:
- Use tools for database.
- Specific employee/asset => only one record.
- Available asset => quantity-allocated >0
- Remaining => quantity-allocated
- Out of stock => available 0
- Pending requests only pending.
- Do not show full table unless asked.

`
},

...history,

{
role:"user",
content:message
}

],


tools:[


// ================= EMPLOYEE =================


{
type:"function",
function:{
name:"show_employees",
description:"Show employees",
parameters:{
type:"object",
properties:{}
}
}},


{
type:"function",
function:{
name:"get_employee",
description:"single employee detail",
parameters:{
type:"object",
properties:{
name:{type:"string"}
},
required:["name"]
}
}},


{
type:"function",
function:{
name:"add_employee",
description:"add employee",
parameters:{
type:"object",
properties:{
name:{type:"string"},
email:{type:"string"},
role:{type:"string"}
},
required:["name","email","role"]
}
}},


{
type:"function",
function:{
name:"delete_employee",
description:"delete employee",
parameters:{
type:"object",
properties:{
name:{type:"string"}
},
required:["name"]
}
}},


{
type:"function",
function:{
name:"update_employee",
description:"update employee",
parameters:{
type:"object",
properties:{
oldName:{type:"string"},
name:{type:"string"},
email:{type:"string"},
role:{type:"string"}
}
}
}},




// ================= ASSET =================


{
type:"function",
function:{
name:"show_assets",
description:"all assets",
parameters:{
type:"object",
properties:{}
}
}},


{
type:"function",
function:{
name:"get_asset",
description:"single asset",
parameters:{
type:"object",
properties:{
name:{type:"string"}
},
required:["name"]
}
}},


{
type:"function",
function:{
name:"available_assets",
description:"available assets",
parameters:{
type:"object",
properties:{}
}
}},


{
type:"function",
function:{
name:"remaining_assets",
description:"remaining assets",
parameters:{
type:"object",
properties:{}
}
}},


{
type:"function",
function:{
name:"out_stock_assets",
description:"out stock assets",
parameters:{
type:"object",
properties:{}
}
}},


{
type:"function",
function:{
name:"max_assets",
description:"maximum quantity assets",
parameters:{
type:"object",
properties:{}
}
}},


{
type:"function",
function:{
name:"add_asset",
description:"add asset merge quantity",
parameters:{
type:"object",
properties:{
name:{type:"string"},
category:{type:"string"},
quantity:{type:"number"}
},
required:["name","category","quantity"]
}
}},




// ================= REQUEST =================


{
type:"function",
function:{
name:"show_requests",
description:"pending requests",
parameters:{
type:"object",
properties:{}
}
}}

] as any

});


const msg:any =
completion.choices[0].message;



const tool =
msg.tool_calls?.[0];



if(!tool){

return NextResponse.json({
reply:msg.content || "How can I help?"
});

}



const name =
tool.function.name;


let args:any={};

try{

args =
JSON.parse(tool.function.arguments || "{}");

}
catch{

args={};

}




// ================= EMPLOYEE =================


if(name==="show_employees"){

const data =
await sql`

SELECT name,email,role
FROM employee
ORDER BY id DESC

`;

return NextResponse.json({
reply:"Employee List",
type:"employee",
table:data
});

}




if(name==="get_employee"){

const data =
await sql`

SELECT name,email,role
FROM employee
WHERE LOWER(name)=LOWER(${args.name})

`;

return NextResponse.json({
reply:"Employee found",
type:"employee",
table:data
});

}




if(name==="add_employee"){

await sql`

INSERT INTO employee(name,email,role)
VALUES(${args.name},${args.email},${args.role})

`;

return NextResponse.json({
reply:"Employee added"
});

}




if(name==="delete_employee"){

await sql`

DELETE FROM employee
WHERE name=${args.name}

`;

return NextResponse.json({
reply:"Employee deleted"
});

}




if(name==="update_employee"){

await sql`

UPDATE employee
SET

name=COALESCE(${args.name},name),
email=COALESCE(${args.email},email),
role=COALESCE(${args.role},role)

WHERE name=${args.oldName}

`;

return NextResponse.json({
reply:"Employee updated"
});

}





// ================= ASSET =================


if(name==="show_assets"){

const data =
await sql`

SELECT
name,
category,
quantity,
allocated,
(quantity-allocated) as available

FROM assets
ORDER BY id DESC

`;


return NextResponse.json({
reply:"Asset List",
type:"asset",
table:data
});

}





if(name==="get_asset"){

const data =
await sql`

SELECT
name,
category,
quantity,
allocated,
(quantity-allocated) as available

FROM assets

WHERE LOWER(name)=LOWER(${args.name})

`;


return NextResponse.json({
reply:"Asset found",
type:"asset",
table:data
});

}




if(name==="available_assets"){

const data =
await sql`

SELECT
name,
category,
(quantity-allocated) as available

FROM assets

WHERE quantity-allocated>0

`;


return NextResponse.json({
reply:"Available Assets",
type:"asset",
table:data
});

}





if(name==="remaining_assets"){

const data =
await sql`

SELECT
name,
category,
(quantity-allocated) as remaining

FROM assets

`;


return NextResponse.json({
reply:"Remaining Assets",
type:"asset",
table:data
});

}





if(name==="out_stock_assets"){

const data =
await sql`

SELECT
name,
category

FROM assets

WHERE quantity-allocated=0

`;


return NextResponse.json({
reply:"Out of Stock Assets",
type:"asset",
table:data
});

}




if(name==="max_assets"){

const data =
await sql`

SELECT
name,
quantity

FROM assets

ORDER BY quantity DESC

LIMIT 5

`;


return NextResponse.json({
reply:"Maximum Quantity Assets",
type:"asset",
table:data
});

}




if(name==="add_asset"){

const old =
await sql`

SELECT *
FROM assets
WHERE name=${args.name}

`;



if(old.length){

await sql`

UPDATE assets

SET quantity=quantity+${args.quantity}

WHERE name=${args.name}

`;

return NextResponse.json({
reply:"Asset quantity merged"
});

}



await sql`

INSERT INTO assets
(name,category,quantity,allocated)

VALUES
(${args.name},${args.category},${args.quantity},0)

`;


return NextResponse.json({
reply:"Asset added"
});

}





// ================= REQUEST FIX =================


// ================= REQUEST =================


if(name==="show_requests"){


const data =
await sql`

SELECT

r.id,
r.status,

e.name AS employee,

a.name AS asset


FROM requests r


LEFT JOIN employee e

ON e.id = r.employee_id


LEFT JOIN assets a

ON a.id = r.asset_id


WHERE r.status = 'pending'


ORDER BY r.id DESC


`;



return NextResponse.json({

reply:"Pending Requests",

type:"request",

table:data

});

}



return NextResponse.json({
reply:"Done"
});



}
catch(e){

console.log(e);

return NextResponse.json({
reply:"Server error"
});

}


}