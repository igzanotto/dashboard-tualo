
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
import BannerSection from '@/components/bannerSection';
import Logo from '@/components/icons/Logo';
import BannerReferidos from '@/components/bannerReferidos';
import reporte from '../../../../../components/images/header-reporte.png'
import Image from 'next/image';
import { translateChartType } from '@/lib/utils';
import Link from 'next/link';


const libreBaskerville = Libre_Baskerville({subsets:["latin"], weight:["400", "700"]})


const chartOrder = [
  'waterfall',
  'sales',
  'costs_and_expenses',
  'net_profit_and_margins',
  'margins',
  'detailed_expenses',
  
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
  console.log(report.id);
  
  
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
        const secondPart = rest.join(':').trim();

        return (
          <span key={lineIndex}>
            {applyStyles(firstPart)}{secondPart && `: ${secondPart}`} <br />
          </span>
        );
      });

      return (
        <span key={index}>
          {formattedLines}
        </span>
      );
    });

    return (
      <>
        {formattedParagraphs}
      </>
    );
  };
  

  return (
    <div className="flex flex-col gap-3 xl:px-2">
      <Image width={3000} height={3000} src={reporte} alt='image' className='w-full'/>
      
      
      <h1 className={`text-2xl font-semibold xl:w-[80%] mx-auto max-xl:w-[90%] text-[#003E52] mt-16 ${libreBaskerville.className}`}>
        Reporte de <span className="capitalize">{report.month} {report.created_at.slice(0, 4)}</span>
      </h1>

      <div>
        <p className={`mb-4 text-xl font-semibold xl:text-4xl xl:w-[80%] mx-auto max-xl:w-[90%] text-[#003E52] ${libreBaskerville.className}`}>
          {report.business.name}
        </p>
      </div>

      <div className='xl:w-[80%] mx-auto max-xl:w-[90%] mb-24 max-md:mb-14'>
        <div id='resumen' className="section-margin flex flex-col gap-10 mb-20 mt-10" key={'resumen'}>
          <div>
            <p className="mb-4 text-2xl font-semibold text-[#003E52]">Perfil de mi empresa</p>
            <div className="rounded-xl bg-[#003E52]/10 p-3 text-[#003E52]">
              {renderTextFromDatabase(report.business_resume)}
            </div>
          </div>
          <div>
            <p className="mb-4 text-2xl font-semibold text-[#003E52]">Metas financieras</p>
            <div className="rounded-xl bg-[#003E52]/10 p-3 text-[#003E52]">
              {renderTextFromDatabase(report.goals)}
            </div>
          </div>
        </div>
      </div>


      <BannerSection text='Resumen financiero'/>
      <div className='flex flex-col gap-36 mt-10'>

      {orderedCharts.map((chart: any) => (
        <div
          className={`section-margin flex  justify-between gap-10 px-3 2xl:px-7 py-4 rounded-xl max-xl:flex-col bg-[#003E52]/10`}
          id={chart.type} 
          key={chart.id}
        >
          <div className="2xl:w-[50%] xl:w-[50%] max-xl:w-full">
            <div className="flex items-center gap-2">
              <p className="my-4 text-xl font-semibold xl:text-2xl text-[#003E52]">
                {' '}
                Gráfica de <span>{translateChartType(chart.type)}</span>
              </p>
             {chart.type === "waterfall" ? 
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
             chart.type === "sales" ? 
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
           chart.type === "costs_and_expenses" ?
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
            chart.type === "net_profit_and_margins" ? 
            
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
           chart.type === "margins" ? 
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
            chart.type === "detailed_expenses" ?
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
          <div className="my-[110px] rounded-lg bg-white px-3 py-5 xl:w-[50%] 2xl:w-[40%]">
          
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
        <div id="conclusiones" className='xl:w-[80%] mx-auto  section-margin' key={"conclusiones"}>
        <BannerSection text='Conclusiones financieras'/>
          {/* <p className="mb-4 text-2xl font-semibold text-[#003E52]">Conclusiones</p> */}
          <div className="rounded-xl bg-[#003E52]/10 p-3 text-[#003E52] mt-16 max-md:w-[96%] max-md:mx-auto">
            {renderTextFromDatabase(report.analysis)}
          </div>
        </div>

        <div id="recomendaciones" className="xl:w-[80%] mx-auto  section-margin" key={"recomendaciones"}>
          <BannerSection text='Recomendaciones personalizadas'/>
          {/* <p className="mb-4 text-2xl font-semibold text-[#003E52]">Recomendaciones</p> */}
          <div className="p-3 flex flex-col gap-10 mt-16">
          {report.recomendations.map((data: any, index:number) => (
            <div key={index} className='bg-[#003E52]/10 flex flex-col p-4 rounded-xl text-[#003E52]'>
              {renderTextFromDatabase(`${data.content}`)}
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-6 max-lg:w-[98%] xl:w-[80%] mx-auto max-lg:text-center'>
        <p className='text-[#00AE8D] font-medium'>Este análisis fue generado con asistencia de inteligencia artificial y debe ser revisado cuidadosamente antes de tomar decisiones basadas en él.</p>
        <p className='text-[#00AE8D] font-medium'>Los ingresos y gastos presentados provienen directamente de los estados de cuenta y pueden no reflejar el monto completo o los impuestos relacionados, como el IVA, de manera estrictamente correcta si estos no fueron detallados explícitamente. El presente debe de tomarse como un reporte financiero y no uno que puede usarse para la contabilidad de la empresa. Se utilizó toda la información proporcionada, en caso de haber omitido algo los reportes pueden tener resultados engañosos o erróneos.</p>
      </div>
          <div className='mt-10'>
            <BannerReferidos text='¡Te descontamos $100 por cada negocio que invites!'/>
          </div>
        <div className='p-8 w-full rounded-3xl max-md:rounded-2xl bg-[#003E52] flex items-center justify-between mt-10 max-md:p-4 max-md:w-[98%] max-md:mx-auto'>
          <p className='text-[#003E52]'>.</p>
          <p className={`${libreBaskerville.className} text-white text-3xl text-center max-md:text-xl`}>Nosotros a tus finanzas y tú a lo tuyo.</p>
          <div className='max-md:hidden'>
            <Logo/>
          </div>
        </div>
          <p className='text-[#0065A1] text-center pb-2 font-medium'>tualo.mx</p>
    </div>
  )
}