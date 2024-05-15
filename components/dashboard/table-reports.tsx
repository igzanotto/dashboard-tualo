import {fetchFilteredReports} from '@/app/lib/data';
import Link from 'next/link';
import ReportsButton from './reports-buttons';


type ReportsTableProps = {
    query: string;
    currentPage: number;
    // businessId: string[];
  };
  

export default async function ReportsTableDashboard({ query, currentPage}:ReportsTableProps) {
  const reports = await fetchFilteredReports(query, currentPage);
  //   const filteredReports = reports.filter(report => businessId.includes(report.business_id));
  

  return (
    <div className="flow-root">
      <div className='flex gap-10 w-full border-1 bg-gray-50 rounded-xl p-4 mb-10'>
        {reports.map(report => (
            <ReportsButton key={report.id} path={`/dashboard/reports/${report.id}`} month={report.month} />
        ))}
      </div>
    </div>
  );
}
