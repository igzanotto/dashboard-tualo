import { fetchReportById } from "@/lib/data";
import Link from "next/link";

interface ChartNavigationProps {
  reportId: string;
}

export default async function ChartNavigation({ reportId }: ChartNavigationProps) {
  const report = await fetchReportById(reportId);
  
  return (
    <div className='flex items-center gap-4'>
      {report.charts.map((chart: any) => (
        <Link key={chart.id} href={`/dashboard/reports/${reportId}/chart/${chart.id}`}>
          {chart.type}
        </Link>
      ))}
    </div>
  );
}
