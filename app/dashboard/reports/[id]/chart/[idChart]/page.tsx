import ChartEmbed from '@/components/charts/ChartEmbed';
import { fetchChartById } from '@/lib/data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from 'lucide-react';

export default async function ChartPage({
  params,
}: {
  params: { idChart: string };
}) {
  const { idChart } = params;
  const chart = await fetchChartById(idChart);

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
    <div>
      <div className='flex items-center justify-center'>
        <div className='w-[50%]'>
      <div className='flex items-center gap-2'>
              <p className="my-4 text-xl font-semibold xl:text-2xl">
                {' '}
                Gráfica de <span>{chart.type}</span>
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
          <ChartEmbed src={chart.graphy_url} />
        </div>
        <div className='w-[40%] bg-gray-100 rounded-lg py-3 px-4 translate-y-5'>
          {chart.insights && (
            <div>
              <h3 className='text-2xl font-medium mb-5 text-center'>Resumen</h3>
              <p className='text-xl'>{renderTextFromDatabase(chart.insights)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
