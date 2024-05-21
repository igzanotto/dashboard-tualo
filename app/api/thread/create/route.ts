import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();

export async function GET() {

  try {
 
    const thread = await openai.beta.threads.create();

    return NextResponse.json({ thread: thread });
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
  }
}
