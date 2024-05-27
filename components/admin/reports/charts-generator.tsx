'use client';

import { Button } from '@/components/button';
import { buildChartsInsights } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  charts_prompt: string;
}

export default function ChartsGenerator({ threadId }: { threadId: any }) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;

  const [formData, setFormData] = useState<FormData>({
    charts_prompt: `
      ahora vamos con el 1er entregable: *comentarios de las gráficas*
      necesito insights que le ayuden al cliente a interpretar sus resultados financieros de la empresa en caso de que él no pueda llegar a esas conclusiones por su cuenta (facilitarle los insights financieros principales dados los números resultantes este mes)
      pon ejemplos específicos, usa números reales, no solo le expliques cómo interpretarlo sino interpretalo por él
      menciona los tres insights más importantes de cada una en bullets y hazlos personalizados
      las gráficas del reporte son:

      - waterfall chart que representa su P&L acumulado. las barras son: primero los ingresos, luego los costos, luego gastos, y finalmente gastos financieros; y los subtotales que van quedando son primero la utilidad bruta, luego la operativa y luego la neta. no hay números individuales de cada mes, sino del periodo completo
      - gráfica de barras de sus ventas mensuales con una línea para el promedio
      - gráfica de barras de sus costos mensuales y gastos mensuales, con líneas para cada uno de los promedios
      - gráfica de barras que muestra la utilidad neta en el eje izquierdo, y el margen neto en gráfica de línea en el eje derecho
      - gráfica de líneas con la evolución de los tres márgenes principales: margen bruto, margen operativo, y margen neto
      - gráfica de líneas de la evolución de sus gastos mensuales desglosado por tipo de gasto (no incluye los costos ni los financieros, solo gastos)
    `,
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
        content: formData.charts_prompt,
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

    const responseBusinessResume = result.messagesData[7].content;

    if (!chartsResponse) {
      return;
    }

    chartsResponse.innerHTML = responseBusinessResume;
  };

  return (
    <div className="mt-3">
      <h1 className="my-3 text-center">Generador de informes</h1>

      <textarea
        name="PL_prompt"
        rows={15}
        value={formData.charts_prompt}
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
          insights de graficas
        </h2>

        <form action={buildChartsInsights}>

          <div className='flex'>
            <div className="w-1/2 pr-4">
              <input type="text" name="report_id" defaultValue={report_id} hidden />
              <input type="text" name="business_id" defaultValue={business_id} hidden />
              <label htmlFor="chartsResponse">Respuesta de las graficas</label>
              <textarea
                rows={30}
                id="chartsResponse"
                name="chartsResponse"
                className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="w-1/2 pl-4">
              <label htmlFor="waterfall_chart_insights">grafico de cascada</label>
              <textarea
                name="waterfall_chart_insights"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> insights del grafico de cascada <<<"
              />
              <label htmlFor="sales_chart_insights">grafico de ventas</label>
              <textarea
                name="sales_chart_insights"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> insights del grafico de ventas <<<"
              />
              <label htmlFor="costs_and_expenses_chart_insights">
                grafico de costos y gastos
              </label>
              <textarea
                name="costs_and_expenses_chart_insights"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> insights del grafico de costos y gastos <<<"
              />
              <label htmlFor="net_profit_and_margins_chart_insights">
                grafico de utilidad neta y margen neto
              </label>
              <textarea
                name="net_profit_and_margins_chart_insights"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> insights del grafico de utilidad neta y margen neto <<<"
              />
              <label htmlFor="margins_chart_insights">grafico de margenes</label>
              <textarea
                name="margins_chart_insights"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> insights del grafico de margenes <<<"
              />
              <label htmlFor="detailed_expenses_chart_insights">
                grafico de costos desglosados
              </label>
              <textarea
                name="detailed_expenses_chart_insights"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
                placeholder=">>> insights del grafico de costos desglosados <<<"
              />
              <div className="my-2 flex justify-end">
                <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
                  continuar con analisis
                </button>
              </div>
            </div>
          </div>
        </form>
    </div>
  );
}
