import { fetchReportsByBusiness } from '@/lib/data';
import { MonthButton } from './monthButton';
import ChartNavigation from './chart-navigation';

type ReportsNavbarProps = {
  business_id: string;
};

export default async function ReportsIndexNavbar({
  business_id,
}: ReportsNavbarProps) {
  const reports = await fetchReportsByBusiness(business_id);

  return (
    <nav
      className="border-1 sticky -top-10 z-50 mb-10 flex gap-10 rounded-xl p-4"
      id="reportsNavbar"
    >
      {reports && <MonthButton reports={reports} />}

      {reports && reports.length > 0 && (
        <ChartNavigation reportId={reports[0].id} />
      )}

    </nav>
  );
}
