import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminSideNav from '@/components/admin/admin-sidenav';
import SideBarMobile from '@/components/admin/sidebar-mobile';
import ChartNavigation from '@/components/chart-navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  // llama a la table profiles todos los users pero por una policy se limita al profile que conincide con el user que lo pide
  const { data: email, error }= await supabase.from('profiles').select('email').single();

  // checks if email ends with @tualo.mx

  const isAdmin = email?.email?.endsWith('@tualo.mx')

  if (!isAdmin) {
    return redirect('/dashboard');
  }
  
  return (
    <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden w-full`}>
      <div className="w-full flex-none md:w-64">
        <AdminSideNav />
        <SideBarMobile/>
      </div>
      <div className="md:overflow-y-auto md:px-4 w-full">{children}</div>
    </div>
  );
}


