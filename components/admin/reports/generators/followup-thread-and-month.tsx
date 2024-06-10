'use client';

import { createFollowupReport } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function FollowUpThreadAndMonth({
  threadId, assistantId
}: {
  threadId: any;
  assistantId: any;
}) {
  const business_id = useParams().business_id as string;
  const handleMonthChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const [selectedMonth, setSelectedMonth] = useState('');

  return (
    <main>
      <div className="mt-3">
        <form action={createFollowupReport}>
          <input
            type="text"
            name="business_id"
            defaultValue={business_id}
            hidden
          />
          <div className="space-between my-2 flex items-center justify-around">
            <input
              type="text"
              name="assistant_id"
              defaultValue={assistantId}
              placeholder='assistant_id'
              className="w-1/3 rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              name="thread_id"
              defaultValue={threadId}
              placeholder='thread_id'
              className="w-1/3 rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <select
              name="month"
              className=" rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
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
