import {fetchReportsByBusiness} from '@/lib/data';
import Link from 'next/link';

type ReportsTableProps = {
    query: string;
    currentPage: number;
    business_id: string;
  };
  

export default async function ReportsTable({ business_id}:ReportsTableProps) {
  const reports = await fetchReportsByBusiness(business_id)
  console.log(reports);
  
  
  return (
    <div className="flow-root">
      <div className='flex flex-col gap-2 w-full border-1 bg-gray-50 rounded-xl p-4'>
        {reports && reports.map(report => (
          <div className='border-2 border-slate-200 p-2 rounded-xl' key={report.id}>
            <Link href={`/admin/businesses/${business_id}/reports/${report.id}/${report.month}`} className='flex items-center gap-2'>
              <p>{report.month}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
