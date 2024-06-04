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
import { ChevronDownIcon } from 'lucide-react';

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
              className={`text rounded-lg p-2 font-medium transition-all ${
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
          {reportLinks.map((data, index) => (
            <Link
              key={index}
              href={`${pathname}/#${data}`}
              onClick={() => handleChartClick(data)}
              className={`text rounded-lg p-2 font-medium transition-all ${
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
