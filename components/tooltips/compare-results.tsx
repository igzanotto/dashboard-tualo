import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip';
  import { InfoIcon } from 'lucide-react';
  
  const CompareResultsTooltip = () => {
    return (
        <TooltipProvider>
           <Tooltip>
             <TooltipTrigger>
               <InfoIcon width={20} height={20} />
             </TooltipTrigger>
             <TooltipContent className="max-xl:w-[380px] bg-[#252525] text-white flex flex-col gap-4">
               <p>
                Esta gráfica contrasta el mes contra el promedio de los meses anteriores en seis categorías clave: <br /> ventas, costos directos, utilidad bruta (lo que queda de ventas después de restar costos directos), <br /> gastos indirectos, utilidad operativa (lo que queda de ventas después de restar gastos indirectos), gastos financieros y utilidad neta (lo que queda al final). <br /> Permite evaluar si la empresa está mejorando o no en cada categoría respecto a su rendimiento promedio histórico.
               </p>
             </TooltipContent>
           </Tooltip>
         </TooltipProvider>
    );
  };
  
  export default CompareResultsTooltip;
  