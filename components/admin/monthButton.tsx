"use client"

import {fetchReportsByBusiness} from '@/lib/data';
import Link from 'next/link';
import * as React from "react";
import {ChevronDownIcon} from "lucide-react";
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
import { usePathname } from "next/navigation";

type Props = {
  business_id: string;
};

type Report = {
  id: string;
  business_id:string
  // Agrega otras propiedades del reporte según sea necesario
};

export default function MonthButtonsAdmin({ business_id}:Props) {
  const [reports, setReports] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Report | null>(null);

  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const reportMonth = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);

  React.useEffect(() => {
    const fetchReports = async () => {
      const reportsData = await fetchReportsByBusiness(business_id);
      console.log(reportsData);
      
      if (reportsData) {
        setReports(reportsData);
      } else {
        setReports([]);
      }
    };

    
    
    fetchReports();
  }, [business_id]);
  console.log(reports);
  

  
  return (
    // <div >
    //     {reports && reports.map(report => (
    //       <div className='' key={report.id}>
    //         <Link href={`/admin/businesses/${business_id}/reports/${report.id}`} className='flex items-center gap-2'>
    //           <p>{report.month}</p>
    //         </Link>
    //       </div>
    //     ))}
    // </div>
    <div className="flex flex-col items-center space-x-4">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-[120px] capitalize flex items-center justify-between">
          {reportMonth}
          <ChevronDownIcon width={20} height={20}/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[120px]">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>No hay reportes encontrados.</CommandEmpty>
            <CommandGroup>
              {reports?.map((report) => (
                <Link key={report.id} href={`/admin/businesses/${business_id}/reports/${report.id}/${report.month}`} passHref>
                  <CommandItem
                  className="cursor-pointer"
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
