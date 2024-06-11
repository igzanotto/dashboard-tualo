import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip';
  import { InfoIcon } from 'lucide-react';
  
  const MarginsTooltip = () => {
    return (
        <TooltipProvider>
           <Tooltip>
             <TooltipTrigger>
               <InfoIcon width={20} height={20} />
             </TooltipTrigger>
             <TooltipContent className="max-xl:w-[380px] bg-[#392e1e] text-white flex flex-col gap-4">
               <p>
               <span className='font-medium text-base'>En esta gráfica hay tres <span className='font-medium text-base text-yellow-600'>líneas amarillas</span>:</span> <br />
                  1. La primera es el <span className='font-medium'>margen bruto</span>, el % que queda después de restarle costos directos a las ventas. <br />
                  2. La segunda es el <span className='font-medium'>margen operativo</span>, el % que viene al restarle los gastos indirectos a las ventas. <br />
                  3. La tercera es el <span className='font-medium'>margen neto</span>, igual que la gráfica anterior es el % que queda al final de restarle todo a las ventas.
               </p>
             </TooltipContent>
           </Tooltip>
         </TooltipProvider>
    );
  };
  
  export default MarginsTooltip;
  