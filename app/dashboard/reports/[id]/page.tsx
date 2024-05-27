import ChartEmbed from '@/components/charts/ChartEmbed';
import ModalDashboard from '@/components/modal/Modal';
import { fetchReportById } from '@/lib/data';
import { FolderIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { GoalIcon, InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Link from 'next/link';

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
      <div className="flex items-center gap-5 max-xl:flex-wrap xl:gap-6 2xl:gap-8">
        <div className="flex w-[400px] flex-col gap-3 rounded-xl bg-emerald-500 p-3 shadow-2xl max-xl:w-full xl:h-[200px] 2xl:h-[180px]">
          <div className="flex items-center gap-2 text-2xl font-medium text-white">
            <FolderIcon width={30} height={30} />
            <p>Conclusiones</p>
          </div>
          <p className="w-full font-medium text-zinc-100">
            En tu resumen verás una descripción detallada de tu negocio donde se
            abordan diversos aspectos clave.
          </p>
          <ModalDashboard
            name={report.business.name}
            resume={renderTextFromDatabase(report.business_resume)}
          />
        </div>
        <div className="flex w-[400px] flex-col gap-3 rounded-xl bg-yellow-500 p-3 shadow-2xl max-xl:w-full xl:h-[200px] 2xl:h-[180px]">
          <div className="flex items-center gap-2 text-2xl font-medium text-white">
            <LightBulbIcon width={30} height={30} />
            <p>Recomendaciones</p>
          </div>
          <p className="font-medium text-zinc-100">
            En las recomendaciones verás estrategias clave para mejorar el
            rendimiento y la eficiencia de tu negocio.
          </p>
          <ModalDashboard
            name={report.business.name}
            resume={report.recomendations.map((data: any) => (
              <div>{renderTextFromDatabase(`${data.content}`)}</div>
            ))}
          />
        </div>

        <div className="flex w-[400px] flex-col gap-3 rounded-xl  bg-[#5a36fa] p-3 shadow-2xl max-xl:w-full xl:h-[200px] 2xl:h-[180px]">
          <div className="flex items-center gap-2 text-2xl font-medium text-white">
            <GoalIcon width={30} height={30} />
            <p>Anexos</p>
          </div>
          <p className="font-medium text-zinc-100">
            Estas metas son fundamentales para la salud financiera y el
            crecimiento sostenible del negocio
          </p>
          <ModalDashboard
            name={report.business.name}
            resume={renderTextFromDatabase(report.goals)}
          />
        </div>
      </div>

      <div className="my-14">
        <p className="my-4 text-xl font-semibold xl:text-4xl">
          Resumen financiero
        </p>

        <div className="my-10 flex flex-col gap-8">
          {report.charts.map((data: any) => (
            <div
              key={data.id}
              className="w-full rounded-xl bg-slate-50 p-3 shadow-lg"
            >
              <div className='flex items-center gap-2'>
              <p className="my-4 text-xl font-semibold xl:text-2xl">
                {' '}
                Gráfica de <span>{data.type}</span>
              </p>
              <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon width={20} height={20} />
                      </TooltipTrigger>
                      <TooltipContent className='w-[400px]'>
                        <p>
                          Esta gráfica se lee de izquierda a derecha: inicia con
                          ingresos totales, luego se deducen los costos de producción
                          (los que están directamente relacionado con las ventas),
                          revelando la utilidad bruta. A continuación, se restan los
                          gastos operativos (los que son indirectos) para obtener la
                          utilidad operativa. Por último se deducen los gastos
                          financieros, para llegar a la utilidad neta. Las barras verdes
                          suman y las rojas restan, dejando las grises como subtotales.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </div>
              <div className="gap-8 lg:flex">
                <div className=" lg:w-[60%]">
                  <ChartEmbed src={data.graphy_url} />
                </div>
                <div className="mt-4 lg:w-[40%]">
                  {renderTextFromDatabase(`${data.insights}`)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}