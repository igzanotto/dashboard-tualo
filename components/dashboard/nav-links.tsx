'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Reportes', href: '/dashboard/reports', icon: DocumentChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none  md:p-2 md:px-3',
            )}
          >
            <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <LinkIcon width={30} height={30}/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {link.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
          </Link>
        );
      })}
    </>
  );
}
