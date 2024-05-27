'use client';

import { Button } from '@/components/button';
import { buildRecomendations } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';

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

  const [formData, setFormData] = useState<FormData>({
    bullets_prompt: `para el 3er entregable lo vamos a hacer paso a paso

      lo primero que haremos es lo siguiente:
      haz una lista en bullets de al menos 10 recomendaciones que podrían servirle a esta
      empresa dado su modelo de negocios y su situación financiera, todas enfocadas al cumplimiento de su meta financiera`,
    evaluation_prompt: `muy bien, ahora vamos a evaluar estas recomendaciones iniciales. Por favor, crea una matriz con las recomendaciones propuestas, evaluándolas según su nivel de personalización para este cliente, su nivel de accionabilidad, y su nivel de alineación con su meta financiera, usando la siguiente estructura:

    recomendación | nivel de personalización (1 = muy genérica, 10 = hiper personalizada) | nivel de accionabilidad (1 = tomaría muchos meses o años, 10 = se podría implementar en unas semanas) | nivel de alineación con su meta financiera (1 = nada alineada, 10 = totalmente alineada al cumplimiento de su meta)
    
    Quiero ponderar la alineación con metas con 10 puntos, la accionabilidad con 5 puntos y la personalización con 3 puntos. Con eso en mente, ¿cuáles serían las recomendaciones más adecuadas para incluir en el reporte?`,
    recomendations_prompt: `muy bien, ahora sí desarrollaremos el 3er entregable: **recomendaciones estratégicas**

    considera lo siguiente:
    
    - desarrolla las 3 a 5 mejores recomendaciones de la lista anterior, las que tuvieron el puntaje más alto en la ponderación
    - usa el siguiente formato: un título seguido de un emoji relacionado, una descripción de una línea, una justificación de por qué decidiste incluir esa recomendación (usa ejemplos específicos de sus finanzas o su modelo de negocio para justificarlo), y una lista de entre 3 y 5 pasos para explicar cómo lograrlo
    - habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)
    - si consideras que alguna es algo compleja para personas que no tienen mucho expertise en negocios, incluye "Tips adicionales" donde menciones herramientas específicas a usar o contenido en línea que pueda ayudarles a entenderlo mejor
    - nunca recomiendes nada relacionado a mejorar la gestión de gastos o el control financiero, ya que eso es lo que estamos haciendo nosotros con los clientes ;)`,
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
        content: formData.recomendations_prompt,
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

  const handleCreateMessageBullet = async (e: React.FormEvent) => {
    e.preventDefault();

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
      return;
    }

    const result = await response.json();
    console.log('message creado con exito', result);
  };

  const handleCreateMessageEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();

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

    const responseRecomendations = result.messagesData[17].content;

    if (!recomendations) {
      return;
    }

    recomendations.innerHTML = responseRecomendations;
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

    const responseRecomendations = result.messagesData[13].content;

    if (!bullets_response) {
      return;
    }

    bullets_response.innerHTML = responseRecomendations;
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

    const responseRecomendations = result.messagesData[15].content;

    if (!evaluation_response) {
      return;
    }

    evaluation_response.innerHTML = responseRecomendations;
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
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        autoFocus
      />
      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessageBullet}>crear mensaje</Button>
        <Button onClick={handleCreateRun}>crear Run</Button>
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
        className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2"
      />

      <textarea
        name="evaluation_prompt"
        rows={10}
        value={formData.evaluation_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessageEvaluation}>crear mensaje</Button>
        <Button onClick={handleCreateRun}>crear Run</Button>
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
        className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2"
      />

      <textarea
        name="recomendations_prompt"
        rows={13}
        value={formData.recomendations_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessage}>crear mensaje</Button>
        <Button onClick={handleCreateRun}>crear Run</Button>
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
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder=">>> recomendaciones <<<"
            />
          </div>

          <div className="w-1/2 pl-4">
            <label htmlFor="first_recomendation">primera recomendacion</label>
            <textarea
              name="first_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
              placeholder=">>>  primera recomendacion <<<"
            />
            <label htmlFor="second_recomendation">segunda recomendacion</label>
            <textarea
              name="second_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
              placeholder=">>> segunda recomendacion <<<"
            />
            <label htmlFor="third_recomendation">tercera recomendacion</label>
            <textarea
              name="third_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
              placeholder=">>> tercera recomendacion <<<"
            />
            <label htmlFor="fourth_recomendation">cuarta recomendacion</label>
            <textarea
              name="fourth_recomendation"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
              placeholder=">>> cuarta recomendacion <<<"
            />

            <div className="my-2 flex justify-end">
              <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
                finalizar reporte
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
