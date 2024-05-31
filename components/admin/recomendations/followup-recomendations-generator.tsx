'use client';

import { Button } from '@/components/button';
import { buildFollowupRecomendations } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { followup_recomendations_prompt } from '@/utils/prompts';

interface FormData {
  followup_recomendations_prompt: string;
}

export default function FollowupRecomendationsGenerator({
  threadId,
}: {
  threadId: any;
}) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;

  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    followup_recomendations_prompt,
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
        content: formData.followup_recomendations_prompt,
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

  const handleRetrieveThreadMessages = async (e: React.FormEvent) => {
    e.preventDefault();
    const recomendations = document.getElementById(
      'followup_recomendations_response',
    );

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
    const responseRecomendations =
      messagesData[messagesData.length - 1]?.content;

    if (!recomendations) {
      return;
    }

    recomendations.innerHTML = responseRecomendations;
  };

  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Generar recomendaciones
      </h2>

      <textarea
        name="followup_recomendations_prompt"
        rows={20}
        value={formData.followup_recomendations_prompt}
        onChange={handleChange}
        className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        autoFocus
      />
      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessage}>crear mensaje</Button>
        <p>{statusMessage}</p>
        <Button onClick={handleRetrieveThreadMessages}>obtener mensajes</Button>
        <input type="text" defaultValue={threadId} name="thread_id" />
      </div>

      <div>
        <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
          Recomendaciones
        </h2>
        <form action={buildFollowupRecomendations}>
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
              <label htmlFor="recomendations">
                respuesta de recomendaciones
              </label>
              <textarea
                rows={20}
                id="followup_recomendations_response"
                name="followup_recomendations_response"
                className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder=">>> recomendaciones <<<"
              />
            </div>

            <div className="w-1/2 pl-4">
              <label htmlFor="first_recomendation">primera recomendacion</label>
              <textarea
                name="first_recomendation"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>>  primera recomendacion <<<"
              />
              <label htmlFor="second_recomendation">
                segunda recomendacion
              </label>
              <textarea
                name="second_recomendation"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> segunda recomendacion <<<"
              />
              <label htmlFor="third_recomendation">tercera recomendacion</label>
              <textarea
                name="third_recomendation"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> tercera recomendacion <<<"
              />
              <label htmlFor="fourth_recomendation">cuarta recomendacion</label>
              <textarea
                name="fourth_recomendation"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> cuarta recomendacion <<<"
              />

              <div className="my-2 flex justify-end">
                <button className="rounded-md bg-blue-600 px-3 py-2 text-white  disabled:opacity-50">
                  finalizar reporte
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
