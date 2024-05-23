import { fetchReportById } from '@/lib/data';

export default async function ReportPage({
  params,
}: {
  params: { report_id: string };
}) {
  
  const report = await fetchReportById(params.report_id);
  const businessName = report.business.name;

  return (
    <div className="flex flex-col gap-3">
      <h1 className={`text-2xl`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div>
        <p className="mb-4 text-4xl">{businessName}</p>
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
