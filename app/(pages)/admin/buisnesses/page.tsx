import { fetchBuisnesses, fetchBusinessPages } from '@/app/lib/data';
import Link from 'next/link';
import {BuildingOfficeIcon} from "@heroicons/react/24/outline"
import AddIcon from '@/components/icons/AddIcon';
import Search from '@/components/search';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/components/skeletons';
import BusinessTable from '@/components/admin/table';
import Pagination from '@/components/pagination';


export default async function Page({searchParams,}: {searchParams?: {  query?: string;  page?: string;}}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchBusinessPages(query)
  const totalPagesOrDefault = totalPages || 0;
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Negocios</h1>
      </div>
      <div className='mt-10'>
        <Search placeholder="Buscar negocios..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <BusinessTable query={query} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPagesOrDefault} />
      </div>
        <Link href={"/admin/buisnesses/create"} className='flex items-center bg-blue-800 p-2 rounded-xl text-white gap-2 w-[220px] mt-7'>
          Agregar nuevo negocio
          <AddIcon/>
        </Link>
    </div>
  );
}
