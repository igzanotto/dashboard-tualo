"use client";


import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchReportById } from "@/lib/data";
import SkeletonButtons from "./skeleton-buttons";
import { GoalIcon } from "lucide-react";
import { DocumentChartBarIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import SuggestIcon from "./icons/SuggestIcon";

interface ChartNavigationProps {
  reportId: string;
}

const chartOrder = [
  'Cascada P&L',
  'Ventas',
  'Costos y gastos',
  'Utilidad neta',
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

    const conclusionesSection = document.getElementById('conclusiones');
    if (conclusionesSection) {
      observer.observe(conclusionesSection);
      sectionRefs.current.set('conclusiones', conclusionesSection);
    }

    const recomendacionesSection = document.getElementById('recomendaciones');
    if (recomendacionesSection) {
      observer.observe(recomendacionesSection);
      sectionRefs.current.set('recomendaciones', recomendacionesSection);
    }

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
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 justify-center">
          <SkeletonButtons />
          <SkeletonButtons />
          <SkeletonButtons />
          <SkeletonButtons />
          <SkeletonButtons />
          <SkeletonButtons />
          <SkeletonButtons />
        </div>
        <div className="flex items-center gap-4 justify-center">
          <SkeletonButtons />
          <SkeletonButtons />
          <SkeletonButtons />
        </div>
      </div>
    );
  }

  const orderedCharts = report.charts.sort((a: any, b: any) => {
    return chartOrder.indexOf(a.type) - chartOrder.indexOf(b.type);
  });

  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex items-center gap-2 justify-center">
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#resumen`}
            onClick={() => setSelectedChart("resumen")}
            className={`p-2 rounded-lg font-medium transition-all text flex items-center gap-2 ${
              selectedChart === "resumen"
                ? "bg-[#00AE8D] hover:text-white text-white px-4"
                : "bg-gray-200 text-black hover:bg-[#00AE8D] hover:text-white hover:px-4"
            }`}
          >
            <DocumentChartBarIcon width={20} height={20}/>
            Resumen
          </Link>
          {orderedCharts.map((chart: any) => (
            <Link
              key={chart.id}
              href={`/dashboard/reports/${reportId}/${report.month}/#${chart.type}`}
              onClick={() => handleChartClick(chart.type)}
              className={`p-2 rounded-lg font-medium transition-all text ${
                selectedChart === chart.type
                  ? "bg-[#00AE8D] hover:text-white text-white px-4"
                  : "bg-gray-200 text-black hover:bg-[#00AE8D] hover:text-white hover:px-4"
              }`}
            >
              {chart.type}
            </Link>
          ))}
      </div>
      <div className="flex items-center gap-2 justify-center">
        <Link
              href={`/dashboard/reports/${reportId}/${report.month}/#conclusiones`}
              onClick={() => setSelectedChart("conclusiones")}
              className={`p-2 rounded-lg font-medium transition-all text flex items-center gap-2 ${
                selectedChart === "conclusiones"
                  ? "bg-[#00AE8D] hover:text-white text-white px-4"
                  : "bg-gray-200 text-black hover:bg-[#00AE8D] hover:text-white hover:px-4"
              }`}
            >
              <DocumentChartBarIcon width={20} height={20}/>
              Conclusiones
            </Link>
            <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#recomendaciones`}
            onClick={() => setSelectedChart("recomendaciones")}
            className={`p-2 rounded-lg font-medium transition-all text flex items-center gap-2 ${
              selectedChart === "recomendaciones"
                ? "bg-[#00AE8D] hover:text-white text-white px-4"
                : "bg-gray-200 text-black hover:bg-[#00AE8D] hover:text-white hover:px-4"
            }`}
          >
            <SuggestIcon />
            Recomendaciones
          </Link>
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#anexo`}
            onClick={() => setSelectedChart("anexo")}
            className={`p-2 rounded-lg font-medium transition-all text flex items-center gap-2 ${
              selectedChart === "anexo"
                ? "bg-[#00AE8D] hover:text-white text-white px-4"
                : "bg-gray-200 text-black hover:bg-[#00AE8D] hover:text-white hover:px-4"
            }`}
          >
            <PaperClipIcon width={20} height={20}/>
            Anexo
          </Link>
      </div>
    </div>
  );
}