'use client';

import { useState } from "react";

interface FormData {
  start_prompt: string;
  QA_prompt: string;
  QA_transcript: string;



}


export default function Page() {
  const [formData, setFormData] = useState<FormData>({ 
    start_prompt: 'voy a darle asesoría financiera a un cliente, vas a ayudarme a hacer su reporte financiero',
    QA_prompt: 'primero te daré el transcript de la sesión de Q&A que tuve con el cliente, quiero que lo analices y me devuelvas un resumen',
    QA_transcript: '',
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })



    if (!response.ok) {
      console.error('Error al enviar el formulario');
      return;
    }

    const result = await response.json();
    console.log('Formulario enviado con éxito', result);
  };

  return (
    <main>
      <div className="mt-3">
        <h1 className="my-3 text-center">Generador de informes</h1>
        
        
        <form onSubmit={handleSubmit}>
          <textarea
            name="text"
            value={formData.start_prompt}
            onChange={handleChange}
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            defaultValue="voy a darle asesoría financiera a un cliente, vas a ayudarme a
              hacerla te voy a dar contexto sobre la empresa y sus metas
              financieras, así como su P&L de los últimos meses con base en eso,
              me vas a generar tres entregables: 1. comentarios de las gráficas 2.
              highlights y análisis del P&L 3. recomendaciones estratégicas tus
              respuestas deben de ser concisas y el lenguaje que uses debe de ser
              para gente no-financiera, que sea fácil de entender e interpretar
              estás de acuerdo?"
          />
          <textarea
            name="QA_prompt"
            value={formData.QA_prompt}
            onChange={handleChange}
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            defaultValue="primero te daré el transcript de la sesión de Q&A que tuve con el
            emprendedor:"
          />
          <textarea
            name="QA_transcript"
            value={formData.QA_transcript}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            placeholder=">>> ingresar el transcript del Q&A <<<"
          />











          <textarea
            name="Q&A_close"
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            defaultValue="si te queda claro, hazme un resumen de esto y pídeme la información
            de sus metas financieras"
          >
          </textarea>
          <textarea
            name="financial_goals_prompt"
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            defaultValue="Le pedí al emprendedor que eligiera la(s) opción(es) que más
            correspondieran a sus metas actuales desde el punto de vista de las
            finanzas de su empresa. A continuación su respuesta:"
          >
          </textarea>
          <textarea
            name="financial_goals_response"
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            placeholder=">>> ingresar metas financieras <<<"
          ></textarea>
          <textarea
            name="financial_goals_close"
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            defaultValue="si te queda claro, respóndeme solamente con una tabla que resuma lo
            anterior y pídeme siguientes instrucciones"
          >
          </textarea>


          <div className="my-2 flex justify-end">
            <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
              Generar
            </button>
          </div>
        </form>

      </div>


    </main>
  );
}
