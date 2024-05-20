import { NextResponse } from "next/server";
// import OpenAI from "openai";

export async function GET() {

  // const openai = new OpenAI();


  console.log("adentroooooo")
  try {
    // const assistant = await openai.beta.assistants.retrieve(
    //   "asst_eXDbopN5sswZRPH64ed2zvhJ"
    // );

    // const thread = await openai.beta.threads.create();

    const assistant = "asistente"
    const thread = "hilo"
    // console.log("assistant",assistant);
    // console.log("thread", thread);

    return NextResponse.json({  assistant: assistant, thread: thread });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
