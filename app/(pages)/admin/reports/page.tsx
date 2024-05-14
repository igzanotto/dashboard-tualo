
// import ReportsTable from "@/components/admin/reports/table";
// import AddIcon from "@/components/icons/AddIcon";
// import Search from "@/components/search";
// import { InvoicesTableSkeleton } from "@/components/skeletons";
// import Link from 'next/link';
// import { Suspense } from "react";

export default async function Page({searchParams,}: {searchParams?: {query?: string; page?: string;}}){

  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
  

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`text-2xl`}>Reportes</h1>
        </div>
        {/* <div className='mt-10'>
          <Search placeholder="Buscar negocios..." />
        </div>
          <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
            <ReportsTable query={query} currentPage={currentPage} />
          </Suspense>
          <Link
            href={'/admin/reports/create'}
            className="mt-7 flex w-[220px] items-center gap-2 rounded-xl bg-blue-800 p-2 text-white"
          >
            Agregar nuevo reporte
            <AddIcon/>
          </Link> */}
      </div>
    );
}