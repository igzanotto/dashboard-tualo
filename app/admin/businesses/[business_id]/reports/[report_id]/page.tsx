import ChartIcon from '@/components/icons/ChartIcon';
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
        <div>
          <p className="mb-4 text-4xl">Resumen</p>
          {report.business_resume ? (
            <p>{report.business_resume}</p>
          ) : (
            <p>Vacío</p>
          )}
        </div>
        <div>
          <p className="mb-4 text-4xl">Objetivos</p>
          {report.goals ? <p>{report.goals}</p> : <p>Vacío</p>}
        </div>
        <div>
          <p className="mb-4 text-4xl">Análisis</p>
          {report.analysis ? <p>{report.analysis}</p> : <p>Vacío</p>}
        </div>
      </div>
    </div>
  );
}
