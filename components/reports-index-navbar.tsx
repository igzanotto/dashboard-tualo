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
    <nav className="sticky top-0 z-50 flex items-center mb-10 gap-10 rounded-xl p-4 bg-white shadow-lg" id="reportsNavbar">
     {reports && <MonthButton reports={reports}/>}
    
      <div className='flex items-center mx-auto gap-4'>
        {reports && reports.length > 0 && (
            <ChartNavigation reportId={reports[0].id} />
        )}
      </div>

    </nav>
  );
}
