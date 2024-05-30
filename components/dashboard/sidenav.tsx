import Link from 'next/link';

import { PowerIcon } from '@heroicons/react/24/outline';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavLinks from './nav-links';
import LogoScrolled from '../icons/LogoScrolled';
import { LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import Image from 'next/image';


export default async function SideNav() {

  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();
  console.log(user?.user_metadata.full_name);
  

  return (
    <div className="flex h-full flex-col justify-center px-3 py-4 md:px-2 shadow-lg">
      <Link
      className='mb-3 self-center'
        href="/dashboard"
      >
        <LogoScrolled/>
      </Link>

      {/* <div>
        <p>¡Hola <span>{user?.user_metadata.full_name}</span>!</p>
        <Image width={50} height={50} src={user?.user_metadata.avatar_url} alt='Avatar url'/>
      </div> */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 mt-10">
        <NavLinks />
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
            <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <LogOut width={30} height={30}/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Cerrar sesión
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
          </button>
        </form>
      </div>
    </div>
  );
}
