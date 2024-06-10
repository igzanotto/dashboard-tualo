import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    
  try {
    const myAssistant = await openai.beta.assistants.create({
        instructions:
          "Eres un asesor financiero de pequeños negocios y trabajas en mi consultora. Quiero que me ayudes a generar un reporte financiero, que utilice lenguaje no financiero para que mi cliente pueda entenderlo.",
        name: "Tualo advisor",
        model: "gpt-4o",
      });

      console.log("run>>>>>>>>", myAssistant)
      
    return NextResponse.json({ 
       run: myAssistant
    });
   
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error generating stuff:", error);
  }
}
