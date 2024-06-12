'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { translateChartType } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { ArrowUpDownIcon, ChevronDownIcon } from 'lucide-react';

const chartOrder = [
  'resumen',
  'waterfall',
  'sales',
  'costs_and_expenses',
  'net_profit_and_margins',
  'margins',
  'detailed_expenses',
];

const reportLinks = [
  // 'actual_vs_average',
  // 'actual_vs_average_2',
  'conclusiones',
  'recomendaciones',
  'información adicional',
];

export default function ChartNavigation() {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const pathname = usePathname();

  useEffect(() => {
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
        rootMargin: '0px',
        threshold: 0.5,
      },
    );

    chartOrder.concat(reportLinks).forEach((chart) => {
      const section = document.getElementById(chart);
      if (section) {
        observer.observe(section);
        sectionRefs.current.set(chart, section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleChartClick = (chartType: string) => {
    setSelectedChart(chartType);
  };

  const SHEET_SIDES = ['top'] as const;

  type SheetSide = (typeof SHEET_SIDES)[number];

  return (
    <div>
      <div className="flex flex-col justify-center gap-2 max-[1228px]:hidden">
        <div className="flex items-center justify-center gap-2">
          {chartOrder.map((chart) => (
            <Link
              key={chart}
              href={`${pathname}/#${chart}`}
              onClick={() => handleChartClick(chart)}
              className={`text rounded-lg p-2 font-medium transition-all capitalize ${
                selectedChart === chart
                  ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                  : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
              }`}
            >
              {translateChartType(chart)}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link 
            href={`${pathname}/#actual_vs_average`}
            onClick={() => handleChartClick("actual_vs_average")}
              className={`text rounded-lg p-2 font-medium transition-all capitalize flex items-center gap-2 ${
                selectedChart === "actual_vs_average"
                  ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                  : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
              }`}
          >
            <ArrowUpDownIcon width={18} height={18} className='rotate-90'/>
            resumen
          </Link>

          <Link 
            href={`${pathname}/#actual_vs_average_2`}
            onClick={() => handleChartClick("actual_vs_average_2")}
              className={`text rounded-lg p-2 font-medium transition-all capitalize flex items-center gap-2 ${
                selectedChart === "actual_vs_average_2"
                  ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                  : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
              }`}
          >
            <ArrowUpDownIcon width={18} height={18} className='rotate-90'/>
            márgenes
          </Link>
          {reportLinks.map((data, index) => (
            <Link
              key={index}
              href={`${pathname}/#${data}`}
              onClick={() => handleChartClick(data)}
              className={`text rounded-lg p-2 font-medium transition-all capitalize ${
                selectedChart === data
                  ? 'bg-[#00AE8D] px-4 text-white hover:text-white'
                  : 'bg-gray-200 text-black hover:bg-[#00AE8D] hover:px-4 hover:text-white'
              }`}
            >
              {translateChartType(data)}
            </Link>
          ))}
          
        </div>
      </div>
      <div className="chart-navigation-responsive flex">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex w-[120px] items-center justify-between"
              >
                Gráficas
                <ChevronDownIcon width={20} height={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetDescription className="flex flex-col justify-center gap-2">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {chartOrder.map((chart) => (
                      <SheetClose asChild key={chart}>
                        <Link
                          key={chart}
                          href={`${pathname}/#${chart}`}
                          onClick={() => handleChartClick(chart)}
                          className={`text rounded-lg bg-[#252525]/10 p-2 font-medium capitalize text-black transition-all`}
                        >
                          {translateChartType(chart)}
                        </Link>
                    </SheetClose>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {reportLinks.map((data) => (
                      <SheetClose asChild key={data}>
                      <Link
                        key={data}
                        href={`${pathname}/#${data}`}
                        onClick={() => handleChartClick(data)}
                        className={`text rounded-lg bg-[#252525]/10 p-2 font-medium capitalize text-black transition-all`}
                      >
                        {translateChartType(data)}
                      </Link>
                      </SheetClose>
                    ))}
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
