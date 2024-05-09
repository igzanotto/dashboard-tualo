import { fetchReportById } from "@/app/lib/data";

export default async function ReportPage({ params }: { params: { id: string } }){
    const id = params.id;

    const report = await fetchReportById(id)

    return(
        <div className="flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl xl:text-5xl">{report.id}</h1>
            <p>{report.month}</p>
        </div>
    )
}