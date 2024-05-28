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

      <div className='flex items-center gap-4 justify-end sticky top-12 p-3 w-min self-end' id='secondNavbar'>
        <Link href={`/dashboard/reports/${report.id}/#conclusiones`} className='bg-gray-200 text-black p-2 rounded-lg font-medium flex items-center gap-1'>
          <File width={20} height={20}/>
          Conclusiones
        </Link>

        <Link href={`/dashboard/reports/${report.id}/#recomendaciones`} className='bg-gray-200 text-black p-2 rounded-lg font-medium flex items-center gap-1'>
          <SuggestIcon/>
          Recomendaciones
        </Link>

        <Link href={"/#anexo"} className='bg-gray-200 text-black p-2 rounded-lg font-medium flex items-center gap-1'>
          <Attachment/>
          Anexo
        </Link>
      </div>

      <h1 className={`text-2xl font-semibold`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div>
        <p className="mb-4 text-xl font-semibold xl:text-4xl">
          {report.business.name}
        </p>
      </div>

      <div className='flex flex-col gap-28'>
      <div id='metas-financieras'>
        <p className='text-2xl font-semibold mb-4'>Metas financieras</p>
        <div className='p-3 rounded-xl bg-gray-100'>
          {renderTextFromDatabase(report.goals)}
        </div>
      </div>

      <div id='conclusiones'>
        <p className='text-2xl font-semibold mb-4'>Conclusiones</p>
        <div className='p-3 rounded-xl bg-gray-100'>
          {renderTextFromDatabase(report.analysis)}
        </div>
      </div>

      <div id='recomendaciones'>
        <p className='text-2xl font-semibold mb-4'>Recomendaciones</p>
        <div className='p-3 rounded-xl bg-gray-100'>
        {report.recomendations.map((data: any) => (
              <div>{renderTextFromDatabase(`${data.content}`)}</div>
            ))}
        </div>
      </div>
      </div>
    </div>
  );
}