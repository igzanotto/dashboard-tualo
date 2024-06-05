import { fetchReportsByBusiness } from '@/lib/data';
import ChartNavigation from './chart-navigation';
import MonthButton from './monthButton';
import '../app/globals.css'
import SideNavDrawer from './sidenav-drawer';


type ReportsNavbarProps = {
  business_id: string;
};

export default async function ReportsIndexNavbar({business_id}: ReportsNavbarProps) {
  const reports = await fetchReportsByBusiness(business_id);

  const reportId = reports && reports.length > 0 ? reports[0].id : null;
console.log(reportId);

  

  return (
    <nav className="sticky top-0 z-50 flex items-center max-[1228px]:justify-center mb-10 md:gap-10 rounded-b-xl p-2 md:p-4 bg-white shadow-lg" id="reportsNavbar">
      <div className='md:hidden self-start'>
      <SideNavDrawer/>
      </div>

      <div className='max-md:hidden'>
        {reports && <MonthButton reports={reports}/>}
      </div>
      
      <div className='flex items-center gap-4 chart-space max-md:hidden'>
        {reports && reports.length > 0 && (
            <ChartNavigation/>
        )}
      </div>


    <div className='flex items-center gap-4 md:hidden'>
      {reports && <MonthButton reports={reports}/>}
      
      <div className='flex items-center gap-4 chart-space'>
        {reports && reports.length > 0 && (
            <ChartNavigation />
        )}
      </div>
    </div>

    </nav>
  );
}
