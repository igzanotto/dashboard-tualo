'use client';

import { Button } from '@/components/button';
import { buildAnalysis } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { followup_analysis_prompt } from '@/utils/prompts';

interface FormData {
  followup_analysis_prompt: string;
}

export default function FollowupAnalysisGenerator({
  threadId,
}: {
  threadId: any;
}) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;

  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    followup_analysis_prompt,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatusMessage('creando mensaje...');

    const response = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: formData.followup_analysis_prompt,
        threadId: threadId,
      }),
    });

    if (!response.ok) {
      console.error('Error al agregar menssage al thread');
      setStatusMessage('Error al crear mensaje');

      return;
    }

    const result = await response.json();
    console.log('message creado con exito', result);
    setStatusMessage('mensaje creado con exito!');
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

    const messagesData = result.messagesData;
    const responseContent = messagesData[messagesData.length - 1]?.content;

    if (!analysis) {
      return;
    }

    analysis.innerHTML = responseContent;
  };

  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Generar analisis del P&L
      </h2>

      <textarea
        name="followup_analysis_prompt"
        rows={15}
        value={formData.followup_analysis_prompt}
        onChange={handleChange}
        className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        autoFocus
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessage}>crear mensaje</Button>
        <span>{statusMessage}</span>
        <Button onClick={handleRetrieveThreadMessages}>obtener mensajes</Button>
        <input
          type="text"
          defaultValue={threadId}
          name="thread_id"
          className=" border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Analisis
      </h2>

      <form action={buildAnalysis}>
    
          <input
            type="text"
            name="report_type"
            defaultValue="followup"
            hidden
          />
          <input type="text" name="report_id" defaultValue={report_id} hidden />
          <input
            type="text"
            name="business_id"
            defaultValue={business_id}
            hidden
          />
         <textarea
          rows={20}
          id="analysis"
          name="analysis"
          className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />

          <div className="my-2 flex justify-end">
            <button className="rounded-md border-2 border-blue-400 bg-blue-600 px-3  py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
              continuar con recomendaciones
            </button>
       
        </div>
      </form>
    </div>
  );
}
