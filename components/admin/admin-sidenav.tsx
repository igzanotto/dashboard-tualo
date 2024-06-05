import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminNavLinks from './admin-nav-links';
import LogoScrolled from '../icons/LogoScrolled';



export default function AdminSideNav() {
  return (
    <div className="flex h-full flex-col justify-center px-3 py-4 md:px-2 shadow-lg max-md:hidden">
    <Link
    className='mb-3 self-center'
      href="/dashboard"
    >
      <LogoScrolled/>
    </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
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
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
