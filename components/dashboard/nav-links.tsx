'use client';

import { BriefcaseIcon, DocumentChartBarIcon, LinkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLastReport } from '@/lib/data';
import clsx from 'clsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import MovementIcon from '../icons/MovementIcon';

interface ReportData {
  id: number;
  month: string;
  business_id?:string;
}

export default function NavLinks() {
  const [latestReport, setLatestReport] = useState<ReportData | null>(null);
  
  
  useEffect(() => {
    const fetchLastReport = async () => {
      try {
        const report = await getLastReport();
        setLatestReport(report);
        
      } catch (error) {
        console.error('Error fetching last report:', error);
        // Puedes manejar el error de alguna manera, por ejemplo, redireccionando a una página de error.
      }
    };
    fetchLastReport();
  }, []);

  const navlinks = [
    {
      name: 'Resumen',
      href: `/dashboard/reports/${latestReport?.id}/${latestReport?.month}`,
      icon: <DocumentChartBarIcon width={30} height={30} className='text-[#0065A1]'/>,
    },
    {
      name: 'Movimientos',
      href: `/dashboard/movements/${latestReport?.business_id}`,
      icon: <MovementIcon />,
    },
    {
      name: 'Mi negocio',
      href: `/dashboard/myBusiness/${latestReport?.business_id}`,
      icon: <BriefcaseIcon width={30} height={30} className='text-[#0065A1]'/>,
    },
  ];

  
  return (
    <>
    {
      navlinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            'flex h-[48px] grow items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-[#00AE8D]/20 hover:text-[#0065A1] md:flex-none md:justify-center  md:p-2 md:px-3',
          )}
        >
          <div className="max-md:hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {link.icon}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="md:hidden">
            {link.icon}
          </div>
          <p className="text-lg font-medium md:hidden">{link.name}</p>
        </Link>

      ))
    }
    </>
  );
}
