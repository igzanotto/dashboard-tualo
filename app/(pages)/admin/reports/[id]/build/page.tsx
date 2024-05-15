'use client';

import { createReport } from '@/app/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  goals_prompt: string;
  goals_transcript: string;
  goals_close: string;
}

export default function BuildReportPage() {
  const [formData, setFormData] = useState<FormData>({
    goals_prompt:
      'le pedí al emprendedor que eligiera la(s) opción(es) que más correspondieran a sus metas actuales desde el punto de vista de las finanzas de su empresa y me dijo lo siguiente.',
    goals_transcript:
      'definitivamente necesito vender más, no necesariamente porque sí creo que soy muy eficiente. Por otro lado, también necesito mejorar mi flujo porque tengo muy poco dinero en el banco y eso tiene que cambiar.',
    goals_close: 'dame un resumen de esto',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const goals = document.getElementById('goals');

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error('Error al enviar el formulario');
      return;
    }

    const result = await response.json();
    console.log('Formulario enviado con éxito', result.content);

    if (!goals) {
      return;
    }

    goals.innerHTML = result.content;
  };

  return (
    <main>
      <div className="mt-3">
        <h1 className="my-3 text-center">Generador de informes</h1>

        <form onSubmit={handleSubmit}>
          <textarea
            name="goals_prompt"
            value={formData.goals_prompt}
            onChange={handleChange}
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />
          <textarea
            name="goals_transcript"
            value={formData.goals_transcript}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            placeholder=">>> ingresar el transcript del Q&A <<<"
          />
          <textarea
            name="goals_close"
            value={formData.goals_close}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />

          <div className="my-2 flex justify-end">
            <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
              Generar
            </button>
          </div>
        </form>

        <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
          Actualizar metas financieras
        </h2>
        <form action={createReport}>
          <label htmlFor="goals" className="mt-3 block">
            Metas financieras
          </label>
          <textarea
            rows={9}
            id="goals"
            name="goals"
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {/* <input type="text" name="report_id" value={report_id} hidden /> */}

          <div className="my-2 flex justify-end">
            <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
              continuar con graficos
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
