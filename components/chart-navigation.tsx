"use client";


import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchReportById } from "@/lib/data";
import SkeletonButtons from "./skeleton-buttons";
import { GoalIcon } from "lucide-react";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";

interface ChartNavigationProps {
  reportId: string;
}

const chartOrder = [
  'Cascada P&L',
  'Ventas',
  'Costos y gastos',
  'Utilidad neta y margen neto',
  'Márgenes',
  'Gastos desglosados'
];

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
            const id = entry.target.id;
            setSelectedChart(id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    // Observar el enlace del resumen para marcarlo como seleccionado si está visible inicialmente
    const resumenSection = document.getElementById('resumen');
    if (resumenSection) {
      observer.observe(resumenSection);
      sectionRefs.current.set('resumen', resumenSection);
    }

    // Observar las secciones de los gráficos
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
        <SkeletonButtons />
      </div>
    );
  }

  const orderedCharts = report.charts.sort((a: any, b: any) => {
    return chartOrder.indexOf(a.type) - chartOrder.indexOf(b.type);
  });

  return (
    <div className="flex items-center gap-4 flex-wrap justify-center">
      <Link
        href={`/dashboard/reports/${reportId}/${report.month}/#resumen`}
        onClick={() => setSelectedChart("resumen")}
        className={`p-2 rounded-lg font-medium transition-all text flex items-center gap-2 ${
          selectedChart === "resumen"
            ? "bg-[#00AE8D] hover:text-white text-white px-7"
            : "bg-gray-200 text-black hover:bg-[#00AE8D] hover:text-white hover:px-7"
        }`}
      >
        <DocumentChartBarIcon width={20} height={20}/>
        Resumen
      </Link>
      {orderedCharts.map((chart: any) => (
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