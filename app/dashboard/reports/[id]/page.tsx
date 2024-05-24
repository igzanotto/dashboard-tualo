import ChartEmbed from '@/components/charts/ChartEmbed';
import ModalDashboard from '@/components/modal/Modal';
import { fetchReportById } from '@/lib/data';
import { FolderIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { GoalIcon, InfoIcon } from 'lucide-react';

export default async function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const report = await fetchReportById(id);

  
  const renderTextFromDatabase = (text: string | undefined) => {
    if (!text) {
      return <p>Vacío</p>;
    }
  
    // Función para aplicar estilos a las palabras específicas
    const applyStyles = (text: string) => {
      return <span className="font-bold text-black">{text}</span>;
    };
  
    // Dividir el texto en párrafos y luego en líneas
    const paragraphs = text.split('\n');
    const formattedParagraphs = paragraphs.map((paragraph, index) => {
      // Dividir el párrafo en líneas
      const lines = paragraph.split('\n');
      const formattedLines = lines.map((line, lineIndex) => {
        const [firstPart, ...rest] = line.split(':');
        const secondPart = rest.join(':').trim(); // Por si hay más de un ":" en la línea
  
        return (
          <div key={lineIndex}>
            {applyStyles(firstPart)}{secondPart && `: ${secondPart}`} <br /> {/* Añadir ":" y segunda parte solo si existe */}
          </div>
        );
      });
  
      return (
        <div key={index}>
          {formattedLines}
        </div>
      );
    });
  
    return (
      <div>
        {formattedParagraphs}
      </div>
    );
  };
  


  return (
    <div className="flex flex-col gap-3">
      <h1 className={`text-2xl`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div>
        <p className="mb-4 text-4xl">{report.business.name}</p>
      </div>
      <div className="flex items-center xl:gap-6 2xl:gap-8 max-xl:flex-wrap gap-5">
        <div className="flex w-[400px] 2xl:h-[180px] xl:h-[200px] max-xl:w-full flex-col gap-3 rounded-xl bg-emerald-500 p-3 shadow-2xl">
          <div className="flex items-center gap-2 text-2xl font-medium text-white">
            <FolderIcon width={30} height={30} />
            <p>Resumen</p>
          </div>
          <p className="font-medium text-zinc-100 w-full">
            En tu resumen verás una descripción detallada de tu negocio donde se abordan diversos aspectos clave.
          </p>
          <ModalDashboard
            name={report.business.name}
            resume={renderTextFromDatabase(report.business_resume)}
          />
        </div>
        {/* bg-gradient-to-r from-[#4C30C5] to-[#39AEFF] */}
        <div className="flex w-[400px] 2xl:h-[180px] xl:h-[200px] max-xl:w-full flex-col gap-3 rounded-xl bg-yellow-500 p-3 shadow-2xl">
          <div className="flex items-center gap-2 text-2xl font-medium text-white">
            <LightBulbIcon width={30} height={30} />
            <p>Recomendaciones</p>
          </div>
          <p className="font-medium text-zinc-100">
            En las recomendaciones verás estrategias clave para mejorar el
            rendimiento y la eficiencia de tu negocio.
          </p>
          <ModalDashboard
            name={report.business.name}
            resume={report.recomendations.map((data: any) => (
              <div>{renderTextFromDatabase(`${data.content}`)}</div>
            ))}
          />
        </div>

        <div className="flex w-[400px] 2xl:h-[180px] xl:h-[200px] max-xl:w-full  flex-col gap-3 rounded-xl bg-[#5a36fa] p-3 shadow-2xl">
          <div className="flex items-center gap-2 text-2xl font-medium text-white">
            <GoalIcon width={30} height={30} />
            <p>Metas financieras</p>
          </div>
          <p className="font-medium text-zinc-100">
            Estas metas son fundamentales para la salud financiera y el crecimiento sostenible del negocio
          </p>
          <ModalDashboard
            name={report.business.name}
            resume={renderTextFromDatabase(report.goals)}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <div className="flex gap-8 max-2xl:flex-wrap max-2xl:justify-between">
          <div className="flex w-[100%] flex-col">
            {/* <p className="mb-4 text-4xl">Resumen</p>
            <div className='bg-slate-50 rounded-xl p-3 w-full'>
                {renderTextFromDatabase(report.business_resume)}
            </div> */}

            {/* <div className="mt-4">
              <p className="mb-4 text-4xl">Recomendaciones</p>
              <div className="rounded-xl bg-slate-50 p-3">
                {report.recomendations.map((data: any) => (
                  <div>{renderTextFromDatabase(`${data.content}`)}</div>
                ))}
              </div>
            </div> */}
          </div>

          <div className="flex w-full flex-col gap-8">
            {/* <div>
              <p className="mb-4 text-4xl">Metas financieras</p>
              <div className="rounded-xl bg-slate-50 p-3">
                {renderTextFromDatabase(report.goals)}
              </div>
            </div> */}
            <div>
              <p className="mb-4 text-4xl">Resumen financiero</p>
              <div className="flex flex-col gap-10">
                {report.charts.map((data: any) => (
                  <div
                    key={data.id}
                    className="w-full rounded-xl bg-slate-50 p-3 "
                  >
                    <p className="mb-4 text-2xl">
                      Grafica:{' '}
                      <span className="font-medium capitalize text-black">
                        {data.type}
                      </span>
                    </p>
                    <div className="flex items-start gap-2">
                      <div className="relative translate-y-0.5">
                        
                      </div>
                        <InfoIcon width={20} height={20}/>
                      <p>
                        Esta gráfica se lee de izquierda a derecha: inicia con
                        ingresos totales, luego se deducen los costos de
                        producción (los que están directamente relacionado con
                        las ventas), revelando la utilidad bruta. A
                        continuación, se restan los gastos operativos (los que
                        son indirectos) para obtener la utilidad operativa. Por
                        último se deducen los gastos financieros, para llegar a
                        la utilidad neta. Las barras verdes suman y las rojas
                        restan, dejando las grises como subtotales.
                      </p>
                    </div>
                    <ChartEmbed src={data.graphy_url} />

                    <div className="mt-4">
                      {renderTextFromDatabase(`${data.insights}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}