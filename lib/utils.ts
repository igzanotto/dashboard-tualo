import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function translateChartType(type: string) {
  const chartTypeTranslations: {[key: string]: string} = {
    'waterfall': 'ingresos y egresos',
    'sales': 'ventas',
    'costs_and_expenses': 'costos y gastos',
    'net_profit_and_margins': 'utilidad neta',
    'margins': 'márgenes',
    'detailed_expenses': 'gastos desglosados',
    'actual_vs_average' : 'comparación de resultados',
    'actual_vs_average_2': 'comparación de márgenes'
  };
   

  return chartTypeTranslations[type] || type;
}



export function translateMonths(type: string) {
  const chartMonthTranslations: { [key: string]: string } = {
    'january': 'enero',
    'february': 'febrero',
    'march': 'marzo',
    'april': 'abril',
    'may': 'mayo',
    'june': 'junio',
    'july': 'julio',
    'august': 'agosto',
    'september': 'septiembre',
    'october': 'octubre',
    'november': 'noviembre',
    'december': 'diciembre',
  };

  return chartMonthTranslations[type] || type;
}


export function translateMonthsNumber(type: string) {
  const chartMonthTranslations: { [key: string]: string } = {
    1: 'enero',
    2: 'febrero',
    3: 'marzo',
    4: 'abril',
    5: 'mayo',
    6: 'junio',
    7: 'julio',
    8: 'agosto',
    9: 'septiembre',
    10: 'octubre',
    11: 'noviembre',
    12: 'diciembre',
  };

  return chartMonthTranslations[type] || type;
}
