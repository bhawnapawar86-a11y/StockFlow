import {
McpServer
}
from "@modelcontextprotocol/sdk/server/mcp.js";


import {
StdioServerTransport
}
from "@modelcontextprotocol/sdk/server/stdio.js";


import {z} from "zod";


import {
addEmployee,
addAsset,
showAssets,
showEmployees
}
from "./tools";



const server =
new McpServer({

name:"stockflow-mcp",

version:"1.0.0"

});




// TOOL 1

server.tool(

"add_employee",

"Add employee in stockflow",

{

name:z.string(),

email:z.string(),

role:z.string()

},

async(args)=>{

const result =
await addEmployee(
args.name,
args.email,
args.role
);


return {

content:[
{
type:"text",
text:result
}
]

};


}

);




// TOOL 2

server.tool(

"add_asset",

"Add asset",

{

name:z.string(),

category:z.string(),

quantity:z.number()

},


async(args)=>{


const result =
await addAsset(
args.name,
args.category,
args.quantity
);



return {

content:[
{
type:"text",
text:result
}
]

};


}

);




// TOOL 3

server.tool(

"show_assets",

"Show all assets",

{},


async()=>{


const data =
await showAssets();


return {

content:[
{
type:"text",
text:JSON.stringify(data)
}
]


};


}

);





// TOOL 4

server.tool(

"show_employees",

"Show employees",

{},


async()=>{


const data =
await showEmployees();


return {

content:[
{
type:"text",
text:JSON.stringify(data)
}
]


};


}

);





const transport =
new StdioServerTransport();



await server.connect(transport);



console.log(
"StockFlow MCP Running"
);