"use client";

import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle2,
  ChevronDownIcon,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { usePathname } from "next/navigation";



interface Report {
  id: string;
  month: string;
}

interface MonthDropdownProps {
  reports: Report[];
}

export default function MonthButton({ reports }: MonthDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Report | null>(null);

  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const reportMonth = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);


  return (
    <div className="flex flex-col items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-[150px] capitalize flex items-center justify-between">
            {reportMonth}
            <ChevronDownIcon width={20} height={20}/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[150px]">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              <CommandEmpty>No hay reportes encontrados.</CommandEmpty>
              <CommandGroup>
                {reports.map((report) => (
                  <Link key={report.id} href={`/dashboard/reports/${report.id}/${report.month}`} passHref className="cursor-pointer">
                    <CommandItem
                      value={report.id}
                      onSelect={(value) => {
                        setSelectedStatus(reports.find((r) => r.id === value) || null);
                        setOpen(false);
                      }}
                    >
                      <span className="capitalize">{report.month}</span>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
