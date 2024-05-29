import ChartEmbed from '@/components/charts/ChartEmbed';
import ModalDashboard from '@/components/modal/Modal';
import { fetchReportById } from '@/lib/data';
import { FolderIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { File, GoalIcon, InfoIcon, ListEndIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Link from 'next/link';
import SuggestIcon from '@/components/icons/SuggestIcon';
import Attachment from '@/components/icons/Attachment';
import '../../../globals.css'

export default async function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const report = await fetchReportById(id);

  
  const renderTextFromDatabase = (text: string | undefined) => {
    if (!text) {
      return <p>Vacío</p>;
    }
  
    const applyStyles = (text: string) => {
      return <span className="font-bold text-black">{text}</span>;
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
  

  return (
    <div className="flex flex-col gap-3">

      <h1 className={`text-2xl font-semibold`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div>
        <p className="mb-4 text-xl font-semibold xl:text-4xl">
          {report.business.name}
        </p>
      </div>

      <div className='flex flex-col gap-36 mt-10'>
      {report.charts.map((chart: any) => (
        <div
          className={`section-margin flex items-center justify-center py-4 rounded-xl 
          ${
            chart.type === "Costos y gastos" ? "bg-[rgba(255,0,0,0.07046568627450978)]" :
            chart.type === "Ventas" ? "bg-[rgba(0,255,0,0.1)]" :
            chart.type === "Utilidad neta y margen neto" ? "bg-[rgba(163,98,238,0.1)]" :
            chart.type === "Márgenes" ? "bg-[rgba(219,103,255,0.1)]" :
            chart.type === "Gastos desglosados" ? "bg-[rgba(248,222,103,0.1)]" :
            chart.type === "Cascada P&L" ? "bg-[rgba(166,166,166,0.1)]" :
            "bg-gray-100"
          }`}
          id={chart.type} 
          key={chart.id}
        >
          <div className="w-[50%]">
            <div className="flex items-center gap-2">
              <p className="my-4 text-xl font-semibold xl:text-2xl">
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
                      producción (los que están directamente relacionado con las
                      ventas), revelando la utilidad bruta. A continuación, se
                      restan los gastos operativos (los que son indirectos) para
                      obtener la utilidad operativa. Por último se deducen los
                      gastos financieros, para llegar a la utilidad neta. Las
                      barras verdes suman y las rojas restan, dejando las grises
                      como subtotales.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ChartEmbed src={chart.graphy_url} />
          </div>
          <div className="w-[40%] translate-y-5 rounded-lg bg-white px-4 py-3">
            {chart.insights && (
              <div>
                <h3 className="mb-5 text-center text-2xl font-medium">
                  Resumen
                </h3>
                <p className="text-xl">
                  {renderTextFromDatabase(chart.insights)}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      </div>

      <div className="flex flex-col gap-28">
        <div id="metas-financieras" className="section-margin">
          <p className="mb-4 text-2xl font-semibold">Metas financieras</p>
          <div className="rounded-xl bg-gray-100 p-3">
            {renderTextFromDatabase(report.goals)}
          </div>
        </div>

        <div id="conclusiones" className="section-margin">
          <p className="mb-4 text-2xl font-semibold">Conclusiones</p>
          <div className="rounded-xl bg-gray-100 p-3">
            {renderTextFromDatabase(report.analysis)}
          </div>
        </div>

        <div id="recomendaciones" className="section-margin">
          <p className="mb-4 text-2xl font-semibold">Recomendaciones</p>
          <div className="rounded-xl bg-gray-100 p-3">
            {report.recomendations.map((data: any) => (
              <div>{renderTextFromDatabase(`${data.content}`)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}