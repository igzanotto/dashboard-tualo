import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();

export async function POST(req: Request) {
    const { content, threadId } = await req.json()

  try {
    const message = await openai.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content: content,
        }
      );

      console.log("message>>>>>>>>", message)
      
    return NextResponse.json({ message: message });
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
  }
}
