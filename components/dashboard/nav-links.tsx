'use client';

import { DocumentChartBarIcon, LinkIcon } from '@heroicons/react/24/outline';
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

interface ReportData {
  id: number;
  month: string;
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

  return (
    <>
      <Link
        href={`/dashboard/reports/${latestReport?.id}/${latestReport?.month}`}
        className={clsx(
          'flex h-[48px] grow items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-center  md:p-2 md:px-3',
        )}
      >
        <div className="max-md:hidden">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DocumentChartBarIcon width={30} height={30} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Resumen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-lg font-medium md:hidden">Resumen</p>
      </Link>
    </>
  );
}
