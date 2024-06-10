'use client';

import { Button } from '@/components/button';
import { buildRecomendations } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  followup_recomendations_bullets_prompt,
  followup_recomendations_ideas_prompt,
  followup_recomendations_evaluation_prompt,
  followup_recomendations_ponderation_prompt,
  followup_recomendations_selection_prompt,
  followup_recomendations_generation_prompt,
} from '@/utils/prompts';

interface FormData {
  followup_recomendations_bullets_prompt: string;
  followup_recomendations_ideas_prompt: string;
  followup_recomendations_evaluation_prompt: string;
  followup_recomendations_ponderation_prompt: string;
  followup_recomendations_selection_prompt: string;
  followup_recomendations_generation_prompt: string;
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
    followup_recomendations_bullets_prompt,
    followup_recomendations_ideas_prompt,
    followup_recomendations_evaluation_prompt,
    followup_recomendations_ponderation_prompt,
    followup_recomendations_selection_prompt,
    followup_recomendations_generation_prompt,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    // genero un input_message para la solicitud a la api dependiendo del input de donde se llamo la funcion
    const target = e.target as HTMLElement;
    const elementId = target.id;

    let input_message;

    if (elementId === 'followup_recomendations_bullets_create_button') {
      input_message = formData.followup_recomendations_bullets_prompt;
    } else if (elementId === 'followup_recomendations_ideas_create_button') {
      input_message = formData.followup_recomendations_ideas_prompt;
    } else if (
      elementId === 'followup_recomendations_evaluation_create_button'
    ) {
      input_message = formData.followup_recomendations_evaluation_prompt;
    } else if (
      elementId === 'followup_recomendations_ponderation_create_button'
    ) {
      input_message = formData.followup_recomendations_ponderation_prompt;
    } else if (
      elementId === 'followup_recomendations_selection_create_button'
    ) {
      input_message = formData.followup_recomendations_selection_prompt;
    } else if (
      elementId === 'followup_recomendations_generation_create_button'
    ) {
      input_message = formData.followup_recomendations_generation_prompt;
    }

    setStatusMessage('generando ...');
    const response = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: input_message,
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
    const target = e.target as HTMLElement;
    const elementId = target.id;
    const elementToTarget = elementId.replace('retrieve_button', 'response');
    console.log('ID del elemento al que apuntar:', elementToTarget);

    // toma el id y crea una nueva variable reemplazando la palabra buton por response
    const response_input = document.getElementById(elementToTarget);

    console.log('response_input:', response_input);

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

    if (!response_input) {
      return;
    }

    response_input.innerHTML = responseContent;
  };


  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Generar recomendaciones
      </h2>

      <div id="bullets-section">
        <textarea
          name="followup_recomendations_bullets_prompt"
          rows={7}
          value={formData.followup_recomendations_bullets_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="followup_recomendations_bullets_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="followup_recomendations_bullets_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        <textarea
          rows={7}
          id="followup_recomendations_bullets_response"
          name="followup_recomendations_bullets_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div id="ideas-section">
        <h2>Ideas</h2>
        <textarea
          name="followup_recomendations_ideas_prompt"
          rows={7}
          value={formData.followup_recomendations_ideas_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="followup_recomendations_ideas_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="followup_recomendations_ideas_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        <textarea
          rows={7}
          id="followup_recomendations_ideas_response"
          name="followup_recomendations_ideas_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div id="evaluation-section">
        <h2>evaluacion de ideas</h2>
        <textarea
          name="followup_recomendations_evaluation_prompt"
          rows={7}
          value={formData.followup_recomendations_evaluation_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="followup_recomendations_evaluation_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="followup_recomendations_evaluation_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        <textarea
          rows={7}
          id="followup_recomendations_evaluation_response"
          name="followup_recomendations_evaluation_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div id="ponderation-section">
        <h2>ponderacion de ideas</h2>
        <textarea
          name="followup_recomendations_ponderation_prompt"
          rows={7}
          value={formData.followup_recomendations_ponderation_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="followup_recomendations_ponderation_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="followup_recomendations_ponderation_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        <textarea
          rows={7}
          id="followup_recomendations_ponderation_response"
          name="followup_recomendations_ponderation_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div id="selection-section">
        <h2>seleccion de ideas</h2>
        <textarea
          name="followup_recomendations_selection_prompt"
          rows={7}
          value={formData.followup_recomendations_selection_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="followup_recomendations_selection_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="followup_recomendations_selection_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        <textarea
          rows={7}
          id="followup_recomendations_selection_response"
          name="followup_recomendations_selection_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div id="generation-section">
        <h2>generar recomendaciones finales</h2>
        <textarea
          name="followup_recomendations_generation_prompt"
          rows={7}
          value={formData.followup_recomendations_generation_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="followup_recomendations_generation_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="followup_recomendations_generation_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

       
      </div>

      <div>
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
              <label htmlFor="recomendations">
                respuesta de recomendaciones
              </label>
              <textarea
                rows={20}
                id="followup_recomendations_generation_response"
                name="followup_recomendations_generation_response"
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
              <label htmlFor="fifth_recomendation">quinta recomendacion</label>
              <textarea
                name="fifth_recomendation"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> quinta recomendacion <<<"
              />

              <div className="my-2 flex justify-end">
                <button className="rounded-md bg-blue-600 px-3 py-2 text-white  disabled:opacity-50">
                  Guardar recomendaciones
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
