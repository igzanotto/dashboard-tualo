import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

const CostsExpensesTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon width={20} height={20} />
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-4 bg-[#362422] text-white max-xl:w-[380px]">
          <p>
            <span className="text-base font-medium">
              En esta gráfica hay dos conjuntos de{' '}
              <span className="text-base font-medium text-red-600">
                barras rojas
              </span>
              :
            </span>{' '}
            <br />
            1. La primera, roja claro, representa los{' '}
            <span className="font-medium">costos directos</span> (los que gastas
            para hacer lo que vendes). <br />
            2. La segunda es la de{' '}
            <span className="font-medium">gastos indirectos</span> (los que son
            operativos) <br />
            Además, cada uno tiene su propia línea de promedio para comparar en
            el periodo.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CostsExpensesTooltip;
