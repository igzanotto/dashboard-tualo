import { fetchBusinessById, fetchBusinessUsers } from '@/lib/data';
import ReportsTable from '@/components/admin/reports/table';
import AddIcon from '@/components/icons/AddIcon';
import { InvoicesTableSkeleton } from '@/components/skeletons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Suspense } from 'react';
import { Libre_Baskerville } from 'next/font/google';
import { FileIcon } from 'lucide-react';
import { ArrowsRightLeftIcon, DocumentChartBarIcon, DocumentIcon } from '@heroicons/react/24/outline';
import Movements from '@/components/movements/movements';

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
  // const business_users = await fetchBusinessUsers(business_id);

  return (
    <div className="my-10 flex flex-col gap-3 text-[#003E52]">
      <div className="flex flex-col items-center gap-8">
        <h1
          className={`text-xl text-[#003E52] md:text-2xl xl:text-5xl ${libreBaskerville.className}`}
        >
          {business.name}
        </h1>
        <Tabs defaultValue="reportes" className='w-[95%]'>
          <div className='flex justify-center'>
          <TabsList className="mb-5">
            <TabsTrigger value="reportes" className="flex items-center gap-1">
              <DocumentChartBarIcon width={20} height={20}/>
              Reportes
            </TabsTrigger>
            <TabsTrigger value="movimientos" className="flex items-center gap-1"
            >
              <ArrowsRightLeftIcon width={20} height={20}/>
              Movimientos
            </TabsTrigger>
          </TabsList>
          </div>
          <TabsContent value="reportes">
            <div className="mt-10 flex flex-col">
              <div className="mb-4 flex items-center justify-around max-lg:flex-col max-lg:gap-4">
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
          </TabsContent>
          <TabsContent value="movimientos">
            <Movements params={{business_id}}/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
