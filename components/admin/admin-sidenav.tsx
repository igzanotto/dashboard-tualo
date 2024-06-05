import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminNavLinks from './admin-nav-links';
import LogoScrolled from '../icons/LogoScrolled';
import { LogOut } from 'lucide-react';



export default function AdminSideNav() {
  return (
    <div className="flex h-full flex-col justify-center px-3 py-4 md:px-2 shadow-lg max-md:hidden">
      <Link
        className='mb-3 self-start'
        href="/admin"
     >
       <LogoScrolled/>
     </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 mt-10">
        <AdminNavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            const supabase = createClient();
            await supabase.auth.signOut();
            return redirect("/login");
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3">
            <LogOut width={30} height={30}/>
          </button>
        </form>
      </div>
    </div>
  );
}
