import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();

export async function POST(req: Request) {
    const { content, threadId } = await req.json()
    const assistant_id = "asst_JZUAqqBJOH1EEbjcSYNWWPY8"

  try {
    const threadMessage = await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: content,
      }
    );

    console.log("threadMmessage>>>>>>>>", threadMessage)

    const run = await openai.beta.threads.runs.createAndPoll(
      threadId,
      { assistant_id: assistant_id }
    );

    console.log("run>>>>>>>>", run)
      
    return NextResponse.json({ message: threadMessage, run: run});
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
  }
}
