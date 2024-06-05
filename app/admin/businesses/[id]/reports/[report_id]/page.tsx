import ChartEmbed from '@/components/charts/ChartEmbed';
import ChartIcon from '@/components/icons/ChartIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fetchReportById } from '@/lib/data';
import { InfoIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';
import { createChartEmbed } from '@/lib/actions';



const chartOrder = [
  'Cascada P&L',
  'Ventas',
  'Costos y gastos',
  'Utilidad neta',
  'Márgenes',
  'Gastos desglosados'
];

const reorderCharts = (charts:any) => {
  return charts.sort((a:any, b:any) => {
    return chartOrder.indexOf(a.type) - chartOrder.indexOf(b.type);
  });
};

export default async function ReportPage({
  params,
}: {
  params: { report_id: string, id:string };
}) {
  
  const report = await fetchReportById(params.report_id);
  console.log(report.charts);
  const orderedCharts = reorderCharts(report.charts);

  const businessName = report.business.name;

  
  const renderTextFromDatabase = (text: string | undefined) => {
    if (!text) {
      return <p>Vacío</p>;
    }
  
    const applyStyles = (text: string) => {
      return <span className="font-bold text-zinc-700">{text}</span>;
    };
  
    
    const paragraphs = text.split('\n');
    const formattedParagraphs = paragraphs.map((paragraph, index) => {
      
      const lines = paragraph.split('\n');
      const formattedLines = lines.map((line, lineIndex) => {
        const [firstPart, ...rest] = line.split(':');
        const secondPart = rest.join(':').trim(); // Por si hay más de un ":" en la línea
  
        return (
          <div key={lineIndex}>
            {applyStyles(firstPart)}{secondPart && `: ${secondPart}`} <br /> 
          </div>
        );
      });
  
      return (
        <div key={index}>
          {formattedLines}
        </div>
      );
    });
  
    return (
      <div>
        {formattedParagraphs}
      </div>
    );
  };

  const chartTypes = [
    "Cascada P&L",
    "Ventas",
    "Costos y gastos",
    "Márgenes",
    "Utilidad neta",
    "Gastos desglosados"
  ]


  return (
    <div className="flex flex-col gap-3">
      <h1 className={`text-2xl`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div className="flex items-center justify-between">
        <p className="mb-4 text-4xl">{businessName}</p>
        <Link
          href={`/admin/businesses/${params.id}/reports/${report.id}/create-chart`}
          className="flex w-[220px] items-center justify-center gap-2 rounded-xl bg-blue-800 p-2 text-white"
        >
          Generar gráfico
          <ChartIcon />
        </Link>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <div>
          <p className="mb-4 text-4xl">Resumen</p>
          {report.business_resume ? (
            <p>{report.business_resume}</p>
          ) : (
            <p>Vacío</p>
          )}
        </div>
        <div>
          <p className="mb-4 text-4xl">Objetivos</p>
          {report.goals ? <p>{report.goals}</p> : <p>Vacío</p>}
        </div>
        <div>
          <p className="mb-4 text-4xl">Análisis</p>
          {report.analysis ? <p>{report.analysis}</p> : <p>Vacío</p>}
        </div>

        <div className="mt-10 flex flex-col gap-36">
          {orderedCharts.map((chart: any) => (
            <div
              className={`section-margin flex items-center justify-between gap-10 rounded-xl px-3 py-4 max-xl:flex-col 2xl:px-7 
          ${
            chart.type === 'Costos y gastos'
              ? 'bg-[rgba(255,0,0,0.07046568627450978)]'
              : chart.type === 'Ventas'
              ? 'bg-[rgba(0,255,0,0.1)]'
              : chart.type === 'Utilidad neta y margen neto'
              ? 'bg-[rgba(163,98,238,0.1)]'
              : chart.type === 'Márgenes'
              ? 'bg-[rgba(219,103,255,0.1)]'
              : chart.type === 'Gastos desglosados'
              ? 'bg-[rgba(248,222,103,0.1)]'
              : chart.type === 'Cascada P&L'
              ? 'bg-[rgba(166,166,166,0.1)]'
              : 'bg-gray-100'
          }`}
              id={chart.type}
              key={chart.id}
            >
              <div className="max-xl:w-full xl:w-[50%] 2xl:w-[50%]">
                <div className="flex items-center gap-2">
                  <p className="my-4 text-xl font-semibold text-zinc-700 xl:text-2xl">
                    {' '}
                    Gráfica de <span>{chart.type}</span>
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon width={20} height={20} />
                      </TooltipTrigger>
                      <TooltipContent className="w-[450px]">
                        <p>
                          Esta gráfica se lee de izquierda a derecha: inicia con
                          ingresos totales, luego se deducen los costos de
                          producción (los que están directamente relacionado con
                          las ventas), revelando la utilidad bruta. A
                          continuación, se restan los gastos operativos (los que
                          son indirectos) para obtener la utilidad operativa.
                          Por último se deducen los gastos financieros, para
                          llegar a la utilidad neta. Las barras verdes suman y
                          las rojas restan, dejando las grises como subtotales.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {chart.graphy_url ? (
                  <ChartEmbed src={chart.graphy_url} />
                ) : (
                  <div>
                    <h1>Crear Gráfico de {chart.type}</h1>
                    <form action={createChartEmbed} className='flex flex-col gap-4 xl:w-[60%] mt-10'>
                      <input type="hidden" name="report_id" value={report.id} />
                      <input type="hidden" name="type" value={chart.type} />
                      <input
                        type="text"
                        name="graphy_url"
                        placeholder="Url del gráfico"
                        className="rounded-xl p-2"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-blue-500 p-3 font-medium text-white"
                      >
                        Crear gráfico
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <div className="rounded-lg bg-white px-3 py-5 xl:w-[50%] 2xl:w-[40%]">
                {chart.insights && (
                  <div>
                    <h3 className="mb-5 text-center text-2xl font-medium">
                      Resumen
                    </h3>
                    <p className="text-lg">
                      {renderTextFromDatabase(chart.insights)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
