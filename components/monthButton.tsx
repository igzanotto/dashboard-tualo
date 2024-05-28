"use client";

import { forwardRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

interface Report {
  id: string;
  month: string;
}

interface MonthButtonProps {
  reports: Report[];
}

export function MonthButton({ reports }: MonthButtonProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const pathname = usePathname();
  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-gradient-to-r from-[#4C30C5] to-[#39AEFF] text-white text-base capitalize w-[200px]">
            {pathname === "/dashboard/reports" ? "Mes" : selectedMonth || "Mes"}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col p-2 gap-2">
            {reports.map((report) => (
              <NavigationMenuLink asChild key={report.id} className="py-2 px-4 bg-gray-200 rounded-lg">
                <Link href={`/dashboard/reports/${report.id}`} onClick={() => handleMonthSelect(report.month)} className="capitalize">
                  {report.month}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
