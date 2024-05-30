'use client';

import { Button } from '@/components/button';
import { buildGoals } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  goals_prompt: string;
  goals_transcript: string;
  goals_close: string;
}

export default function GoalGenerator({ threadId }: { threadId: any }) {
  const report_id = useParams().report_id as string;

  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    goals_prompt:
      'Le pedí al emprendedor que eligiera la(s) opción(es) que más correspondieran a sus metas actuales desde el punto de vista de las finanzas de su empresa. A continuación su respuesta:',
    goals_transcript:'definitivamente necesito vender más, no necesariamente porque sí creo que soy muy eficiente. Por otro lado, también necesito mejorar mi flujo porque tengo muy poco dinero en el banco y eso tiene que cambiar.',
    goals_close: 'dame un resumen de esto',
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
          formData.goals_prompt +
          formData.goals_transcript +
          formData.goals_close,
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
    const goals = document.getElementById('goals');

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

    const responseBusinessResume = result.messagesData[3].content;

    if (!goals) {
      return;
    }

    goals.innerHTML = responseBusinessResume;
  };

  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Generar metas financieras
      </h2>

      <textarea
        name="goals_prompt"
        value={formData.goals_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
      />
      <textarea
        name="goals_transcript"
        value={formData.goals_transcript}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
        placeholder=">>> ingresar el transcript de las metas <<<"
      />
      <textarea
        name="goals_close"
        value={formData.goals_close}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessage}>generar</Button>
        <p>{statusMessage}</p>
        <Button onClick={handleRetrieveThreadMessages}>obtener mensajes</Button>
        <input type="text" defaultValue={threadId} name="thread_id" className=' border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none'/>
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Metas financieras
      </h2>
      <form action={buildGoals}>
        
        <textarea
          rows={9}
          id="goals"
          name="goals"
          className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
        <input type="text" name="report_id" defaultValue={report_id} hidden />

        <div className="my-2 flex justify-end">
          <button className="rounded-md bg-blue-600 px-3 py-2 text-white  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none disabled:opacity-50">
            continuar con P&L
          </button>
        </div>
      </form>
    </div>
  );
}
