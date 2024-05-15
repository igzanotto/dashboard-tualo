import { fetchReportById, fetchReportsWithBusinesses } from "@/app/lib/data";

export default async function ReportPage({ params }: { params: { id: string } }){
    const id = params.id;
    const report = await fetchReportById(id)
    const reportsWithBusinesses = await fetchReportsWithBusinesses();

    const matchedReport = reportsWithBusinesses.find(idBusiness => idBusiness.id === report.id);
    console.log(matchedReport);
    

    const businessName = matchedReport ? matchedReport.business_id.name : 'No encontrado';
    console.log(businessName);
    return(
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
    )
}