import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(  req: Request
) {
    const { start_prompt, QA_prompt, QA_transcript } = await req.json()  
    
    console.log("texto>>>>", start_prompt, QA_prompt, QA_transcript)

    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant that generates financial reports for S&Bs"},
            {"role": "user", "content": start_prompt},
            {"role": "assistant", "content": "claro!"},
            {"role": "user", "content": QA_prompt},
            {"role": "assistant", "content": "envialo"},
            {"role": "user", "content": QA_transcript},],
        model: "gpt-3.5-turbo",
        
      });
    
      console.log(completion.choices[0]);

    return new Response("ok")
    }