import { fetchReportById } from '@/app/lib/data';
import MyChart from '@/components/charts/spChart';

export default async function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const report = await fetchReportById(id);
  const businessName = report.business.name;

  return (
    <div className="flex flex-col gap-3">
      <h1 className={`text-2xl`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div>
        <p className="mb-4 text-4xl">{businessName}</p>
      </div>


      {/* <div>
        <p className="mb-4 text-4xl">grafico S&P</p>
        <MyChart />
      </div> */}


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
