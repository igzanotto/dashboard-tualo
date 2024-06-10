'use client';

import { Button } from '@/components/button';
import { buildChartsInsights } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { followup_charts_prompt } from '@/utils/prompts';

interface FormData {
  followup_charts_prompt: string;
}

export default function FollowupChartsGenerator({
  threadId,
}: {
  threadId: any;
}) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;

  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    followup_charts_prompt,
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
        content: formData.followup_charts_prompt,
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
    const chartsResponse = document.getElementById('chartsResponse');

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

    if (!chartsResponse) {
      return;
    }

    chartsResponse.innerHTML = responseContent;
  };

  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Generar insights de graficas
      </h2>

      <textarea
        name="PL_prompt"
        rows={15}
        value={formData.followup_charts_prompt}
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
        Insights de graficas
      </h2>

      <form action={buildChartsInsights}>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <input
              type="text"
              name="report_type"
              defaultValue="followup"
              hidden
            />
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
            <label htmlFor="chartsResponse">Respuesta de las graficas</label>
            <textarea
              rows={30}
              id="chartsResponse"
              name="chartsResponse"
              className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="w-1/2 pl-4">
            <label htmlFor="waterfall_chart_insights">grafico de cascada</label>
            <textarea
              name="waterfall_chart_insights"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
              placeholder=">>> insights del grafico de cascada <<<"
            />
            <label htmlFor="actual_vs_average_chart_insights">
              grafico actual vs promedio
            </label>
            <textarea
              name="actual_vs_average_chart_insights"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
              placeholder=">>> insights del grafico de ventas <<<"
            />
            <label htmlFor="actual_vs_average_2_chart_insights">
              grafico 2 actual vs promedio
            </label>
            <textarea
              name="actual_vs_average_2_chart_insights"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
              placeholder=">>> insights del grafico de costos y gastos <<<"
            />

            <div className="my-2 flex justify-end">
              <button className="rounded-md border-2 border-blue-400 bg-blue-600 px-3  py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
                continuar con siguientes graficos
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
