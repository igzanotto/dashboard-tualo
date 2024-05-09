import { fetchBuisnesses } from '@/app/lib/data';
import Link from 'next/link';
import {BuildingOfficeIcon} from "@heroicons/react/24/outline"
import AddIcon from '@/components/icons/AddIcon';
import Search from '@/components/search';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/components/skeletons';
import BusinessTable from '@/components/admin/table';


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;


  const buisnesses = await fetchBuisnesses()
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Negocios</h1>
      </div>
      <Search placeholder="Search invoices..." />
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <BusinessTable query={query} currentPage={currentPage} />
      </Suspense>
      {/* <div className='flex flex-col gap-2 w-full border-1 bg-gray-50 rounded-xl p-4 mt-10'>
        {
          buisnesses.map(buisness => (
            <div className='border-2 border-slate-200 p-2 rounded-xl'>
              <Link href={`/admin/buisnesses/${buisness.id}`} key={buisness.id} className='flex items-center gap-2'>
                <BuildingOfficeIcon className='w-7 h-7'/>
                <p>{buisness.name}</p>
              </Link>
            </div>
          ))
        }
      </div> */}
        <Link href={"/admin/buisnesses/create"} className='flex items-center bg-blue-800 p-2 rounded-xl text-white gap-2 w-[220px] mt-7'>
          Agregar nuevo negocio
          <AddIcon/>
        </Link>
    </div>
  );
}
