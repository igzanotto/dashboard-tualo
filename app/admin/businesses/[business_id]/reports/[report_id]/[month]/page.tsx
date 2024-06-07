import ChartEmbed from '@/components/charts/ChartEmbed';
import ChartIcon from '@/components/icons/ChartIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  createChartEmbed,
  editInsights,
  updateReport,
  updateReportRecommendations,
} from '@/lib/actions';
import {
  fetchBusinessById,
  fetchReportById,
  fetchReportsByBusiness,
} from '@/lib/data';
import { InfoIcon } from 'lucide-react';
import { Libre_Baskerville } from 'next/font/google';
import Link from 'next/link';
import reporte from '../../../../../../../components/images/header-reporte.png';
import Image from 'next/image';
import BannerSection from '@/components/bannerSection';
import { translateChartType } from '@/lib/utils';
import ChartNavigation from '@/components/chart-navigation';
import MonthButtonAdmin from '@/components/admin/monthButton';
import MonthButtonsAdmin from '@/components/admin/monthButton';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const chartOrder = [
  'waterfall',
  'sales',
  'costs_and_expenses',
  'net_profit_and_margins',
  'margins',
  'detailed_expenses',
];

const reorderCharts = (charts: any) => {
  return charts.sort((a: any, b: any) => {
    return chartOrder.indexOf(a.type) - chartOrder.indexOf(b.type);
  });
};

export default async function ReportPage({
  params,
}: {
  params: { report_id: string; id: string; business_id: string; month: string };
}) {
  const report = await fetchReportById(params.report_id);
  console.log(report);

  const { business_id } = params;

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
          <span key={lineIndex}>
            {applyStyles(firstPart)}
            {secondPart && `: ${secondPart}`} <br />
          </span>
        );
      });

      return <span key={index}>{formattedLines}</span>;
    });

    return <>{formattedParagraphs}</>;
  };

  return (
    <div className="flex flex-col">
      <nav className="sticky top-0 z-50 mb-10 flex items-center rounded-b-xl bg-white p-2 shadow-lg md:gap-10 md:p-4">
        <MonthButtonsAdmin business_id={business_id} />
        <div className="mx-auto justify-center self-center">
          <ChartNavigation />
        </div>
      </nav>
      <div className="flex flex-col gap-3 xl:px-2">
        <Image
          width={3000}
          height={3000}
          src={reporte}
          alt="image"
          className="w-full"
        />

        <h1
          className={`mx-auto mt-16 text-2xl font-semibold text-[#003E52] max-xl:w-[90%] xl:w-[80%] ${libreBaskerville.className}`}
        >
          Reporte de{' '}
          <span className="capitalize">
            {report.month} {report.created_at.slice(0, 4)}
          </span>
        </h1>

        <div>
          <p
            className={`mx-auto mb-4 text-xl font-semibold text-[#003E52] max-xl:w-[90%] xl:w-[80%] xl:text-4xl ${libreBaskerville.className}`}
          >
            {report.business.name}
          </p>
        </div>

        <div className="mx-auto max-xl:w-[90%] xl:w-[80%]">
          {!report.business_resume ? (
            <div id="resumen" key={'resumen'}>
              <form
                action={updateReport}
                className="mt-10 flex flex-col gap-20"
              >
                <input
                  type="hidden"
                  name="report_id"
                  value={params.report_id}
                />
                <div>
                  {!report.business_resume ? (
                    <p className="mb-4 text-2xl font-semibold text-[#003E52]">
                      Resumen de las operaciones de{' '}
                      <span className="capitalize">{report.month}</span>
                    </p>
                  ) : (
                    <p className="mb-4 text-2xl font-semibold text-[#003E52]">
                      Perfil de mi empresa
                    </p>
                  )}
                  <textarea
                    name="operations_resume"
                    defaultValue={report.operations_resume}
                    className="h-[500px] w-full rounded-lg border-2 border-zinc-300 p-4 text-[#003E52] shadow-xl"
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full rounded-lg bg-[#003E52] p-2 text-white"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div id="resumen" key={'resumen'}>
              <form
                action={updateReport}
                className="mt-10 flex flex-col gap-20"
              >
                <input
                  type="hidden"
                  name="report_id"
                  value={params.report_id}
                />
                <div>
                  <p className="mb-4 text-2xl font-semibold text-[#003E52]">
                    Perfil de la empresa
                  </p>
                  <textarea
                    name="business_resume"
                    defaultValue={report.business_resume}
                    className="h-[500px] w-full rounded-lg border-2 border-zinc-300 p-4 text-[#003E52] shadow-xl"
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full rounded-lg bg-[#003E52] p-2 text-white"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="mt-12 xl:mt-24">
            <p className="mb-4 text-2xl font-semibold text-[#003E52]">
              Metas financieras
            </p>
            <form action={updateReport}>
              <input type="hidden" name="report_id" value={params.report_id} />
              <textarea
                name="goals"
                defaultValue={report.goals}
                className="h-[300px] w-full rounded-lg border-2 border-zinc-300 p-4 text-[#003E52] shadow-xl"
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-[#003E52] p-2 text-white"
              >
                Guardar cambios
              </button>
            </form>
          </div>

          <div className="mb-16 mt-28">
            <BannerSection text="Resumen financiero" />
          </div>
          <div className="flex flex-col gap-16 xl:gap-36">
            {chartOrder.map((type: any) => {
              const chart = orderedCharts.find(
                (chart: any) => chart.type === type,
              );
              return (
                <div
                  className={`section-margin flex items-center justify-between gap-10 rounded-xl bg-[#252525]/10 px-3 py-4 max-xl:flex-col`}
                  id={type}
                  key={type}
                >
                  <div className="">
                    <div className="flex items-center gap-2">
                      <p className="my-4 text-xl font-semibold text-[#003E52] xl:text-2xl">
                        {' '}
                        Gráfica de{' '}
                        <span className="capitalize text-[#003E52]">
                          {translateChartType(type)}
                        </span>
                      </p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon width={20} height={20} />
                          </TooltipTrigger>
                          <TooltipContent className="w-[450px]">
                            <p>
                              Esta gráfica se lee de izquierda a derecha: inicia
                              con ingresos totales, luego se deducen los costos
                              de producción (los que están directamente
                              relacionado con las ventas), revelando la utilidad
                              bruta. A continuación, se restan los gastos
                              operativos (los que son indirectos) para obtener
                              la utilidad operativa. Por último se deducen los
                              gastos financieros, para llegar a la utilidad
                              neta. Las barras verdes suman y las rojas restan,
                              dejando las grises como subtotales.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {chart ? (
                      chart.graphy_url ? (
                        <div className="flex w-full flex-col gap-10">
                          <div>
                            <ChartEmbed src={chart.graphy_url} />
                          </div>
                          <div className='w-full bg-teal-600'>
                            {chart.insights && (
                              <div >
                                <form action={editInsights}>
                                <h3 className="mb-5 text-center text-2xl font-medium text-[#003E52]">
                                  Análisis
                                </h3>
                                <input type="hidden" name="id" value={chart.id} />
                                <textarea 
                                  defaultValue={chart.insights} 
                                  name='insights' 
                                  className="w-full rounded-lg border-2 border-zinc-300 p-4 text-[#003E52] shadow-xl"
                                />
                                  {/* {renderTextFromDatabase(chart.insights)} */}
                                <button className="w-full rounded-xl bg-[#003E52] p-3 font-medium text-white" type='submit'>Guardar</button>
                              </form>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className='w-full bg-teal-600'>
                          {chart.insights && (
                            <div className='bg-blue-500'>
                              <form action={editInsights}>
                                <h3 className="mb-5 text-center text-2xl font-medium text-[#003E52]">
                                  Análisis
                                </h3>
                                <input type="hidden" name="id" value={chart.id} />
                                <textarea 
                                  defaultValue={chart.insights} 
                                  name='insights' 
                                  className="w-full rounded-lg border-2 border-zinc-300 p-4 text-[#003E52] shadow-xl"
                                />
                                  {/* {renderTextFromDatabase(chart.insights)} */}
                                <button className="w-full rounded-xl bg-[#003E52] p-3 font-medium text-white" type='submit'>Guardar</button>
                              </form>
                            </div>
                          )}
                          <h1 className="text-black">
                            Crear Gráfico de {translateChartType(type)}
                          </h1>
                          <form
                            action={createChartEmbed}
                            className="mt-10 flex flex-col gap-4"
                          >
                            <input
                              type="hidden"
                              name="report_id"
                              value={report.id}
                            />
                            <input
                              type="hidden"
                              name="business_id"
                              value={report.business_id}
                            />
                            <input type="hidden" name="type" value={type} />
                            <input
                              type="text"
                              name="graphy_url"
                              placeholder="Url del gráfico"
                              className="w-full rounded-xl p-2"
                            />
                            <button
                              type="submit"
                              className="w-full rounded-xl bg-[#003E52] p-3 font-medium text-white"
                            >
                              Crear gráfico
                            </button>
                          </form>
                        </div>
                      )
                    ) : (
                      <p>No hay gráficos creados.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            id="conclusiones"
            className="section-margin my-28 flex flex-col gap-4"
            key={'conclusiones'}
          >
            <BannerSection text="Conclusiones financieras" />
            <form action={updateReport}>
              <input type="hidden" name="report_id" value={params.report_id} />
              <textarea
                name="analysis"
                defaultValue={report.analysis}
                className="h-[500px] w-full rounded-lg border-2 border-zinc-300 p-4 text-[#003E52] shadow-xl"
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-[#003E52] p-2 text-white"
              >
                Guardar cambios
              </button>
            </form>
          </div>

          <BannerSection text="Recomendaciones personalizadas" />
          <div
            id="recomendaciones"
            className="section-margin mt-16 flex flex-col gap-20 xl:gap-24"
            key={'recomendaciones'}
          >
            {report.recomendations.map((data: any) => (
              <form
                key={data.id}
                action={updateReportRecommendations}
                className="flex flex-col gap-4"
              >
                <input
                  type="hidden"
                  name="report_id"
                  value={params.report_id}
                />
                <textarea
                  name="content"
                  defaultValue={data.content}
                  className="h-[500px] w-full rounded-lg border-2 border-zinc-300 p-4 text-[#003E52] shadow-xl"
                />
                <button
                  type="submit"
                  className="mt-4 rounded-lg bg-[#003E52] p-2 text-white"
                >
                  Guardar cambios
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}