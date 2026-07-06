"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chat]);


  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = message;

    const updatedChat = [
      ...chat,
      {
        user: userMessage,
        typing: true,
      },
    ];

    setChat(updatedChat);
    setMessage("");


    const history = chat.flatMap((c) => [
      ...(c.user
        ? [{ role: "user", content: c.user }]
        : []),

      ...(c.ai
        ? [{ role: "assistant", content: c.ai }]
        : []),
    ]);


    try {

      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message:userMessage,
          history
        })
      });


      const data = await res.json();


      setChat((prev)=>{

        const copy=[...prev];

        copy.pop();


        return [
          ...copy,
          {
            user:userMessage,
            ai:data.reply || "No response",
            table:Array.isArray(data.table)
              ? data.table
              : [],
            type:data.type || null,
            typing:false
          }
        ];

      });


    } catch(err){

      setChat((prev)=>{

        const copy=[...prev];
        copy.pop();

        return [
          ...copy,
          {
            user:userMessage,
            ai:"Server error",
            table:[],
            type:null,
            typing:false
          }
        ]

      })

    }

  }


  return (

    <div className="h-screen bg-[#0f172a] text-white flex flex-col p-4 overflow-hidden">


      <h1 className="text-2xl font-bold mb-3">
        🤖 StockFlow AI Assistant
      </h1>



      <div className="flex-1 bg-[#111827] rounded-2xl border border-gray-700 flex flex-col overflow-hidden">


        {/* CHAT */}

        <div className="flex-1 overflow-y-auto p-5 space-y-5">


        {chat.map((c,i)=>(

          <div key={i}>


            {/* USER */}

            <div className="flex justify-end">

              <div className="bg-blue-600 px-4 py-3 rounded-2xl max-w-[70%]">

                {c.user}

              </div>

            </div>



            {/* AI */}

            <div className="flex justify-start mt-3">


              <div
              className={
                c.typing
                ?
                "text-sm italic text-gray-400 px-3 py-2"
                :
                "bg-emerald-700 px-4 py-3 rounded-2xl max-w-[90%]"
              }
              >


              {c.typing ? (

                <div className="flex items-center gap-2">

                  <span>Thinking</span>

                  <div className="flex gap-1">

                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>

                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>

                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>

                  </div>

                </div>

              ):(

                <>


                <p>{c.ai}</p>



                {c.table?.length>0 && (

                <div className="mt-4 overflow-x-auto">


                <table className="w-full text-sm">


                <thead>

                <tr className="border-b border-white/20">


                <th className="p-2">S.No</th>


                {c.type==="employee" && (
                <>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                </>
                )}



                {c.type==="asset" && (
                <>
                <th className="p-2">Asset</th>
                <th className="p-2">Category</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Allocated</th>
                <th className="p-2">Available</th>
                </>
                )}



                {c.type==="request" && (
                <>
                <th className="p-2">Employee</th>
                <th className="p-2">Asset</th>
                <th className="p-2">Status</th>
                </>
                )}


                </tr>

                </thead>



                <tbody>


                {c.table.map((r:any,index:number)=>(


                <tr 
                key={index}
                className="border-b border-white/10"
                >


                <td className="p-2">
                  {index+1}
                </td>



                {/* EMPLOYEE */}

                {c.type==="employee" && (
                <>

                <td className="p-2">
                {r.name ?? "-"}
                </td>

                <td className="p-2">
                {r.email ?? "-"}
                </td>

                <td className="p-2">
                {r.role ?? "-"}
                </td>

                </>
                )}




                {/* ASSET */}

                {c.type==="asset" && (
                <>

                <td className="p-2">
                {r.name ?? "-"}
                </td>

                <td className="p-2">
                {r.category ?? "-"}
                </td>


                <td className="p-2">
                {r.quantity ?? "-"}
                </td>


                <td className="p-2">
                {r.allocated ?? "-"}
                </td>


                <td className="p-2 text-green-300">
                {
                r.available ??
                r.remaining ??
                "-"
                }
                </td>


                </>
                )}




                {/* REQUEST */}

                {c.type==="request" && (
                <>

                <td className="p-2">
                {r.employee ?? "-"}
                </td>


                <td className="p-2">
                {r.asset ?? "-"}
                </td>


                <td className="p-2 text-yellow-300">
                {r.status ?? "-"}
                </td>


                </>
                )}


                </tr>


                ))}


                </tbody>


                </table>


                </div>

                )}



                </>

              )}


              </div>


            </div>


          </div>


        ))}



        <div ref={chatEndRef}/>


        </div>




        {/* INPUT */}

        <div className="p-4 border-t border-gray-700 flex gap-3">


        <input

        value={message}

        onChange={(e)=>setMessage(e.target.value)}

        onKeyDown={(e)=>{
          if(e.key==="Enter")
          handleSend()
        }}

        placeholder="Ask anything..."

        className="
        flex-1
        bg-[#1f2937]
        border
        border-gray-600
        rounded-xl
        p-3
        outline-none
        "

        />



        <button

        onClick={handleSend}

        className="
        bg-emerald-600
        hover:bg-emerald-500
        px-6
        rounded-xl
        "

        >

        Send

        </button>



        </div>



      </div>


    </div>

  );
}