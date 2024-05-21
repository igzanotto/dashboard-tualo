import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();

export async function GET(req: Request) {
    const { threadId } = await req.json()
    const assistant_id = "asst_eXDbopN5sswZRPH64ed2zvhJ"

  try {
    const run = await openai.beta.threads.runs.create(
        threadId,
        { assistant_id: assistant_id }
      );

      console.log("run>>>>>>>>", run)


      
    return NextResponse.json({ 
       run: run
    });
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
  }
}
