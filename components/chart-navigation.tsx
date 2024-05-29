"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchReportById } from "@/lib/data";
import SkeletonButtons from "./skeleton-buttons";

interface ChartNavigationProps {
  reportId: string;
}

export default function ChartNavigation({ reportId }: ChartNavigationProps) {
  const [report, setReport] = useState<any>(null);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const getReport = async () => {
      const fetchedReport = await fetchReportById(reportId);
      setReport(fetchedReport);
    };

    getReport();
  }, [reportId]);

  useEffect(() => {
    if (!report) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelectedChart(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    report.charts.forEach((chart: any) => {
      const section = document.getElementById(chart.type);
      if (section) {
        observer.observe(section);
        sectionRefs.current.set(chart.type, section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section) => observer.unobserve(section));
    };
  }, [report]);

  const handleChartClick = (chartType: string) => {
    setSelectedChart(chartType);
  };

  if (!report) {
    return (
      <div className="flex items-center gap-4">
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
    <div className="flex items-center gap-4 flex-wrap justify-center">
      {report.charts.map((chart: any) => (
        <Link
          key={chart.id}
          href={`/dashboard/reports/${reportId}/#${chart.type}`}
          onClick={() => handleChartClick(chart.type)}
          className={`p-2 rounded-lg font-medium transition-all text ${
            selectedChart === chart.type
            ? "bg-[#00AE8D] hover:text-white text-white px-7"
            : "bg-gray-200 text-black hover:bg-[#00AE8D] hover:text-white hover:px-7"
          }`}
        >
          {chart.type}
        </Link>
      ))}
    </div>
  );
}




