import {fetchFilteredReports} from '@/app/lib/data';
import Link from 'next/link';

type ReportsTableProps = {
    query: string;
    currentPage: number;
  };
  

export default async function ReportsTable({ query, currentPage}:ReportsTableProps) {
  const reports = await fetchFilteredReports(query, currentPage)

  return (
    <div className="mt-6 flow-root">
        <div className='flex flex-col gap-2 w-full border-1 bg-gray-50 rounded-xl p-4 mt-10'>
          {
            reports.map(report => (
              <div className='border-2 border-slate-200 p-2 rounded-xl'>
                <Link href={`/admin/reports/${report.id}`} key={report.id} className='flex items-center gap-2'>
                  {/* <BuildingOfficeIcon className='w-7 h-7'/> */}
                  <p>{report.month}</p>
                </Link>
              </div>
            ))
          }
      </div>
    </div>
  );
}
