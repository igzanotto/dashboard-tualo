import OpenAI from "openai";
import { NextResponse } from "next/server";
import { fetchBusinessAssistantId } from "@/lib/data";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { content, threadId, businessId } = await req.json()

    let assistant_id = "asst_Jg0yJBog46387NrZIZgsb2ec"

    if (businessId) {
      assistant_id = await fetchBusinessAssistantId(businessId)
    }

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
