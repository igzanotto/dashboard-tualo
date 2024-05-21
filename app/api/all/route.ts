import OpenAI from "openai";

export async function POST( req: Request) {
  const openai = new OpenAI();

  try {
    const assistant = await openai.beta.assistants.retrieve(
      "asst_eXDbopN5sswZRPH64ed2zvhJ"
    );

    const thread = await openai.beta.threads.create();

    const { start_prompt, QA_prompt, QA_transcript, QA_close } = await req.json()  
    const message = QA_prompt + QA_transcript + QA_close

    const threadMessage = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: message,
    });

    let run = await openai.beta.threads.runs.createAndPoll(
        thread.id,
        { 
            assistant_id: assistant.id,
            instructions: "Please address the user as Jane Doe. The user has a premium account."
        }
    );

    console.log("run",run);
    console.log("threadMessage",threadMessage);

    console.log("assistant",assistant);
    console.log("thread", thread);
    console.log("req", req);

    return Response.json({ assistant: assistant });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
