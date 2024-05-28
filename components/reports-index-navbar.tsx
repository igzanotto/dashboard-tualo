import { fetchReportsByBusiness } from '@/lib/data';
import { MonthButton } from './monthButton';
import ChartNavigation from './chart-navigation';
import Link from 'next/link';
import { File, GoalIcon } from 'lucide-react';
import SuggestIcon from './icons/SuggestIcon';
import Attachment from './icons/Attachment';

type ReportsNavbarProps = {
  business_id: string;
};

export default async function ReportsIndexNavbar({business_id}: ReportsNavbarProps) {
  const reports = await fetchReportsByBusiness(business_id);

  const reportId = reports && reports.length > 0 ? reports[0].id : null;
console.log(reportId);

  

  return (
    <nav
      className="sticky top-0 z-50 flex mb-10 gap-10 rounded-xl p-4 bg-white shadow-xl"
      id="reportsNavbar"
    >
      {reports && <MonthButton reports={reports} />}

      
      <div className='flex flex-col items-center mx-auto gap-4'>
      {reports && reports.length > 0 && (
        <ChartNavigation reportId={reports[0].id} />
      )}
      
      
      
      <div className='flex items-center gap-4'>
      <Link
          href={`/dashboard/reports/${reportId}/#metas-financieras`}
          className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 font-medium text-black hover:px-7 hover:bg-slate-500 transition-all"
        >
          <GoalIcon width={20} height={20} />
          Metas financieras
        </Link>

        <Link
          href={`/dashboard/reports/${reportId}/#conclusiones`}
          className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 font-medium text-black hover:px-7 hover:bg-slate-500 transition-all"
        >
          <File width={20} height={20} />
          Conclusiones
        </Link>

        <Link
          href={`/dashboard/reports/${reportId}/#recomendaciones`}
          className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 font-medium text-black hover:px-7 hover:bg-slate-500 transition-all"
        >
          <SuggestIcon />
          Recomendaciones
        </Link>

        <Link
          href={'/#anexo'}
          className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 font-medium text-black hover:px-7 hover:bg-slate-500 transition-all"
        >
          <Attachment />
          Anexo
        </Link>
      </div>
      </div>

    </nav>
  );
}
