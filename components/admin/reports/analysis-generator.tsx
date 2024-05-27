'use client';

import { Button } from '@/components/button';
import { buildAnalysis } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  analysis_prompt: string;
}

export default function AnalysisGenerator({ threadId }: { threadId: any }) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;

  const [formData, setFormData] = useState<FormData>({
    analysis_prompt:
      `vamos con el 2do entregable: **highlights y análisis del P&L**
      usando lo aprendido en las gráficas anteriores del 1er entregable, resume las conclusiones e insights más importantes en un análisis financiero
      
      toma las siguientes consideraciones para hacerlo:
      
      - haz 5 bullets con los highlights financieros
      - usa ejemplos específicos para explicar tus hallazgos, mencionando métricas o números
      - habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)
      - enfócate en hacer solamente análisis, nada de recomendaciones`,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: formData.analysis_prompt,
        threadId: threadId,
      }),
    });

    if (!response.ok) {
      console.error('Error al agregar menssage al thread');
      return;
    }

    const result = await response.json();
    console.log('message creado con exito', result);
  };

  const handleCreateRun = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/run/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        threadId: threadId,
      }),
    });

    if (!response.ok) {
      console.error('Error al crear RUN');
      return;
    }

    const result = await response.json();
    console.log('Run creado con exito', result);
  };

  const handleRetrieveThreadMessages = async (e: React.FormEvent) => {
    e.preventDefault();
    const analysis = document.getElementById('analysis');

    const response = await fetch(`/api/thread/retrieve?threadId=${threadId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error al obtener mensajes');
      return;
    }

    const result = await response.json();
    console.log('Mensajes obtenidos con exito', result);

    const responseBusinessResume = result.messagesData[9].content;

    if (!analysis) {
      return;
    }

    analysis.innerHTML = responseBusinessResume;
  };

  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Generar analisis financiero
      </h2>

      <textarea
        name="analysis_prompt"
        rows={13}
        value={formData.analysis_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        autoFocus
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessage}>crear mensaje</Button>
        <Button onClick={handleCreateRun}>crear Run</Button>
        <Button onClick={handleRetrieveThreadMessages}>obtener mensajes</Button>
        <input type="text" defaultValue={threadId} name="thread_id" />
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Analisis financiero
      </h2>
      <form action={buildAnalysis}>
        <input type="text" name="report_id" defaultValue={report_id} hidden />
        <input type="text" name="business_id" defaultValue={business_id} hidden />
        
        <textarea
          rows={20}
          id="analysis"
          name="analysis"
          className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="my-2 flex justify-end">
          <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
            continuar con recomendaciones
          </button>
        </div>
      </form>
    </div>
  );
}
