import {fetchFilteredReports} from '@/app/lib/data';
import Link from 'next/link';

type ReportsTableProps = {
    query: string;
    currentPage: number;
    buisnessId: string[];
  };
  

export default async function ReportsTable({ query, currentPage, buisnessId}:ReportsTableProps) {
  const reports = await fetchFilteredReports(query, currentPage);
  const filteredReports = reports.filter(report => buisnessId.includes(report.buisness_id));

  return (
    <div className="flow-root">
      <div className='flex flex-col gap-2 w-full border-1 bg-gray-50 rounded-xl p-4'>
        {filteredReports.map(report => (
          <div className='border-2 border-slate-200 p-2 rounded-xl' key={report.id}>
            <Link href={`/admin/reports/${report.id}`} className='flex items-center gap-2'>
              <p>{report.month}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
