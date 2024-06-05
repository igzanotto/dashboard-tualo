'use client';

import { Button } from '@/components/button';
import { buildRecomendations } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { bullets_prompt, evaluation_prompt, recomendations_prompt } from '@/utils/prompts'

interface FormData {
  bullets_prompt: string;
  evaluation_prompt: string;
  recomendations_prompt: string;
}

export default function RecomendationsGenerator({
  threadId,
}: {
  threadId: any;
}) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;

  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    bullets_prompt,
    evaluation_prompt,
    recomendations_prompt,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatusMessage('creando recomendaciones filtradas...');
    const response = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: formData.recomendations_prompt,
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
    setStatusMessage('recomendaciones generadas con exito!');
  };

  const handleCreateMessageBullet = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatusMessage('generando recomendaciones...');
    const response = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: formData.bullets_prompt,
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
    setStatusMessage('recomendaciones generadas con exito!');
  };

  const handleCreateMessageEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatusMessage('generando evaluacion...');
    const response = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: formData.evaluation_prompt,
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
    setStatusMessage('evaluacion generada con exito!');
  };

  const handleRetrieveThreadMessages = async (e: React.FormEvent) => {
    e.preventDefault();
    const recomendations = document.getElementById('recomendations');

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

    if (!recomendations) {
      return;
    }

    recomendations.innerHTML = responseContent;
  };

  const handleRetrieveThreadMessagesBullet = async (e: React.FormEvent) => {
    e.preventDefault();
    const bullets_response = document.getElementById('bullets_response');

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

    if (!bullets_response) {
      return;
    }

    bullets_response.innerHTML = responseContent;
  };

  const handleRetrieveThreadMessagesEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    const evaluation_response = document.getElementById('evaluation_response');

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

    if (!evaluation_response) {
      return;
    }

    evaluation_response.innerHTML = responseContent;
  };

  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Generar recomendaciones
      </h2>

      <textarea
        name="bullets_prompt"
        rows={5}
        value={formData.bullets_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
      />
      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessageBullet}>crear mensaje</Button>
        <p>{statusMessage}</p>
        <Button onClick={handleRetrieveThreadMessagesBullet}>
          obtener mensajes
        </Button>
        <input type="text" defaultValue={threadId} name="thread_id" />
      </div>

      <textarea
        rows={8}
        id="bullets_response"
        name="bullets_response"
        placeholder=">>> respuesta de api <<<"
        className="w-full rounded-md px-3 py-2 text-black border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />

      <textarea
        name="evaluation_prompt"
        rows={10}
        value={formData.evaluation_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessageEvaluation}>crear mensaje</Button>
        <p>{statusMessage}</p>
        <Button onClick={handleRetrieveThreadMessagesEvaluation}>
          obtener mensajes
        </Button>
        <input type="text" defaultValue={threadId} name="thread_id" />
      </div>

      <textarea
        rows={8}
        id="evaluation_response"
        name="evaluation_response"
        placeholder=">>> respuesta de api <<<"
        className="w-full rounded-md px-3 py-2 text-black border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />

      <textarea
        name="recomendations_prompt"
        rows={13}
        value={formData.recomendations_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessage}>crear mensaje</Button>
        <p>{statusMessage}</p>
        <Button onClick={handleRetrieveThreadMessages}>obtener mensajes</Button>
        <input type="text" defaultValue={threadId} name="thread_id" />
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Recomendaciones
      </h2>

      <form action={buildRecomendations}>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <input
              type="text"
              name="report_id"
              defaultValue={report_id}
              hidden
            />
            <input
              type="text"
              name="business_id"
              defaultValue={business_id}
              hidden
            />
            <label htmlFor="recomendations">respuesta de recomendaciones</label>
            <textarea
              rows={20}
              id="recomendations"
              name="recomendations"
              className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder=">>> recomendaciones <<<"
            />
          </div>

          <div className="w-1/2 pl-4">
            <label htmlFor="first_recomendation">primera recomendacion</label>
            <textarea
              name="first_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              autoFocus
              placeholder=">>>  primera recomendacion <<<"
            />
            <label htmlFor="second_recomendation">segunda recomendacion</label>
            <textarea
              name="second_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              autoFocus
              placeholder=">>> segunda recomendacion <<<"
            />
            <label htmlFor="third_recomendation">tercera recomendacion</label>
            <textarea
              name="third_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              autoFocus
              placeholder=">>> tercera recomendacion <<<"
            />
            <label htmlFor="fourth_recomendation">cuarta recomendacion</label>
            <textarea
              name="fourth_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              autoFocus
              placeholder=">>> cuarta recomendacion <<<"
            />
             <label htmlFor="fifth_recomendation">quinta recomendacion</label>
            <textarea
              name="fifth_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              autoFocus
              placeholder=">>> quinta recomendacion <<<"
            />

            <div className="my-2 flex justify-end">
              <Button className="rounded-md bg-blue-600 px-3 py-2 text-white  disabled:opacity-50">
                Finalizar reporte
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
