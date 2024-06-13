import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip';
  import { InfoIcon } from 'lucide-react';
  
  const SalesTooltip = () => {
    return (
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon width={20} height={20} />
          </TooltipTrigger>
          <TooltipContent className="max-xl:w-[380px] bg-[#223741] text-white flex flex-col gap-4">
            <p>
             En esta gráfica, cada <span className='text-green-700 font-medium'>barra verde</span> son las ventas de cada mes del periodo analizado. <br /> 
             La línea horizontal es el promedio de ventas del periodo, que te sirve para comparar las ventas en cada mes con el promedio general.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  export default SalesTooltip;
  