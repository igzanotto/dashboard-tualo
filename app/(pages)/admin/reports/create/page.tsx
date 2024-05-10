'use client';

import CreateReportForm from '@/components/admin/create-report-form';
import { useState } from 'react';
import { useChat } from 'ai/react';

export default function Page() {
  const { handleInputChange, input, handleSubmit, messages, isLoading } =
    useChat();
  // en teoria se puede modificar la api adonde se ejecuta esto pero no funciona >>
  // useChat({api: "api/openai"})
  
  // const [value, setValue] = useState(
  //   'voy a darle asesoría financiera a un cliente, vas a ayudarme a hacerla.\nTe voy a dar contexto sobre la empresa y sus metas financieras así como su P&L de los últimos meses.\nCon base en eso, me vas a generar tres entregables:\n\n1. comentarios de las gráficas\n2. highlights y análisis del P&L\n3. recomendaciones estratégicas\n\ntus respuestas deben de ser concisas y el lenguaje que uses debe de ser para gente no-financiera, que sea fácil de entender e interpretar\n\nresponde si si entiendes y podemos empezar',
  // );

  const [compnyResume, setCompanyResume] = useState(messages[1]?.content || 'default company resume');

  console.log('messages', messages);

  return (
    <main>
        <div className="mt-3">
          <h1 className="text-center">Prompt</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              rows={4}
              // value={value}
              onChange={handleInputChange}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
            />
            <div className="my-2 flex justify-end">
              <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
                Generar
              </button>
            </div>
          </form>
        </div>
      

      {/* <CreateReportForm /> */}
    </main>
  );
}
