import OpenAI from "openai";
import { NextResponse } from "next/server";
import { addThreadToBusiness } from "@/lib/actions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    
    const { business_id } = await request.json()

    const thread = await openai.beta.threads.create();

    await addThreadToBusiness(thread.id, business_id);

    return NextResponse.json({ thread: thread });
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
    return NextResponse.json({ error: "Failed to create thread" }, { status: 500 });
  }
}
