import { fetchReportsByBusiness } from '@/lib/data';
import { MonthButton } from './monthButton';
import ChartNavigation from './chart-navigation';
import Link from 'next/link';

type ReportsNavbarProps = {
  business_id: string;
};

export default async function ReportsIndexNavbar({
  business_id,
}: ReportsNavbarProps) {
  const reports = await fetchReportsByBusiness(business_id);
  

  return (
    <nav
      className="border-1 sticky -top-10 z-50 mb-10 flex gap-10 rounded-xl p-4 flex-wrap"
      id="reportsNavbar"
    >
      {reports && <MonthButton reports={reports} />}

      <Link href={"/dashboard/reports/57/#metas-financieras"}  className={'bg-gray-200 text-black p-2 rounded-lg font-medium'}>
        Metas financieras
      </Link>


      {reports && reports.length > 0 && (
        <ChartNavigation reportId={reports[0].id} />
      )}
      

    </nav>
  );
}
