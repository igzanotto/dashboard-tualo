'use client';

import { Button } from '@/components/button';
import { createNextReport } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  previous_resume_prompt,
  recomendations_feedback_prompt,
  QA_transcript,
  recomendations_feedback_close,
  PL_transcript,
  highligths_and_PL_analysis_prompt,
} from '@/utils/prompts';

interface FormData {
  previous_resume_prompt: string;
  recomendations_feedback_prompt: string;
  QA_transcript: string;
  recomendations_feedback_close: string;
  PL_transcript: string;
  highligths_and_PL_analysis_prompt: string;

  [key: string]: string;
}

export default function FollowUpGenerator({ threadId }: { threadId: any }) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;

  const handleMonthChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const [selectedMonth, setSelectedMonth] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    previous_resume_prompt,
    recomendations_feedback_prompt,
    QA_transcript,
    recomendations_feedback_close,
    PL_transcript,
    highligths_and_PL_analysis_prompt,
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

    if (elementId === 'previous_resume_create_button') {
      input_message = formData.previous_resume_prompt;
    } else if (elementId === 'recomendations_feedback_create_button') {
      input_message =
        formData.recomendations_feedback_prompt +
        formData.QA_transcript +
        formData.recomendations_feedback_close;
    } else if (elementId === 'PL_transcript_create_button') {
      input_message = formData.PL_transcript;
    } else if (elementId === 'highligths_and_PL_analysis_create_button') {
      input_message = formData.highligths_and_PL_analysis_prompt;
    }

    setStatusMessage('generando mensaje...');
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
        Generar reporte de seguimiento
      </h2>

      <div id="previous_resume_section">
        <h3>Resumen reporte anterior</h3>
        <textarea
          name="previous_resume_prompt"
          rows={10}
          value={formData.previous_resume_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="previous_resume_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="previous_resume_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        <textarea
          rows={8}
          id="previous_resume_response"
          name="previous_resume_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div id="recomendations_feedback_section" className="my-4">
        <h3>Feedback de recomendaciones</h3>
        <textarea
          name="recomendations_feedback_prompt"
          rows={10}
          value={formData.recomendations_feedback_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <textarea
          name="QA_transcript"
          rows={10}
          value={formData.QA_transcript}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <textarea
          name="recomendations_feedback_close"
          rows={2}
          value={formData.recomendations_feedback_close}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />

        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="recomendations_feedback_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="recomendations_feedback_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        <textarea
          rows={3}
          id="recomendations_feedback_response"
          name="recomendations_feedback_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div id="PL_transcript_section">
        <h3>Transcript de P&L</h3>
        <textarea
          name="PL_transcript"
          rows={10}
          value={formData.PL_transcript}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="PL_transcript_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="PL_transcript_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        <textarea
          rows={10}
          id="PL_transcript_response"
          name="PL_transcript_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div id="highligths_and_PL_analysis_section">
        <h3>Highlights y analisis del P&L</h3>
        <textarea
          name="highligths_and_PL_analysis_prompt"
          rows={10}
          value={formData.highligths_and_PL_analysis_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        <div className="my-2 flex justify-between">
          <Button
            onClick={handleCreateMessage}
            id="highligths_and_PL_analysis_create_button"
          >
            crear mensaje
          </Button>
          <p>{statusMessage}</p>
          <Button
            onClick={handleRetrieveThreadMessages}
            id="highligths_and_PL_analysis_retrieve_button"
          >
            obtener mensajes
          </Button>
          <input type="text" defaultValue={threadId} name="thread_id" />
        </div>

        {/* <textarea
          rows={8}
          id="highligths_and_PL_analysis_response"
          name="highligths_and_PL_analysis_response"
          placeholder=">>> respuesta de api <<<"
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        /> */}
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Highligts del mes
      </h2>
      <form action={createNextReport}>
        <textarea
          rows={9}
          id="highligths_and_PL_analysis_response"
          name="highligths_and_PL_analysis_response"
          className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          name="business_id"
          defaultValue={business_id}
          hidden
        />
        <input type="text" name="report_id" defaultValue={report_id} hidden />

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
            className="rounded-md border-2 border-blue-400 bg-blue-600 px-3  py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            disabled={!selectedMonth}
          >
            guardar en DB
          </button>
        </div>
      </form>
    </div>
  );
}
