import {fetchFilteredReports} from '@/app/lib/data';
import Link from 'next/link';

type ReportsTableProps = {
    query: string;
    currentPage: number;
    // buisnessId: string[];
  };
  

export default async function ReportsTableDashboard({ query, currentPage}:ReportsTableProps) {
  const reports = await fetchFilteredReports(query, currentPage);
//   const filteredReports = reports.filter(report => buisnessId.includes(report.buisness_id));

  return (
    <div className="flow-root">
      <div className='flex gap-10 w-full border-1 bg-gray-50 rounded-xl p-4'>
        {reports.map(report => (
          <div className='border-2 border-slate-200 py-2 px-3 rounded-xl w-[110px]' key={report.id}>
            <Link href={`/dashboard/reports/${report.id}`} className='flex items-center gap-2'>
              <p className='text-center capitalize self-center mx-auto'>{report.month}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
