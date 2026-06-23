import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

export async function POST(req: Request) {

  const { message, history } = await req.json();

  const text = message.toLowerCase();

  const last =
    history?.length
      ? history[history.length - 1]
      : {};


  // ================= EMPLOYEE FLOW =================


  if(last.action?.type === "employee_email"){

    return NextResponse.json({

      reply:
      "Please provide employee role",

      action:{
        type:"employee_role",
        name:last.action.name,
        email:message
      }

    });

  }



  if(last.action?.type === "employee_role"){


    const data = last.action;


    await sql`

      INSERT INTO employee
      (name,email,role)

      VALUES
      (
        ${data.name},
        ${data.email},
        ${message}
      )

    `;


    return NextResponse.json({

      reply:
      `✅ Employee ${data.name} added successfully`

    });

  }

  if(text.startsWith("add employee")){


    const name =
    message.replace(/add employee/i,"").trim();



    if(!name){

      return NextResponse.json({

        reply:
        "Please provide employee name",

        action:{
          type:"employee_name"
        }

      });

    }

    return NextResponse.json({

      reply:
      `Please provide email for ${name}`,

      action:{
        type:"employee_email",
        name:name
      }

    });

  }

  if(last.action?.type==="employee_name"){


    return NextResponse.json({

      reply:
      `Please provide email for ${message}`,

      action:{
        type:"employee_email",
        name:message
      }

    });

  }


  // ================= DELETE EMPLOYEE =================


  if(text.startsWith("delete employee")){


    const name =
    message.replace("delete employee","").trim();



    const result =
    await sql`

    DELETE FROM employee

    WHERE LOWER(name)=LOWER(${name})

    RETURNING name

    `;



    return NextResponse.json({

      reply:
      result.length
      ?
      ` ${result[0].name} deleted ✅`
      :
      "Employee not found"

    });

  }



  // ================= ASSET FLOW =================



  if(last.action?.type==="asset_name"){


    return NextResponse.json({

      reply:
      `Please provide category for ${message}`,

      action:{
        type:"asset_category",
        name:message
      }

    });

  }


  if(last.action?.type==="asset_category"){


    return NextResponse.json({

      reply:
      "Please provide quantity",

      action:{
        type:"asset_quantity",
        name:last.action.name,
        category:message
      }

    });

  }


  if(last.action?.type==="asset_quantity"){


    const data =
    last.action;



    await sql`

    INSERT INTO assets
    (
      name,
      category,
      quantity,
      allocated
    )

    VALUES
    (
      ${data.name},
      ${data.category},
      ${Number(message)},
      0
    )

    `;


    return NextResponse.json({

      reply:
      `✅ Asset ${data.name} added successfully`

    });

  }


  if(text.startsWith("add asset")){


    const name =
    message.replace("add asset","").trim();



    if(!name){

      return NextResponse.json({

        reply:
        "Please provide asset name",

        action:{
          type:"asset_name"
        }

      });

    }


    return NextResponse.json({

      reply:
      `Please provide category for ${name}`,

      action:{
        type:"asset_category",
        name:name
      }

    });

  }


// ================= SHOW PENDING REQUEST =================

if(
  text.includes("pending request") ||
  text.includes("show pending")
){

  const data =
  await sql`

  SELECT

  employee.name AS employee,
  assets.name AS asset,
  requests.status,
  requests.created_at

  FROM requests

  JOIN employee
  ON employee.id=requests.employee_id

  JOIN assets
  ON assets.id=requests.asset_id

  WHERE LOWER(TRIM(requests.status))='pending'

  ORDER BY requests.id DESC

  `;


  return NextResponse.json({

    reply:
    "Here are the pending requests",

    table:data

  });

}


  // ================= AVAILABLE ASSETS =================


  if(
    text.includes("available") &&
    text.includes("asset")
  ){


    const data =
    await sql`

    SELECT

    SUM(quantity) total,
    SUM(allocated) allocated


    FROM assets

    `;

    const available =
    Number(data[0].total || 0)
    -
    Number(data[0].allocated || 0);

    return NextResponse.json({

      reply:

`Available assets: ${available}`

    });

  }

  // ================= REQUEST ASSET =================


  if(text.startsWith("request")){


    const assetName =
    message.replace(/request/i,"").trim();


    const asset =
    await sql`

    SELECT id

    FROM assets

    WHERE LOWER(name)=LOWER(${assetName})

    `;


    if(!asset.length){

      return NextResponse.json({

        reply:
        `❌ Asset ${assetName} not found`

      });

    }


    // temporary employee id
    await sql`

    INSERT INTO requests
    (
      employee_id,
      asset_id,
      status,
      created_at
    )

    VALUES
    (
      'dd04f980-7a7e-44d8-8296-63880c5dcab4',
      ${asset[0].id},
      'pending',
      CURRENT_DATE
    )

    `;



    return NextResponse.json({

      reply:
      `✅ Request created for ${assetName}. Waiting for admin approval...`

    });

  }



  return NextResponse.json({

    reply:
    "Hiii... How can I assist you? 🙂"

  });

}