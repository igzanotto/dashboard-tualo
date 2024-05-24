import { fetchReportsByBusiness } from '@/lib/data';
import ReportsButton from './dashboard/reports-buttons';

type ReportsNavbarProps = {
  business_id: string;
};

export default async function ReportsIndexNavbar({
  business_id,
}: ReportsNavbarProps) {
  const reports = await fetchReportsByBusiness(business_id);

  return (
    
      <nav className="border-1 mb-10 flex gap-10 rounded-xl p-4 sticky -top-10 z-50" id='reportsNavbar'>
        {reports &&
          reports.map((report) => (
            <ReportsButton
              key={report.id}
              path={`/dashboard/reports/${report.id}`}
              month={report.month}
            />
          ))}
      </nav>
  );
}
