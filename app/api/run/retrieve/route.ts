// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// const openai = new OpenAI();

// export async function POST(req: Request) {
//     const { threadId, runId } = await req.json()
    

//   try {
//     const run = await openai.beta.threads.runs.retrieve(
//         threadId, 
//         runId  
//       );

//       console.log("run>>>>>>>>", run)


      
//     return NextResponse.json({ 
//        run: run
//     });
   
//   } catch (error) {
//     // Handle any errors that occur during the API call
//     console.error("Error generating stuff:", error);
//   }
// }
