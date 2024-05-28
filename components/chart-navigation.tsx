"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchReportById } from "@/lib/data";
import SkeletonButtons from "./skeleton-buttons";
import { File, GoalIcon } from "lucide-react";
import SuggestIcon from "./icons/SuggestIcon";
import Attachment from "./icons/Attachment";

interface ChartNavigationProps {
  reportId: string;
}

export default function ChartNavigation({ reportId }: ChartNavigationProps) {
  const [report, setReport] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const getReport = async () => {
      const fetchedReport = await fetchReportById(reportId);
      setReport(fetchedReport);
    };

    getReport();
  }, [reportId]);

  if (!report) {
    return (
      <div className='flex items-center gap-4'>
        <SkeletonButtons />
        <SkeletonButtons />
        <SkeletonButtons />
        <SkeletonButtons />
        <SkeletonButtons />
        <SkeletonButtons />
      </div>
    );
  }


  return (
    <div className='flex items-center gap-4'>
      {report.charts.map((chart: any) => (
        <Link
          key={chart.id}
          href={`/dashboard/reports/${reportId}/#${chart.type}`}
          className={pathname === `/dashboard/reports/${reportId}/#${chart.type}` ? 'bg-gradient-to-r from-[#4C30C5] to-[#39AEFF] text-white p-2 rounded-lg font-medium' : 'bg-gray-200 text-black p-2 rounded-lg font-medium'}
        >
          {chart.type}
        </Link>
      ))}
    </div>
  );
}
