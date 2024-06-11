import BannerSection from '@/components/bannerSection';
import { fetchReportById } from '@/lib/data';
import { Libre_Baskerville } from 'next/font/google';
import Image from 'next/image';
import reporte from '../../../../../../../../components/images/header-reporte.png';
import { InfoIcon } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ChartEmbed from '@/components/charts/ChartEmbed';
import Logo from '@/components/icons/Logo';
import { translateChartType } from '@/lib/utils';
import MonthButtonsAdmin from '@/components/admin/monthButton';
import ChartNavigation from '@/components/chart-navigation';
import WaterfallTooltip from '@/components/tooltips/waterfall';
import SalesTooltip from '@/components/tooltips/sales';
import CostsExpensesTooltip from '@/components/tooltips/costs-expenses';
import ProfitMarginsTooltip from '@/components/tooltips/profit-margins';
import MarginsTooltip from '@/components/tooltips/margins';
import ExpensesTooltip from '@/components/tooltips/detailed-expenses';
import { uploadImageChart } from '@/lib/actions';

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
  'actual_vs_average',
  'actual_vs_average_2',
];

const reorderCharts = (charts: any) => {
  return charts.sort((a: any, b: any) => {
    return chartOrder.indexOf(a.type) - chartOrder.indexOf(b.type);
  });
};

export default async function PreviewPage({
  params,
}: {
  params: { report_id: string; id: string; business_id: string; month: string };
}) {
  const report = await fetchReportById(params.report_id);
  console.log(report.charts);

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
        const secondPart = rest.join(':').trim();

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
    <div className="flex flex-col gap-3 xl:px-2">
      <nav className="sticky top-0 z-50 mb-10 flex items-center rounded-b-xl bg-white p-2 shadow-lg md:gap-10 md:p-4">
        <MonthButtonsAdmin business_id={business_id} />
        <div className="mx-auto justify-center self-center">
          <ChartNavigation />
        </div>
      </nav>

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

      <div className="mx-auto mb-24 max-xl:w-[90%] max-md:mb-14 xl:w-[80%]">
        <div
          id="resumen"
          className="section-margin mb-20 mt-10 flex flex-col gap-10"
          key={'resumen'}
        >
          <div>
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
            </div>
            <div className="rounded-xl bg-[#003E52]/10 p-3 text-[#003E52]">
              {!report.business_resume ? (
                <div>{renderTextFromDatabase(report.operations_resume)}</div>
              ) : (
                <div>{renderTextFromDatabase(report.business_resume)}</div>
              )}
            </div>
          </div>
          <div>
            <p className="mb-4 text-2xl font-semibold text-[#003E52]">
              Metas financieras
            </p>
            <div className="rounded-xl bg-[#003E52]/10 p-3 text-[#003E52]">
              {renderTextFromDatabase(report.goals)}
            </div>
          </div>
        </div>
      </div>

      <BannerSection text="Resumen financiero" />
      <div className="mt-10 flex flex-col gap-36">
        {orderedCharts.map((chart: any) => (
          <div className={`section-margin flex bg-[#252525]/10 p-3 rounded-xl gap-10 max-xl:flex-col`} id={chart.type} key={chart.id}>
            <div className='flex flex-col w-full'>
              <div className='flex items-center gap-2'>
                <p className="my-4 text-xl font-semibold text-[#003E52] xl:text-2xl">
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

              <img
                src={chart.graphy_url}
                alt="image"
                width={1000}
                height={1000}
                className="mx-auto my-5 h-[100%] rounded-xl xl:w-[1000px]"
              />
              <p>Actualizar imagen</p>
              <form
                action={uploadImageChart}
                className="mt-2 flex flex-col gap-4 rounded-xl bg-[#252525]/10 p-4"
              >
                <input
                  type="hidden"
                  name="report_id"
                  value={params.report_id}
                />
                <input type="hidden" name="id" value={chart.id} />
                <input
                  type="hidden"
                  name="business_id"
                  value={params.business_id}
                />
                <input name="image" type="file" className="text-[#003E52]" />
                <button
                  className="rounded-lg bg-[#003E52] p-2 text-white"
                  type="submit"
                >
                  Guardar imagen
                </button>
              </form>
            </div>

            <div className='flex mx-auto mt-[50px] w-[80%]'>
              {chart.insights && (
                <div>
                  <h3 className="mb-5 text-center text-2xl font-medium text-[#003E52]">
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

      <div className="my-28 flex flex-col gap-28">
        <div className="mx-auto xl:w-[80%]" key={'conclusiones'}>
          <BannerSection
            text="Conclusiones financieras"
            id="conclusiones"
            key={'conclusiones'}
          />
          {/* <p className="mb-4 text-2xl font-semibold text-[#003E52]">Conclusiones</p> */}
          <div className="mt-16 rounded-xl bg-[#003E52]/10 p-3 text-[#003E52] max-md:mx-auto max-md:w-[96%]">
            {renderTextFromDatabase(report.analysis)}
          </div>
        </div>

        <div className="section-margin mx-auto  xl:w-[80%]">
          <BannerSection
            text="Recomendaciones personalizadas"
            id="recomendaciones"
            key={'recomendaciones'}
          />
          {/* <p className="mb-4 text-2xl font-semibold text-[#003E52]">Recomendaciones</p> */}
          <div className="mt-16 flex flex-col gap-10 p-3">
            {report.recomendations.map((data: any, index: number) => (
              <div
                key={index}
                className="flex flex-col rounded-xl bg-[#003E52]/10 p-4 text-[#003E52]"
              >
                {renderTextFromDatabase(`${data.content}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-6 max-lg:w-[98%] max-lg:text-center xl:w-[80%]">
        <p className="font-medium text-[#00AE8D]">
          Este análisis fue generado con asistencia de inteligencia artificial y
          debe ser revisado cuidadosamente antes de tomar decisiones basadas en
          él.
        </p>
        <p className="font-medium text-[#00AE8D]">
          Los ingresos y gastos presentados provienen directamente de los
          estados de cuenta y pueden no reflejar el monto completo o los
          impuestos relacionados, como el IVA, de manera estrictamente correcta
          si estos no fueron detallados explícitamente. El presente debe de
          tomarse como un reporte financiero y no uno que puede usarse para la
          contabilidad de la empresa. Se utilizó toda la información
          proporcionada, en caso de haber omitido algo los reportes pueden tener
          resultados engañosos o erróneos.
        </p>
      </div>
      {/* <div className='mt-10'>
            <BannerReferidos text='¡Te descontamos $100 por cada negocio que invites!'/>
          </div> */}
      <div className="mt-10 flex w-full items-center justify-between rounded-3xl bg-[#003E52] p-8 max-md:mx-auto max-md:w-[98%] max-md:rounded-2xl max-md:p-4">
        <p className="text-[#003E52]">.</p>
        <p
          className={`${libreBaskerville.className} text-center text-3xl text-white max-md:text-xl`}
        >
          Nosotros a tus finanzas y tú a lo tuyo.
        </p>
        <div className="max-md:hidden">
          <Logo />
        </div>
      </div>
      <p className="pb-2 text-center font-medium text-[#0065A1]">tualo.mx</p>
    </div>
  );
}
