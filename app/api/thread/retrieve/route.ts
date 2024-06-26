import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
        return new Response('threadId is required', { status: 400 });
    }

  try {
 
    const messages = await openai.beta.threads.messages.list(
        threadId
      );
      let messagesData = []
      for (const message of messages.data.reverse()) {
        for (const contentBlock of message.content) {
          if ('text' in contentBlock) {
            console.log(`${message.role} > ${contentBlock.text.value}`);
            messagesData.push({
                role: message.role,
                content: contentBlock.text.value,
            });
          }
        }
      }

    //   console.log("messages>>>>>>>>", messages)
    return NextResponse.json({ messagesData: messagesData });
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
