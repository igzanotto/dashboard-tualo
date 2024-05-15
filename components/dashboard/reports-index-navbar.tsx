import { fetchReportsByBusiness } from '@/app/lib/data';
import ReportsButton from './reports-buttons';

type ReportsNavbarProps = {
  business_id: string;
};

export default async function ReportsIndexNavbar({ business_id}: ReportsNavbarProps) {
  const reports = await fetchReportsByBusiness(business_id)

  return (
    <div className="flow-root">
      <div className="border-1 mb-10 flex w-full gap-10 rounded-xl bg-gray-50 p-4">
        {reports.map((report) => (
          <ReportsButton
            key={report.id}
            path={`/dashboard/reports/${report.id}`}
            month={report.month}
          />
        ))}
      </div>
    </div>
  );
}
