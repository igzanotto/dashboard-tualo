import { fetchBusinessById } from '@/lib/data';
import ReportsTable from '@/components/admin/reports/table';
import AddIcon from '@/components/icons/AddIcon';
import { InvoicesTableSkeleton } from '@/components/skeletons';
import Link from 'next/link';
import { Suspense } from 'react';
import { Libre_Baskerville } from 'next/font/google';


const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface BusinessPageProps {
  params: {
    business_id: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function BusinessPage({
  params,
  searchParams,
}: BusinessPageProps) {
  const { business_id } = params;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const business = await fetchBusinessById(business_id);

  return (
    <div className="flex flex-col gap-3 text-[#003E52]">
      <h1 className={`text-xl md:text-2xl xl:text-5xl text-[#003E52] ${libreBaskerville.className}`}>{business.name}</h1>
      <p>{business.description}</p>
      <div className="mt-10 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-2xl">Reportes</p>
          <Link
            href={`/admin/businesses/${business.id}/reports/create`}
            className="flex w-[220px] items-center gap-2 rounded-xl bg-teal-600 p-2 text-white"
          >
            <AddIcon />
            Nuevo reporte inicial
          </Link>
          <Link
            href={`/admin/businesses/${business.id}/reports/create-follow-up`}
            className="flex w-[220px] items-center gap-2 rounded-xl bg-teal-600 p-2 text-white"
          >
            <AddIcon />
            Nuevo reporte
          </Link>
          <Link
            href={`/admin/businesses/${business.id}/users/add`}
            className="flex w-[220px] items-center gap-2 rounded-xl bg-teal-600 p-2 text-white"
          >
            <AddIcon />
            Agregar usuario
          </Link>
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <ReportsTable
            query={query}
            currentPage={currentPage}
            business_id={business_id}
          />
        </Suspense>
      </div>
    </div>
  );
}
