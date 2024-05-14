import { createChart } from "@/app/lib/actions";

export default function FormChart(){
    return(
        <div className="mx-auto w-[50%]">
        <h1>Crear reporte</h1>
        <form action={createChart} className="flex flex-col gap-4">
          <input
            type="text"
            name="type"
            placeholder="Tipo de gráfico"
            className="rounded-xl bg-slate-100 px-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            className="rounded-xl bg-slate-100 px-2"
          />
          <input
            type="text"
            name="insights"
            placeholder="Ideas"
            className="rounded-xl bg-slate-100 px-2"
          />
          <input
            type="text"
            name="report_id"
            placeholder="Id de reporte asociado"
            className="rounded-xl bg-slate-100 px-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-500 p-3 text-white"
          >
            Crear gráfico
          </button>
        </form>
      </div>
    )
}