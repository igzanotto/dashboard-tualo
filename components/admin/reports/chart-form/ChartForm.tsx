import { createChartEmbed } from "@/lib/actions";
import { Select } from "@headlessui/react";


export default function ChartForm({report_id}:any) {
  
  const chartTypes = [
    "Cascada P&L",
    "Ventas",
    "Costos y gastos",
    "Márgenes",
    "Utilidad neta y margen neto",
    "Gastos desglosados"
  ]
  
  return (
    <div className="flex flex-col gap-6 justify-center xl:w-[70%] mx-auto">
      <h1>Crear Gráfico para Reporte {report_id}</h1>
      <form action={createChartEmbed} className="flex flex-col gap-4">
        <input type="hidden" name="report_id" value={report_id} />
        <Select name="type" className="rounded-xl">
          {chartTypes.map((chartType) => (
            <option key={chartType} value={chartType}>{chartType}</option>
          ))}
        </Select>
        <input type="text" name="graphy_url" placeholder='Url del gráfico' className="p-2 rounded-xl"/>
        <button type="submit" className="p-3 rounded-xl bg-blue-500 text-white font-semibold">Crear gráfico</button>
      </form>
    </div>
  );
}
