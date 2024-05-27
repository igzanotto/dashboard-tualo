import { fetchReportsByBusiness } from '@/lib/data';
import ReportsButton from './dashboard/reports-buttons';
import { MonthButton } from './monthButton';
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
      className="border-1 sticky -top-10 z-50 mb-10 flex gap-10 rounded-xl p-4"
      id="reportsNavbar"
    >
      {reports && <MonthButton reports={reports} />}
      
      <div className='flex items-center gap-4'>
        <Link href={""}>
          Cascada P&L
        </Link>
        <Link href={""}>
          Ventas
        </Link>
        <Link href={""}>
          Costos y gastos
        </Link>
        <Link href={""}>
          Márgenes
        </Link>
        <Link href={""}>
          Utilidad neta
        </Link>
        <Link href={""}>
          Gastos desglosados
        </Link>
      </div>
    </nav>
  );
}
