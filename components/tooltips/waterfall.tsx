import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

const WaterfallTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon width={20} height={20} />
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-4 bg-[#252525] text-white max-xl:w-[380px]">
          <p>
            <span className="text-base font-medium">
              Esta gráfica se lee de izquierda a derecha:
            </span>{' '}
            <br />
            1. Primero tiene todos tus{' '}
            <span className="font-medium">ventas</span> en verde. <br />
            2. A eso se le van restando los costos y gastos en rojo. <br />
            3. El resultado de cada resta es una{' '}
            <span className="font-medium">utilidad</span> en gris. <br />
            <div className="ml-5">
              a. Primero se restan los{' '}
              <span className="font-medium">costos directos</span>, que son los
              directamente relacionados a la venta, y te queda la{' '}
              <span className="font-medium">utilidad bruta</span>. <br />
              b. Después los{' '}
              <span className="font-medium">gastos indirectos</span>, no
              directamente relacionados pero que se necesitan para operar (como
              la renta, por ejemplo), y te queda la{' '}
              <span className="font-medium">utilidad operativa</span>. <br />
              c. Por último se restan los{' '}
              <span className="font-medium">gastos financieros</span> (todo lo
              que cobra el banco o el SAT), y te queda la{' '}
              <span className="font-medium">utilidad neta</span>. <br />
            </div>
          </p>
          <p className="text-[#c77d48]">
            Lo que está al final, en naranja, es la UTILIDAD NETA, que es lo que
            realmente ganó o perdió el negocio durante este periodo.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WaterfallTooltip;
