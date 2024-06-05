import { createChartEmbed } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export default function ChartForm({report_id}:any) {
  console.log(report_id);
  
  const chartTypes = [
    'waterfall',
    'sales',
    'costs_and_expenses',
    'net_profit_and_margins',
    'margins',
    'detailed_expenses'
  ]
  
  return (
    <div className="mx-auto flex flex-col justify-center gap-6 xl:w-[70%]">
      <h1>Crear Gráfico para Reporte {report_id}</h1>
      <form action={createChartEmbed} className="flex flex-col gap-4">
        <input type="hidden" name="report_id" value={report_id} />
        <Select name="type">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de gráfica" />
          </SelectTrigger>
          <SelectContent>
            {chartTypes.map((chartType) => (
              <SelectItem key={chartType} value={chartType}>{chartType}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          type="text"
          name="graphy_url"
          placeholder="Url del gráfico"
          className="rounded-xl p-2"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-500 p-3 font-semibold text-white"
        >
          Crear gráfico
        </button>
      </form>
    </div>
  );
}
