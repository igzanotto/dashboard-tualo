import openai from "@/utils/openai";

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  mensaje: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ mensaje: 'Obtuviste una respuesta' });
      break;
    case 'POST':
      res.status(201).json({ mensaje: 'Creaste algo' });
      break;
    case 'PUT':
      res.status(200).json({ mensaje: 'Actualizaste algo' });
      break;
    case 'DELETE':
      res.status(200).json({ mensaje: 'Eliminaste algo' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}

  

// export async function POST(req: Request) {
    
//     const { messages } = await req.json()

//   const completion = await openai.chat.completions.create({
//     messages: [{"role": "system", "content": "You are a helpful assistant."},
//         {"role": "user", "content": "Who won the world series in 2020?"},
//         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//         {"role": "user", "content": "Where was it played?"}],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
//   console.log(completion.choices[0].message.content);
// }


// chat completion response format
// {
//     "choices": [
//       {
//         "finish_reason": "stop",
//         "index": 0,
//         "message": {
//           "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
//           "role": "assistant"
//         },
//         "logprobs": null
//       }
//     ],
//     "created": 1677664795,
//     "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
//     "model": "gpt-3.5-turbo-0613",
//     "object": "chat.completion",
//     "usage": {
//       "completion_tokens": 17,
//       "prompt_tokens": 57,
//       "total_tokens": 74
//     }
//   }