import OpenAI from "openai";
import { NextResponse } from "next/server";
import fs from "fs";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    // const { business_id } = await request.json()
  
    try {
 
    const file = await openai.files.create({
        file: fs.createReadStream("mydata.jsonl"),
        purpose: "assistants",
      });



    return NextResponse.json({ file: file });
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
  }
}
