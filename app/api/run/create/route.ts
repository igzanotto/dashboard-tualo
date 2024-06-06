import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();

export async function POST(req: Request) {
    const { threadId } = await req.json()
    // const assistant_id = "asst_JZUAqqBJOH1EEbjcSYNWWPY8"
    const assistant_id = "asst_Jg0yJBog46387NrZIZgsb2ec"

  try {
    const run = await openai.beta.threads.runs.createAndPoll(
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
