
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
import WaterfallTooltip from '@/components/tooltips/waterfall';
import SalesTooltip from '@/components/tooltips/sales';
import CostsExpensesTooltip from '@/components/tooltips/costs-expenses';
import ProfitMarginsTooltip from '@/components/tooltips/profit-margins';
import MarginsTooltip from '@/components/tooltips/margins';
import ExpensesTooltip from '@/components/tooltips/detailed-expenses';


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
            <div>
              {
                !report.business_resume ? (
                  <p className="mb-4 text-2xl font-semibold text-[#003E52]">Resumen de las operaciones de <span className='capitalize'>{report.month}</span></p>
                ) : 
                  <p className="mb-4 text-2xl font-semibold text-[#003E52]">Perfil de mi empresa</p>
              }
            </div>
            <div className="rounded-xl bg-[#003E52]/10 p-3 text-[#003E52]">
              {
                !report.business_resume ? (
                  <div>
                    {renderTextFromDatabase(report.operations_resume)}
                  </div>
                ) :
                (
                  <div>
                    {renderTextFromDatabase(report.business_resume)}
                  </div>
                )
              }
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
              {chart.type === 'waterfall' ? (
                  <WaterfallTooltip />
                ) : chart.type === 'sales' ? (
                  <SalesTooltip />
                ) : chart.type === 'costs_and_expenses' ? (
                  <CostsExpensesTooltip />
                ) : chart.type === 'net_profit_and_margins' ? (
                  <ProfitMarginsTooltip />
                ) : chart.type === 'margins' ? (
                  <MarginsTooltip />
                ) : chart.type === 'detailed_expenses' ? (
                  <ExpensesTooltip />
                ) : (
                  <p>Este grafico no tiene tooltip</p>
                )}
          </div>
            <img src={chart.graphy_url} alt={chart.type} width={1000} height={1000} className="mx-auto my-5 rounded-xl"/>
          </div>
          <div className="lg:my-[110px] rounded-lg bg-white px-3 py-5 xl:w-[50%] 2xl:w-[40%]">
          
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
        <div className='xl:w-[80%] mx-auto' key={"conclusiones"}>
        <BannerSection text='Conclusiones financieras' id="conclusiones" key={"conclusiones"}/>
          {/* <p className="mb-4 text-2xl font-semibold text-[#003E52]">Conclusiones</p> */}
          <div className="rounded-xl bg-[#003E52]/10 p-3 text-[#003E52] mt-16 max-md:w-[96%] max-md:mx-auto">
            {renderTextFromDatabase(report.analysis)}
          </div>
        </div>

        <div className="xl:w-[80%] mx-auto  section-margin">
          <BannerSection text='Recomendaciones personalizadas' id="recomendaciones" key={"recomendaciones"}/>
          {/* <p className="mb-4 text-2xl font-semibold text-[#003E52]">Recomendaciones</p> */}
          <div className="p-3 flex flex-col gap-10 mt-16">
          {report.recomendations.map((data: any, index:number) => (
            <div key={index} className='bg-[#003E52]/10 flex flex-col p-4 rounded-xl text-[#003E52]'>
              {renderTextFromDatabase(`${data.content}`)}
            </div>
          ))}
          </div>
        </div>

        <div className="xl:w-[80%] mx-auto  section-margin">
          <BannerSection text='Información adicional' id="informacion adicional" key={"informacion adicional"}/>
          <Image
            src={report.additional_info}
            alt="image"
            width={1000}
            height={1000}
            className="mx-auto my-5 h-[100%] rounded-xl xl:w-[1000px]"
          />
          
        </div>
      </div>
      <div className='flex flex-col gap-6 max-lg:w-[98%] xl:w-[80%] mx-auto max-lg:text-center'>
        <p className='text-[#00AE8D] font-medium'>Este análisis fue generado con asistencia de inteligencia artificial y debe ser revisado cuidadosamente antes de tomar decisiones basadas en él.</p>
        <p className='text-[#00AE8D] font-medium'>Los ingresos y gastos presentados provienen directamente de los estados de cuenta y pueden no reflejar el monto completo o los impuestos relacionados, como el IVA, de manera estrictamente correcta si estos no fueron detallados explícitamente. El presente debe de tomarse como un reporte financiero y no uno que puede usarse para la contabilidad de la empresa. Se utilizó toda la información proporcionada, en caso de haber omitido algo los reportes pueden tener resultados engañosos o erróneos.</p>
      </div>
          {/* <div className='mt-10'>
            <BannerReferidos text='¡Te descontamos $100 por cada negocio que invites!'/>
          </div> */}
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