import ChartEmbed from '@/components/charts/ChartEmbed';
import ChartIcon from '@/components/icons/ChartIcon';
import { createChartEmbed, updateReport } from '@/lib/actions';
import { fetchReportById } from '@/lib/data';
import Link from 'next/link';

export default async function ReportPage({
  params,
}: {
  params: { report_id: string, id:string };
}) {
  
  const report = await fetchReportById(params.report_id);
  const businessName = report.business.name;

  return (
    <div className="flex flex-col gap-3">
      <h1 className={`text-2xl`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div className='flex items-center justify-between'>
        <p className="mb-4 text-4xl">{businessName}</p>
        <Link href={`/admin/businesses/${params.id}/reports/${report.id}/create-chart`} className="flex w-[220px] items-center gap-2 rounded-xl bg-blue-800 p-2 text-white justify-center">
          Generar gráfico
          <ChartIcon/>
        </Link>
      </div>

      <div className="mt-10 flex flex-col gap-8">
      <form action={updateReport} className="mt-10 flex flex-col gap-20">
        <input type="hidden" name="report_id" value={params.report_id} />
        <div>
          <p className="mb-4 text-4xl">Resumen</p>
          <textarea
            name="business_resume"
            defaultValue={report.business_resume || ''}
            className="w-full h-[500px] border-2 border-zinc-300 shadow-xl p-4 rounded-lg"
          />
          <button type="submit" className="mt-4 bg-blue-800 text-white p-2 rounded-lg">
            Guardar cambios
          </button>
        </div>
        <div>
          <p className="mb-4 text-4xl">Objetivos</p>
          <textarea
            name="goals"
            defaultValue={report.goals || ''}
            className="w-full h-[300px] border-2 border-zinc-300 shadow-xl p-4 rounded-lg"
          />
          <button type="submit" className="mt-4 bg-blue-800 text-white p-2 rounded-lg">
            Guardar cambios
          </button>
        </div>
        <div>
          <p className="mb-4 text-4xl">Análisis</p>
          <textarea
            name="analysis"
            defaultValue={report.analysis || ''}
            className="w-full h-[500px] border-2 border-zinc-300 shadow-xl p-4 rounded-lg"
          />
          <button type="submit" className="mt-4 bg-blue-800 text-white p-2 rounded-lg">
            Guardar cambios
          </button>
        </div>
      </form>
      </div>
      <div className="mx-auto flex flex-col justify-center gap-6 xl:w-[70%]">
      {report.chart.graphy_url ? (
  <ChartEmbed src={report.chart.graphy_url} />
) : (
  <div>
    <h1>Crear Gráfico de {report.chart.type}</h1>
    <form action={createChartEmbed}>
      <input type="hidden" name="report_id" value={report.id} />
      <input type="hidden" name="type" value={report.chart.type} />
      <input
        type="text"
        name="graphy_url"
        placeholder="Url del gráfico"
        className="rounded-xl p-2"
      />
      <button
        type="submit"
        className="rounded-xl bg-blue-500 p-3 font-semibold text-white"
      >
        Crear gráfico
      </button>
    </form>
  </div>
)}
    </div>
    </div>
  );
}
