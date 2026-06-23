"use client";

import { useState } from "react";

export default function ChatPage() {

  const [message,setMessage] = useState("");

  const [chat,setChat] = useState<any[]>([]);


  async function handleSend(){

    if(!message.trim()) return;


    const res = await fetch("/api/chat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message,
        history:chat
      })
    });


    const data = await res.json();



    setChat(prev=>[
      ...prev,

      {
        user:message,
        ai:data.reply,
        action:data.action || null,
        table:data.table || null
      }

    ]);


    setMessage("");

  }



  return (

    <div className="p-6 text-white">


      <h1 className="text-2xl font-bold mb-5">
        🤖 AI Assistant
      </h1>



      <div className="bg-[#111827] p-5 rounded-2xl border border-gray-700 shadow-lg">



        {/* CHAT */}

        <div className="h-[400px] overflow-y-auto space-y-4 pr-2">



        {
          chat.map((c,i)=>(


            <div key={i}>


              {/* USER */}

              <div className="flex justify-end">

                <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 rounded-2xl rounded-br-sm max-w-[70%] shadow">


                  <p className="text-sm">
                    {c.user}
                  </p>


                </div>


              </div>




              {/* AI */}

              <div className="flex justify-start mt-2">


                <div className="bg-gradient-to-r from-emerald-700 to-teal-700 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[75%] shadow">


                  <p className="mb-3">
                    {c.ai}
                  </p>


                  {/* TABLE */}

                  {
                    c.table && c.table.length > 0 && (


                    <div className="bg-black/20 rounded-lg p-2">


                    <table className="w-full text-sm">


                      <thead>

                        <tr className="border-b border-white/20">


                          <th className="p-2">
                            S.No
                          </th>


                          <th className="p-2">
                            Employee
                          </th>


                          <th className="p-2">
                            Asset
                          </th>


                          <th className="p-2">
                            Status
                          </th>


                        </tr>

                      </thead>





                      <tbody>


                      {
                        c.table.map((r:any,index:number)=>(


                          <tr 
                          key={index}
                          className="border-b border-white/10"
                          >


                            <td className="p-2">
                              {index+1}
                            </td>



                            <td className="p-2">
                              {r.employee}
                            </td>



                            <td className="p-2">
                              {r.asset}
                            </td>



                            <td className="p-2 text-yellow-300">
                              {r.status}
                            </td>



                          </tr>


                        ))
                      }


                      </tbody>



                    </table>


                    </div>


                    )
                  }



                </div>


              </div>



            </div>


          ))
        }


        </div>







        {/* INPUT */}


        <div className="flex gap-3 mt-5">


          <input


          value={message}


          onChange={(e)=>setMessage(e.target.value)}


          placeholder="Ask something..."


          className="flex-1 bg-[#1f2937] border border-gray-700 p-3 rounded-xl outline-none focus:border-emerald-500"



          />



          <button


          onClick={handleSend}


          className="bg-emerald-600 hover:bg-emerald-500 px-6 rounded-xl"


          >

          Send


          </button>



        </div>



      </div>


    </div>

  );

}