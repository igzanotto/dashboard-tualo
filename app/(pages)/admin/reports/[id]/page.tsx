import { fetchReportById,  } from "@/app/lib/data";
import { Span } from "next/dist/trace";

export default async function ReportPage({ params }: { params: { id: string } }){
    const id = params.id;

    const report = await fetchReportById(id)

    return (
      <div className="flex flex-col gap-3">
        <h1 className={`text-2xl`}>
          Reporte de <span className="capitalize">{report.month}</span>
        </h1>

        <div className="mt-10 flex flex-col gap-8">
          <div>
            <p className="mb-4 text-4xl">Resumen</p>
            {report.buisness_resume ? (
              <p>{report.buisness_resume}</p>
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
          <div>
            <p className="mb-4 text-4xl">Negocio</p>
            
          </div>
        </div>
      </div>
    );
}