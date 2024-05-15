import SideNav from '@/components/dashboard/sidenav';
import ReportsIndexNavbar from '@/components/dashboard/reports-index-navbar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();
  
  if (!user) {
    return redirect('/login');
  }

  const { data }= await supabase.from('profiles').select('business_id').single();
  const business_id = data?.business_id;
  
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <ReportsIndexNavbar business_id={business_id} />
        {children}
      </div>
    </div>
  );
}
