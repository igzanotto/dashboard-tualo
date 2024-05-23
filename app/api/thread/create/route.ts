import OpenAI from "openai";
import { NextResponse } from "next/server";
import { addThreadToBusiness } from "@/lib/actions";

const openai = new OpenAI();

export async function POST(request: Request) {
    const { business_id } = await request.json()
  try {
 
    const thread = await openai.beta.threads.create();

    addThreadToBusiness(thread.id, business_id);

    return NextResponse.json({ thread: thread });
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
  }
}
