import { createReport } from '@/app/lib/actions';

export default function CreateReportForm() {
  return (
    <>
      <div>
          <div className="mt-3">
            <h1 className="mt-4 text-center">Resumen empresa</h1>
            <textarea
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
             
            </textarea>
          </div>





          <div className="mt-3">
          
            <h1 className="text-center">Metas financieras</h1>
            <textarea
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              
            </textarea>
          </div>
          <div className="mt-3">
            <h1 className="text-center">Analisis financiero</h1>
            <textarea
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              
            </textarea>
          </div>
          <div className="mt-3">
            <h1 className="text-center">Recomendaciones</h1>
            <textarea
              rows={4}
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              
            </textarea>
          </div>
        </div>
   
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
