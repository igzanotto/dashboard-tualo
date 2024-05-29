import { fetchReportsByBusiness } from '@/lib/data';
import ChartNavigation from './chart-navigation';
import Link from 'next/link';
import { File, GoalIcon } from 'lucide-react';
import SuggestIcon from './icons/SuggestIcon';
import Attachment from './icons/Attachment';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import SelectMonth from './select-month';
import MonthButton from './monthButton';

type ReportsNavbarProps = {
  business_id: string;
};

export default async function ReportsIndexNavbar({business_id}: ReportsNavbarProps) {
  const reports = await fetchReportsByBusiness(business_id);

  const reportId = reports && reports.length > 0 ? reports[0].id : null;
console.log(reportId);

  

  return (
    <nav
      className="sticky top-0 z-50 flex items-center mb-10 gap-10 rounded-xl p-4 bg-white shadow-lg"
      id="reportsNavbar"
    >
      
     {/* {reports && <SelectMonth reports={reports}/>} */}
     {reports && <MonthButton reports={reports}/>}
     {/* <MonthButton/> */}
    
      <div className='flex flex-col items-center mx-auto gap-4'>
      {reports && reports.length > 0 && (
        <ChartNavigation reportId={reports[0].id} />
      )}
      
      
      
      <div className='flex items-center gap-4'>
      <Link
          href={`/dashboard/reports/${reportId}/#metas-financieras`}
          className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 font-medium text-black hover:px-7 hover:bg-[#FF6C0E] hover:text-white transition-all"
        >
          <GoalIcon width={20} height={20} />
          Metas financieras
        </Link>

        <Link
          href={`/dashboard/reports/${reportId}/#conclusiones`}
          className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 font-medium text-black hover:px-7 hover:bg-[#FF6C0E] hover:text-white transition-all"
        >
          <File width={20} height={20} />
          Conclusiones
        </Link>

        <Link
          href={`/dashboard/reports/${reportId}/#recomendaciones`}
          className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 font-medium text-black hover:px-7 hover:bg-[#FF6C0E] hover:text-white transition-all"
        >
          <SuggestIcon />
          Recomendaciones
        </Link>

        <Link
          href={'/#anexo'}
          className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 font-medium text-black hover:px-7 hover:bg-[#FF6C0E] hover:text-white transition-all"
        >
          <PaperClipIcon width={20} height={20}/>
          Anexo
        </Link>
      </div>
      </div>

    </nav>
  );
}
