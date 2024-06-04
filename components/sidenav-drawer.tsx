import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { createClient } from '@/utils/supabase/server';
import { Bars2Icon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import NavLinks from './dashboard/nav-links';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';

const SHEET_SIDES = ['left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export default async function SideNavDrawer() {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();


  console.log(user);

  
  return (
    <div>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="m-5 border-none">
              <Bars2Icon width={20} height={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side={side} className='flex flex-col justify-between'>
            <div className='flex flex-col gap-10'>
              <div className="mb-10 mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-2">
                <Image
                  width={40}
                  height={40}
                  src={user?.user_metadata.avatar_url}
                  alt="Avatar Url"
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-medium">
                    {user?.user_metadata.full_name}
                  </p>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>
              <div>
                <NavLinks />
              </div>
            </div>

            
                <div>
                <form
                  action={async () => {
                    'use server';
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    return redirect('/login');
                  }}
                >
                  <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3">
                    <div className='md:hidden'>
                      <LogOut width={30} height={30} /> 
                    </div>
                    <p className='md:hidden'>Cerrar sesión</p>
                  </button>
                </form>
                </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
