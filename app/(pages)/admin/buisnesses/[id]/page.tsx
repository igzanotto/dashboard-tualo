import { fetchBusinessById, fetchFilteredReports, fetchReportByBuisnessId } from "@/app/lib/data";
import ReportsTable from "@/components/admin/reports/table";
import AddIcon from "@/components/icons/AddIcon";
import { InvoicesTableSkeleton } from "@/components/skeletons";
import Link from "next/link";
import { Suspense } from "react";


interface BusinessPageProps {
    params: {
      id: string;
    };
    searchParams?: {
      query?: string;
      page?: string;
    };
  }

export default async function BusinessPage({ params, searchParams }: BusinessPageProps){
    const id = params.id;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const buisness = await fetchBusinessById(id)
    const reports = await fetchFilteredReports(query, currentPage)
    
    const mapsIds = reports.map((rep) => rep.buisness_id);
    const matchingIds = mapsIds.filter((mapId) => mapId == id);
        
    return(
        <div className="flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl xl:text-5xl">{buisness.name}</h1>
            <p>{buisness.description}</p>
          <div className="flex flex-col mt-10">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl">Reportes de {buisness.name}</p>
                    <Link href={`/admin/buisnesses/${buisness.id}/create-report`} className="flex w-[220px] items-center gap-2 rounded-xl bg-blue-800 p-2 text-white">
                        Agregar nuevo reporte
                        <AddIcon/>
                    </Link>
                </div>
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    <ReportsTable query={query} currentPage={currentPage} buisnessId={matchingIds}/>
                </Suspense>
          </div>
        </div>
    )
}