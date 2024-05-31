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
import '../../../../globals.css'


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
  params: { id: string, month:string };
}) {
  const id = params.id;
  const report = await fetchReportById(id);
  const orderedCharts = reorderCharts(report.charts);

  
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
  

  return (
    <div className="flex flex-col gap-3 xl:px-2">

      <h1 className={`text-2xl font-semibold xl:w-[80%] mx-auto max-xl:w-[90%] text-zinc-700`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div>
        <p className="mb-4 text-xl font-semibold xl:text-4xl xl:w-[80%] mx-auto max-xl:w-[90%] text-zinc-700">
          {report.business.name}
        </p>
      </div>

      <div className='xl:w-[80%] mx-auto max-xl:w-[90%]'>
        <div id='resumen' className="section-margin flex flex-col gap-10 my-20" key={'resumen'}>
          <div>
            <p className="mb-4 text-2xl font-semibold text-zinc-700">Resumen</p>
            <div className="rounded-xl bg-gray-100 p-3">
              {renderTextFromDatabase(report.business_resume)}
            </div>
          </div>
          <div>
            <p className="mb-4 text-2xl font-semibold text-zinc-700">Metas financieras</p>
            <div className="rounded-xl bg-gray-100 p-3">
              {renderTextFromDatabase(report.goals)}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-36 mt-10'>
      {orderedCharts.map((chart: any) => (
        <div
          className={`section-margin flex items-center justify-between gap-10 px-3 2xl:px-7 py-4 rounded-xl max-xl:flex-col 
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
          <div className="2xl:w-[50%] xl:w-[50%] max-xl:w-full">
            <div className="flex items-center gap-2">
              <p className="my-4 text-xl font-semibold xl:text-2xl text-zinc-700">
                {' '}
                Gráfica de <span>{chart.type}</span>
              </p>
             {chart.type === "Cascada P&L" ? 
               <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger>
                   <InfoIcon width={20} height={20} />
                 </TooltipTrigger>
                 <TooltipContent className="xl:w-[500px] max-xl:w-[380px] bg-zinc-50 flex flex-col gap-4">
                   <p>
                    <span className='font-medium text-base'>Esta gráfica se lee de izquierda a derecha:</span> <br />
                      1. Primero tiene todos tus <span className='font-medium'>ventas</span> en verde. <br />
                      2. A eso se le van restando los costos y gastos en rojo. <br />
                      3. El resultado de cada resta es una <span className='font-medium'>utilidad</span> en gris. <br />
                          <div className='ml-5'>
                          a. Primero se restan los <span className='font-medium'>costos directos</span>, que son los directamente relacionados a la venta, y te queda la <span className='font-medium'>utilidad bruta</span>. <br />
                          b. Después los <span className='font-medium'>gastos indirectos</span>, no directamente relacionados pero que se necesitan para operar (como la renta, por ejemplo), y te queda la <span className='font-medium'>utilidad operativa</span>. <br />
                          c. Por último se restan los <span className='font-medium'>gastos financieros</span> (todo lo que cobra el banco o el SAT), y te queda la <span className='font-medium'>utilidad neta</span>. <br />
                          </div>

                   </p>
                    <p className='text-[#c77d48]'>Lo que está al final, en naranja, es la UTILIDAD NETA, que es lo que realmente ganó o perdió el negocio durante este periodo.</p>
                 </TooltipContent>
               </Tooltip>
             </TooltipProvider> 
             :
             chart.type === "Ventas" ? 
             <TooltipProvider>
             <Tooltip>
               <TooltipTrigger>
                 <InfoIcon width={20} height={20} />
               </TooltipTrigger>
               <TooltipContent className="w-[450px]">
                 <p>
                  En esta gráfica, cada barra verde son las ventas de cada mes del periodo analizado. 
                  La línea horizontal es el promedio de ventas del periodo, que te sirve para comparar las ventas en cada mes con el promedio general.
                 </p>
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
           :
           chart.type === "Costos y gastos" ?
            <TooltipProvider>
             <Tooltip>
               <TooltipTrigger>
                 <InfoIcon width={20} height={20} />
               </TooltipTrigger>
               <TooltipContent className="w-[450px]">
                 <p>
                  En esta gráfica hay dos conjuntos de barras rojas: 
                  1. La primera, roja claro, representa los costos directos (los que gastas para hacer lo que vendes).
                  2. La segunda es la de gastos indirectos (los que son operativos)
                  Además, cada uno tiene su propia línea de promedio para comparar en el periodo.
                 </p>
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
            :
            chart.type === "Utilidad neta" ? 
            
            <TooltipProvider>
             <Tooltip>
               <TooltipTrigger>
                 <InfoIcon width={20} height={20} />
               </TooltipTrigger>
               <TooltipContent className="w-[450px]">
                 <p>
                  En esta gráfica hay dos datos importantes: las barras moradas y la línea amarilla.
                  1. Las barras son la utilidad neta, que se mide en dinero y es lo que queda después de descontar todos los costos y gastos. 
                  2. La línea es el margen neto, que se mide en porcentaje y es lo que la utilidad neta representa de las ventas cada mes. OJO: esta línea está guiada por el eje del lado derecho.
                  Verlas juntas ayuda a entender tanto en monto como en porcentaje cuánto quedó en la empresa.
                 </p>
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
           :
           chart.type === "Márgenes" ? 
           <TooltipProvider>
           <Tooltip>
             <TooltipTrigger>
               <InfoIcon width={20} height={20} />
             </TooltipTrigger>
             <TooltipContent className="w-[450px]">
               <p>
               En esta gráfica hay tres líneas amarillas:
                  1. La primera es el margen bruto, el % que queda después de restarle costos directos a las ventas.
                  2. La segunda es el margen operativo, el % que viene al restarle los gastos indirectos a las ventas.
                  3. La tercera es el margen neto, igual que la gráfica anterior es el % que queda al final de restarle todo a las ventas.
               </p>
             </TooltipContent>
           </Tooltip>
         </TooltipProvider>
            : 
            chart.type === "Gastos desglosados" ?
            <TooltipProvider>
           <Tooltip>
             <TooltipTrigger>
               <InfoIcon width={20} height={20} />
             </TooltipTrigger>
             <TooltipContent className="w-[450px]">
               <p>
                En esta gráfica se ven muchas línea de colores. 
                Cada una representa un tipo de gasto diferente como sueldos, renta, marketing, etc. y su evolución en cada mes del periodo analizado.
               </p>
             </TooltipContent>
           </Tooltip>
         </TooltipProvider>
         :
         <p>Este grafico no tiene tooltip</p>
            }
            </div>
            <ChartEmbed src={chart.graphy_url} />
          </div>
          <div className="2xl:w-[40%] xl:w-[50%] rounded-lg bg-white px-3 py-5">
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

      <div className="flex flex-col gap-28 my-28">

        <div id="conclusiones" className="section-margin" key={"conclusiones"}>
          <p className="mb-4 text-2xl font-semibold text-zinc-700">Conclusiones</p>
          <div className="rounded-xl bg-gray-100 p-3">
            {renderTextFromDatabase(report.analysis)}
          </div>
        </div>

        <div id="recomendaciones" className="section-margin" key={"recomendaciones"}>
          <p className="mb-4 text-2xl font-semibold text-zinc-700">Recomendaciones</p>
          <div className="p-3 flex flex-col gap-10">
          {report.recomendations.map((data: any, index:number) => (
            <div key={index} className='bg-gray-50 border-2 border-gray-300 flex items-center p-4 rounded-xl'>
              {renderTextFromDatabase(`${data.content}`)}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}