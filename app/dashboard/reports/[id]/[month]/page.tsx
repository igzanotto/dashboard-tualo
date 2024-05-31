import ChartEmbed from '@/components/charts/ChartEmbed';
import ModalDashboard from '@/components/modal/Modal';
import { fetchReportById } from '@/lib/data';
import { FolderIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { File, GoalIcon, InfoIcon,} from 'lucide-react';
import { Libre_Baskerville } from 'next/font/google';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import '../../../../globals.css'
// import conclusiones from '../../../../../components/images/conlcusiones-financieras.png'
// import recomendaciones from '../../../../../components/images/recomendaciones.png'
// import resumen from '../../../../../components/images/resumen-financiero.png'
// import Image from 'next/image';


const libreBaskerville = Libre_Baskerville({subsets:["latin"], weight:["400", "700"]})


const chartOrder = [
  'Ingresos y egresos',
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
      return <span className="font-bold text-[#003E52]">{text}</span>;
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

      <h1 className={`text-2xl font-semibold xl:w-[80%] mx-auto max-xl:w-[90%] text-[#003E52]`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>

      <div>
        <p className="mb-4 text-xl font-semibold xl:text-4xl xl:w-[80%] mx-auto max-xl:w-[90%] text-[#003E52]">
          {report.business.name}
        </p>
      </div>

      <div className='xl:w-[80%] mx-auto max-xl:w-[90%]'>
        <div id='resumen' className="section-margin flex flex-col gap-10 my-20" key={'resumen'}>
          <div>
            <p className="mb-4 text-2xl font-semibold text-[#003E52]">Perfil de mi empresa</p>
            <div className="rounded-xl bg-[#003E52]/10 p-3">
              {renderTextFromDatabase(report.business_resume)}
            </div>
          </div>
          <div>
            <p className="mb-4 text-2xl font-semibold text-[#003E52]">Metas financieras</p>
            <div className="rounded-xl bg-[#003E52]/10 p-3">
              {renderTextFromDatabase(report.goals)}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-36 mt-10'>
      {orderedCharts.map((chart: any) => (
        <div
          className={`section-margin flex items-end justify-between gap-10 px-3 2xl:px-7 py-4 rounded-xl max-xl:flex-col bg-[#003E52]/10`}
          id={chart.type} 
          key={chart.id}
        >
          <div className="2xl:w-[50%] xl:w-[50%] max-xl:w-full">
            <div className="flex items-center gap-2">
              <p className="my-4 text-xl font-semibold xl:text-2xl text-[#003E52]">
                {' '}
                Gráfica de <span>{chart.type}</span>
              </p>
             {chart.type === "Ingresos y egresos" ? 
               <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger>
                   <InfoIcon width={20} height={20} />
                 </TooltipTrigger>
                 <TooltipContent className="max-xl:w-[380px] bg-[#252525] text-white flex flex-col gap-4">
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
               <TooltipContent className="max-xl:w-[380px] bg-[#223741] text-white flex flex-col gap-4">
                 <p>
                  En esta gráfica, cada <span className='text-green-700 font-medium'>barra verde</span> son las ventas de cada mes del periodo analizado. <br /> 
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
               <TooltipContent className="max-xl:w-[380px] bg-[#362422] text-white flex flex-col gap-4">
                 <p>
                  <span className='font-medium text-base'>En esta gráfica hay dos conjuntos de <span className='text-red-600 text-base font-medium'>barras rojas</span>:</span> <br /> 
                  1. La primera, roja claro, representa los <span className='font-medium'>costos directos</span> (los que gastas para hacer lo que vendes). <br />
                  2. La segunda es la de <span className='font-medium'>gastos indirectos</span> (los que son operativos) <br />
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
               <TooltipContent className="max-xl:w-[380px] bg-[#2b2431] text-white flex flex-col gap-4">
                 <p>
                  <span className='font-medium text-base'>En esta gráfica hay dos datos importantes: las <span className='text-purple-600 font-medium text-base'>barras moradas</span> y la <span className='text-yellow-600 font-medium text-base'>línea amarilla</span>.</span> <br />
                  1. Las barras son la <span className='font-medium'>utilidad neta</span>, que se mide en dinero y es lo que queda después de descontar todos los costos y gastos. <br />
                  2. La línea es el <span className='font-medium'>margen neto</span>, que se mide en porcentaje y es lo que la utilidad neta representa de las ventas cada mes. OJO: esta línea está guiada por el eje del lado derecho. <br />
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
             <TooltipContent className="max-xl:w-[380px] bg-[#392e1e] text-white flex flex-col gap-4">
               <p>
               <span className='font-medium text-base'>En esta gráfica hay tres <span className='font-medium text-base text-yellow-600'>líneas amarillas</span>:</span> <br />
                  1. La primera es el <span className='font-medium'>margen bruto</span>, el % que queda después de restarle costos directos a las ventas. <br />
                  2. La segunda es el <span className='font-medium'>margen operativo</span>, el % que viene al restarle los gastos indirectos a las ventas. <br />
                  3. La tercera es el <span className='font-medium'>margen neto</span>, igual que la gráfica anterior es el % que queda al final de restarle todo a las ventas.
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
             <TooltipContent className="max-xl:w-[380px] bg-[#252525] text-white flex flex-col gap-4">
               <p>
                <span className='font-medium text-base'>En esta gráfica se ven muchas línea de colores.</span> <br /> 
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
          <div className="2xl:w-[40%] xl:w-[50%] xl:h-[500px] px-3 py-5">
            {chart.insights && (
              <div className='flex flex-col justify-between'>
                <h3 className="mb-5 text-center text-2xl font-medium">
                  Análisis
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
      {/* <Image src={conclusiones} alt='Conclusiones' width={1000} height={1000} className='w-full'/> */}
      <div className={`w-full rounded-2xl p-5 bg-gradient-to-r from-[#0065A1] to-[#00AE8D] flex items-center justify-between` }>
        <p className={`${libreBaskerville.className} text-white text-3xl`} >Conclusiones financieras</p>
      </div>
        <div id="conclusiones" className="section-margin" key={"conclusiones"}>
          <p className="mb-4 text-2xl font-semibold text-[#003E52]">Conclusiones</p>
          <div className="rounded-xl bg-[#003E52]/10 p-3 text-[#003E52]">
            {renderTextFromDatabase(report.analysis)}
          </div>
        </div>

        <div id="recomendaciones" className="section-margin" key={"recomendaciones"}>
          <p className="mb-4 text-2xl font-semibold text-[#003E52]">Recomendaciones</p>
          <div className="p-3 flex flex-col gap-10">
          {report.recomendations.map((data: any, index:number) => (
            <div key={index} className='bg-[#003E52]/10 flex items-center p-4 rounded-xl text-[#003E52]'>
              {renderTextFromDatabase(`${data.content}`)}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}