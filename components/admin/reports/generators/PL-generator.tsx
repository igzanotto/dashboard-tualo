'use client';

import { Button } from '@/components/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { initial_PL_prompt, initial_PL_transcript, initial_PL_close } from '@/utils/prompts';

interface FormData {
  initial_PL_prompt: string;
  initial_PL_transcript: string;
  initial_PL_close: string;
}

export default function PLGenerator({ threadId }: { threadId: any }) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;
  const [statusMessage, setStatusMessage] = useState('');

  const [PL, setPL] = useState('');

  const [formData, setFormData] = useState<FormData>({
    initial_PL_prompt,
    initial_PL_transcript,
    initial_PL_close,
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
        content:
          formData.initial_PL_prompt +
          formData.initial_PL_transcript +
          formData.initial_PL_close,
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
    const responsePLResume = messagesData[messagesData.length - 1]?.content;

    setPL(responsePLResume);
  };


  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Ingresar P&L
      </h2>

      <textarea
        name="initial_PL_prompt"
        value={formData.initial_PL_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
      />
      <textarea
        name="initial_PL_transcript"
        value={formData.initial_PL_transcript}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
        placeholder=">>> ingresar el P&L sin formato <<<"
      />
      <textarea
        name = "initial_PL_close"
        value={formData.initial_PL_close}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessage}>crear mensaje</Button>
        <p>{statusMessage}</p>
        <Button onClick={handleRetrieveThreadMessages}>obtener mensajes</Button>
        <input type="text" defaultValue={threadId} name="thread_id" className=' border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none' />
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        P&L procesado
      </h2>
      <form>
        
        <textarea
          rows={9}
          id="PL"
          name="PL"
          className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={PL}
        />
        <input type="text" name="report_id" defaultValue={report_id} hidden />

        <div className="my-2 flex justify-end">
          <a href={`/admin/businesses/${business_id}/reports/${report_id}/charts`} className="rounded-md bg-blue-600 px-3 py-2 text-white  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none disabled:opacity-50">
            Ir a Gráficos
          </a>
        </div>
      </form>
    </div>
  );
}
