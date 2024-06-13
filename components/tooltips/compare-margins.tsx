import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip';
  import { InfoIcon } from 'lucide-react';
  
  const CompareMarginsTooltip = () => {
    return (
        <TooltipProvider>
           <Tooltip>
             <TooltipTrigger>
               <InfoIcon width={20} height={20} />
             </TooltipTrigger>
             <TooltipContent className="max-xl:w-[380px] bg-[#252525] text-white flex flex-col gap-4">
               <p>
                Esta gráfica mide el desempeño actual de la empresa contra el promedio histórico en tres aspectos fundamentales: <br /> margen bruto (el % que representa la utilidad bruta de las ventas), <br /> margen operativo (lo que representa la utilidad operativa de las ventas) y <br /> margen neto (lo que representa la utilidad neta de las ventas). 
               </p>
             </TooltipContent>
           </Tooltip>
         </TooltipProvider>
    );
  };
  
  export default CompareMarginsTooltip;
  