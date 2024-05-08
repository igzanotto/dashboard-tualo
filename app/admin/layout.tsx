import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminSideNav from '../ui/admin/admin-sidenav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  // llama a la table profiles todos los users pero por una policy se limita al profile que conincide con el user que lo pide
  const { data: admin, error }= await supabase.from('profiles').select('admin').single();
  const isAdmin = admin?.admin;

  if (!isAdmin) {
    return redirect('/dashboard');
  }
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <AdminSideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}


