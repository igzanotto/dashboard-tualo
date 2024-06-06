import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { threadId } = await req.json()
    // const assistant_id = "asst_JZUAqqBJOH1EEbjcSYNWWPY8"
    const assistant_id = "asst_Aze3lxejS7YGf1FSf4KFQXB0c"

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
