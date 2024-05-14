import { createReport } from '@/app/lib/actions';

export default function CreateReportForm() {
  return (
    <>
      <div className="mx-auto w-[50%]">
        <h1>Crear reporte</h1>
        <form action={createReport} className="flex flex-col gap-4">
          <input
            type="text"
            name="month"
            placeholder="mes"
            className="rounded-xl bg-slate-100 px-2"
          />
          <input
            type="text"
            name="buisness_resume"
            placeholder="resumen de la empresa"
            className="rounded-xl bg-slate-100 px-2"
          />
          <input
            type="text"
            name="buisness_id"
            placeholder="id de la empresa"
            className="rounded-xl bg-slate-100 px-2"
          />
          <input
            type="text"
            name="goals"
            placeholder="metas"
            className="rounded-xl bg-slate-100 px-2"
          />
          <input
            type="text"
            name="analysis"
            placeholder="análisis"
            className="rounded-xl bg-slate-100 px-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-500 p-3 text-white"
          >
            Agregar negocio
          </button>
        </form>
      </div>
    </>
  );
}
