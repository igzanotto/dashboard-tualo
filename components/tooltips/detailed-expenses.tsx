import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip';
  import { InfoIcon } from 'lucide-react';
  
  const ExpensesTooltip = () => {
    return (
        <TooltipProvider>
           <Tooltip>
             <TooltipTrigger>
               <InfoIcon width={20} height={20} />
             </TooltipTrigger>
             <TooltipContent className="max-xl:w-[380px] bg-[#252525] text-white flex flex-col gap-4">
               <p>
                <span className='font-medium text-base'>En esta gráfica se ven muchas línea de colores.</span> <br /> 
                Cada una representa un tipo de gasto diferente como sueldos, renta, marketing, etc. y su evolución en cada mes del periodo analizado.
               </p>
             </TooltipContent>
           </Tooltip>
         </TooltipProvider>
    );
  };
  
  export default ExpensesTooltip;
  