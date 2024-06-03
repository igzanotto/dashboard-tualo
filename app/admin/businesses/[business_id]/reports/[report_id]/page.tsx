

import ChartEmbed from '@/components/charts/ChartEmbed';
import ChartIcon from '@/components/icons/ChartIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { createChartEmbed, updateReport, updateReportRecommendations } from '@/lib/actions';
import { fetchReportById } from '@/lib/data';
import { InfoIcon } from 'lucide-react';
import { Libre_Baskerville } from 'next/font/google';
import Link from 'next/link';
import reporte from '../../../../../../components/images/header-reporte.png'
import Image from 'next/image';
import BannerSection from '@/components/bannerSection';


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
  params: { report_id: string, id:string, business_id:string, month:string };
}) {
  
  const report = await fetchReportById(params.report_id);
  const recomendations  = report.recomendations.map((data:any) => data.content)
  
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
      <Image width={3000} height={3000} src={reporte} alt='image' className='w-full'/>
      
      
      <h1 className={`text-2xl font-semibold xl:w-[80%] mx-auto max-xl:w-[90%] text-[#003E52] mt-16 ${libreBaskerville.className}`}>
        Reporte de <span className="capitalize">{report.month} {report.created_at.slice(0, 4)}</span>
      </h1>

      <div>
        <p className={`mb-4 text-xl font-semibold xl:text-4xl xl:w-[80%] mx-auto max-xl:w-[90%] text-[#003E52] ${libreBaskerville.className}`}>
          {report.business.name}
        </p>
      </div>
     

      <div className='xl:w-[80%] mx-auto max-xl:w-[90%]'>
      <form action={updateReport} className="mt-10 flex flex-col gap-20">
        <input type="hidden" name="report_id" value={params.report_id} />
        <div>
          <p className="mb-4 text-4xl">Perfil de la empresa</p>
          <textarea
            name="business_resume"
            defaultValue={report.business_resume}
            className="w-full h-[500px] border-2 border-zinc-300 shadow-xl p-4 rounded-lg"
          />
          <button type="submit" className="mt-4 bg-[#003E52] text-white p-2 rounded-lg w-full">
            Guardar cambios
          </button>
        </div>
        <div>
          <p className="mb-4 text-4xl">Metas financieras</p>
          <textarea
            name="goals"
            defaultValue={report.goals}
            className="w-full h-[300px] border-2 border-zinc-300 shadow-xl p-4 rounded-lg"
          />
          <button type="submit" className="mt-4 bg-[#003E52] text-white p-2 rounded-lg w-full">
            Guardar cambios
          </button>
        </div>

      {/* <div className='flex flex-col gap-36 mt-10'>
        <BannerSection text='Resumen financiero'/>
      </div> */}

        <div id="conclusiones" className='section-margin flex flex-col gap-4 mb-24' key={"conclusiones"}>
        <BannerSection text='Conclusiones financieras'/>
          <textarea
            name="analysis"
            defaultValue={report.analysis}
            className="w-full h-[500px] border-2 border-zinc-300 shadow-xl p-4 rounded-lg"
          />
          <button type="submit" className="mt-4 bg-[#003E52] text-white p-2 rounded-lg">
            Guardar cambios
          </button>
        </div>

      </form>
      <form action={updateReportRecommendations}>
        <input type="hidden" name="report_id" value={params.report_id} />

        <div id="recomendaciones" className="section-margin flex flex-col gap-4" key={"recomendaciones"}>
          <BannerSection text='Recomendaciones personalizadas'/>
          <textarea
            name="content"
            defaultValue={recomendations}
            className="w-full h-[500px] border-2 border-zinc-300 shadow-xl p-4 rounded-lg"
          />
          <button type="submit" className="mt-4 bg-[#003E52] text-white p-2 rounded-lg">
            Guardar cambios
          </button>
        </div>
      </form>


      <div className='mt-28 mb-16'>
        <BannerSection text='Resumen financiero'/>
      </div>
      <div className="flex flex-col gap-36">
  {chartOrder.map((type:any) => {
    const chart = orderedCharts.find((chart: any) => chart.type === type);
    return (
      <div
        className={`section-margin flex items-center justify-between gap-10 rounded-xl px-3 py-4 max-xl:flex-col 2xl:px-7 
       bg-[#252525]/10`}
        id={type}
        key={type}
      >
        <div className="max-xl:w-full xl:w-[50%] 2xl:w-[50%]">
          <div className="flex items-center gap-2">
            <p className="my-4 text-xl font-semibold text-zinc-700 xl:text-2xl">
              {' '}
              Gráfica de <span>{type}</span>
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
          {chart ? (
            <ChartEmbed src={chart.graphy_url} />
          ) : (
            <div>
              <h1 className='text-black'>Crear Gráfico de {type}</h1>
              <form action={createChartEmbed} className='flex flex-col gap-4 xl:w-[60%] mt-10'>
                <input type="hidden" name="report_id" value={report.id} />
                <input type="hidden" name="business_id" value={report.business_id} />
                <input type="hidden" name="type" value={type} />
                <input
                  type="text"
                  name="graphy_url"
                  placeholder="Url del gráfico"
                  className="rounded-xl p-2"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#003E52] p-3 font-medium text-white"
                >
                  Crear gráfico
                </button>
              </form>
            </div>
          )}
        </div>
        {chart && chart.insights && (
          <div className="rounded-lg bg-white px-3 py-5 xl:w-[50%] 2xl:w-[40%]">
            <h3 className="mb-5 text-center text-2xl font-medium">Resumen</h3>
            <p className="text-lg">{renderTextFromDatabase(chart.insights)}</p>
          </div>
        )}
      </div>
    );
  })}
</div>

      </div>
    </div>
  );
}
