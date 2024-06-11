import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip';
  import { InfoIcon } from 'lucide-react';
  
  const ProfitMarginsTooltip = () => {
    return (
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon width={20} height={20} />
          </TooltipTrigger>
          <TooltipContent className="max-xl:w-[380px] bg-[#2b2431] text-white flex flex-col gap-4">
            <p>
             <span className='font-medium text-base'>En esta gráfica hay dos datos importantes: las <span className='text-purple-600 font-medium text-base'>barras moradas</span> y la <span className='text-yellow-600 font-medium text-base'>línea amarilla</span>.</span> <br />
             1. Las barras son la <span className='font-medium'>utilidad neta</span>, que se mide en dinero y es lo que queda después de descontar todos los costos y gastos. <br />
             2. La línea es el <span className='font-medium'>margen neto</span>, que se mide en porcentaje y es lo que la utilidad neta representa de las ventas cada mes. OJO: esta línea está guiada por el eje del lado derecho. <br />
             Verlas juntas ayuda a entender tanto en monto como en porcentaje cuánto quedó en la empresa.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  export default ProfitMarginsTooltip;
  