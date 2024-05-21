import OpenAI from "openai";

const openai = new OpenAI

export async function POST(  req: Request
) {
    const { start_prompt, QA_prompt, QA_transcript, QA_close, thread_id } = await req.json()  

    console.log("Received request with start_prompt:", start_prompt);


    try {
        // Create a chat completion with the provided prompts and transcript
        const completion = await openai.chat.completions.create({
            messages: [
                {role: "system", content: "You are a helpful assistant that generates financial reports for SMBs."},
                {role: "user", content: start_prompt},
                {role: "assistant", content: "Sure, let's get started!"},
                {role: "user", content: QA_prompt + QA_transcript + QA_close},
            ],
            model: "gpt-3.5-turbo"
        });

        // Log the result to the console
        console.log("Completion result:", completion.choices[0]);

        // Respond to the client with the completion text
        return new Response(JSON.stringify(completion.choices[0].message), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error generating completion:", error);
        return new Response(JSON.stringify({ message: "Failed to generate completion" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}