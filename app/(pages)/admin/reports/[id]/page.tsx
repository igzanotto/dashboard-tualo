import { fetchReportById } from "@/app/lib/data";

export default async function ReportPage({ params }: { params: { id: string } }){
    const id = params.id;

    const report = await fetchReportById(id)

    return(
        <div className="flex flex-col gap-3">
            <h1 className={`text-2xl`}>Reporte de <span className="capitalize">{report.month}</span></h1>

            <div className="flex flex-col gap-8 mt-10">
                <div>
                    <p className="text-4xl mb-4">Resumen</p>
                    {report.buisness_resume ? <p>{report.buisness_resume}</p> : <p>Vacío</p>}
                </div>
                <div>
                    <p className="text-4xl mb-4">Objetivos</p>
                    {report.goals ? <p>{report.goals}</p> : <p>Vacío</p>}
                </div>
                <div>
                    <p className="text-4xl mb-4">Análisis</p>
                    {report.analysis ? <p>{report.analysis}</p> : <p>Vacío</p>}
                </div>
            </div>
            {/* <p>{report.buisness_id}</p> */}
        </div>
    )
}