'use client';

import { Button } from '@/components/button';
import { createReport } from '@/lib/actions';
import { initial_QA_prompt, initial_QA_transcript, initial_QA_close } from '@/utils/prompts';
import { useState } from 'react';

interface FormData {
  initial_QA_prompt: string;
  initial_QA_transcript: string;
  initial_QA_close: string;
}

export default function CreateReportPage({ params }: { params: any }) {
  const { business_id } = params;
  console.log('business_id', business_id);

  const handleMonthChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const [selectedMonth, setSelectedMonth] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [threadId, setThreadId] = useState('');


  const [formData, setFormData] = useState<FormData>({
    initial_QA_prompt,
    initial_QA_transcript,
    initial_QA_close
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Creando hilo...');

    try {
      const generateThreadResponse = await fetch('/api/thread/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ business_id }),
      });

      if (!generateThreadResponse.ok) {
        throw new Error('Error al enviar el formulario');
      }

      const threadResult = await generateThreadResponse.json();
      const threadId = threadResult.thread.id;
      setThreadId(threadId);

      setStatusMessage('Hilo creado con éxito');

      console.log('Thread generado con éxito', threadResult);

      setStatusMessage('generando resumen del negocio...');

      const runMessageResponse = await fetch('/api/message/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content:
            formData.initial_QA_prompt + formData.initial_QA_transcript + formData.initial_QA_close,
          threadId,
        }),
      });

      if (!runMessageResponse.ok) {
        throw new Error('Error al agregar mensaje al thread');
      }

      const messageResult = await runMessageResponse.json();
      setStatusMessage('resumen generado con éxito');
      console.log('resumen generado con éxito!', messageResult);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleRetrieveThreadMessages = async (e: React.FormEvent) => {
    e.preventDefault();
    const business_resume = document.getElementById('business_resume');

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
    const responseBusinessResume = messagesData[messagesData.length - 1]?.content;

    if (!business_resume) {
      return;
    }

    business_resume.innerHTML = responseBusinessResume;
  };

  return (
    <main>
      <div className="mt-3 ">
        <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
          Generador de Reportes
        </h2>
        <textarea
          name="initial_QA_prompt"
          value={formData.initial_QA_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <textarea
          name="initial_QA_transcript"
          value={formData.initial_QA_transcript}
          onChange={handleChange}
          rows={12}
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
          placeholder=">>> ingresar el transcript del Q&A <<<"
        />
        <textarea
          name="initial_QA_close"
          value={formData.initial_QA_close}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />

        <div className="my-2 flex justify-between">
          <Button onClick={handleRun}>Ejecutar</Button>
          <p>{statusMessage}</p>
          <Button onClick={handleRetrieveThreadMessages}>
            obtener mensajes
          </Button>
          <input
            type="text"
            defaultValue={threadId}
            name="thread_id"
            className="border-2 border-blue-400"
          />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
          Resumen de la empresa
        </h2>
        <form action={createReport}>
          <textarea
            rows={9}
            id="business_resume"
            name="business_resume"
            className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="text"
            name="business_id"
            defaultValue={business_id}
            hidden
          />
          <div className="space-between my-2 flex items-center justify-around">
            <select
              name="month"
              className="w-1/2 rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">Seleccione un mes</option>
              <option value="Enero">Enero</option>
              <option value="Febrero">Febrero</option>
              <option value="Marzo">Marzo</option>
              <option value="Abril">Abril</option>
              <option value="Mayo">Mayo</option>
              <option value="Junio">Junio</option>
              <option value="Julio">Julio</option>
              <option value="Agosto">Agosto</option>
              <option value="Septiembre">Septiembre</option>
              <option value="Octubre">Octubre</option>
              <option value="Noviembre">Noviembre</option>
              <option value="Diciembre">Diciembre</option>
            </select>
            <button
              className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              disabled={!selectedMonth}
            >
              crear en DB
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
