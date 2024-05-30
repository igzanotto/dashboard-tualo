"use client";


import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchReportById } from "@/lib/data";
import SkeletonButtons from "./skeleton-buttons";
import { GoalIcon } from "lucide-react";
import { ChevronDownIcon, DocumentChartBarIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SuggestIcon from "./icons/SuggestIcon";
import '../app/globals.css'

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
      <div className="flex flex-col items-center gap-4 max-[1228px]:hidden">
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

  const SHEET_SIDES = ["top"] as const

  type SheetSide = (typeof SHEET_SIDES)[number]

  return (
    <div>
      <div className="flex flex-col justify-center gap-2 max-[1228px]:hidden">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#resumen`}
            onClick={() => setSelectedChart('resumen')}
            className={`text flex items-center gap-2 rounded-lg p-2 font-medium transition-all ${
              selectedChart === 'resumen'
                ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
            }`}
          >
            <DocumentChartBarIcon width={20} height={20} />
            Resumen
          </Link>
          {orderedCharts.map((chart: any) => (
            <Link
              key={chart.id}
              href={`/dashboard/reports/${reportId}/${report.month}/#${chart.type}`}
              onClick={() => handleChartClick(chart.type)}
              className={`text rounded-lg p-2 font-medium transition-all ${
                selectedChart === chart.type
                  ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                  : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
              }`}
            >
              {chart.type}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#conclusiones`}
            onClick={() => setSelectedChart('conclusiones')}
            className={`text flex items-center gap-2 rounded-lg p-2 font-medium transition-all ${
              selectedChart === 'conclusiones'
                ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
            }`}
          >
            <DocumentChartBarIcon width={20} height={20} />
            Conclusiones
          </Link>
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#recomendaciones`}
            onClick={() => setSelectedChart('recomendaciones')}
            className={`text flex items-center gap-2 rounded-lg p-2 font-medium transition-all ${
              selectedChart === 'recomendaciones'
                ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
            }`}
          >
            <SuggestIcon />
            Recomendaciones
          </Link>
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#anexo`}
            onClick={() => setSelectedChart('anexo')}
            className={`text flex items-center gap-2 rounded-lg p-2 font-medium transition-all ${
              selectedChart === 'anexo'
                ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
            }`}
          >
            <PaperClipIcon width={20} height={20} />
            Anexo
          </Link>
        </div>
      </div>
      <div className="chart-navigation-responsive flex">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-[120px] flex items-center justify-between">
                Gráficas
                <ChevronDownIcon width={20} height={20}/>
              </Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetDescription className="flex flex-col justify-center gap-2">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/reports/${reportId}/${report.month}/#resumen`}
                      onClick={() => setSelectedChart('resumen')}
                      className={`text flex items-center gap-2 rounded-lg p-2 font-medium transition-all ${
                        selectedChart === 'resumen'
                          ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                          : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
                      }`}
                    >
                      <DocumentChartBarIcon width={20} height={20} />
                      Resumen
                    </Link>
                    {orderedCharts.map((chart: any) => (
                      <Link
                        key={chart.id}
                        href={`/dashboard/reports/${reportId}/${report.month}/#${chart.type}`}
                        onClick={() => handleChartClick(chart.type)}
                        className={`text rounded-lg p-2 font-medium transition-all ${
                          selectedChart === chart.type
                            ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                            : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
                        }`}
                      >
                        {chart.type}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#conclusiones`}
            onClick={() => setSelectedChart('conclusiones')}
            className={`text flex items-center gap-2 rounded-lg p-2 font-medium transition-all ${
              selectedChart === 'conclusiones'
                ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
            }`}
          >
            <DocumentChartBarIcon width={20} height={20} />
            Conclusiones
          </Link>
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#recomendaciones`}
            onClick={() => setSelectedChart('recomendaciones')}
            className={`text flex items-center gap-2 rounded-lg p-2 font-medium transition-all ${
              selectedChart === 'recomendaciones'
                ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
            }`}
          >
            <SuggestIcon />
            Recomendaciones
          </Link>
          <Link
            href={`/dashboard/reports/${reportId}/${report.month}/#anexo`}
            onClick={() => setSelectedChart('anexo')}
            className={`text flex items-center gap-2 rounded-lg p-2 font-medium transition-all ${
              selectedChart === 'anexo'
                ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
            }`}
          >
            <PaperClipIcon width={20} height={20} />
            Anexo
          </Link>
        </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}