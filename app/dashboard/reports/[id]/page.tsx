
import MyChart from '@/components/charts/spChart';
import { fetchReportById } from '@/lib/data';

export default async function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const report = await fetchReportById(id);

  
  const renderTextFromDatabase = (text: string | undefined) => {
  if (text) {
    // Dividir el texto en párrafos
    const paragraphs = text.split('\n');
    const formattedParagraphs = paragraphs.map((paragraph, index) => {
      // Dividir el párrafo en líneas
      const lines = paragraph.split('\n');
      const formattedLines = lines.map((line, lineIndex) => {
        // Dividir la línea en dos partes en función de la presencia de los dos puntos
        const parts = line.split(':');
        const firstPart = parts[0];
        const secondPart = parts.slice(1).join(':').trim(); // Por si hay más de un ":" en la línea

        // Palabras específicas que deben estar en negrita y color negro
        const boldWords = ["Perfil y Rol", "Industria", "Modelo de Negocio", "Clientes Objetivo", "Gestión Financiera", "Deuda", "Estrés Financiero", "Diferenciación de Ventas", "Comunicación y Marketing", "Necesidades y Mejoras", "1. Incrementar las Ventas", "2. Mejorar el Flujo de Efectivo", "3. Crecimiento del Negocio", "Noviembre Destaca", "Tendencia Ascendente", "Importancia de Mantener el Ritmo", "Ingresos Crecientes", "Costos Manejables pero con Espacio para Mejora", "Mejora en la Utilidad Neta", "Disminución de Costos en Diciembre", "Incremento en Gastos", "Promedios como Meta"];

        // Función para aplicar estilos a las palabras específicas
        const applyStyles = (text: string) => {
          return boldWords.includes(text.trim()) ?
            <span className="font-bold text-black">{text}</span> :
            text;
        };

        return (
          <div key={lineIndex}>
            {applyStyles(firstPart)}{secondPart && `: ${secondPart}`} {/* Añadir ":" y segunda parte solo si existe */}
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
  } else {
    return <p>Vacío</p>;
  }
};
  


  return (
    <div className="flex flex-col gap-3">
      <h1 className={`text-2xl`}>
        Reporte de <span className="capitalize">{report.month}</span>
      </h1>
      <div>
        <p className="mb-4 text-4xl">{report.business.name}</p>
      </div>


      {/* <div>
        <p className="mb-4 text-4xl">grafico S&P</p>
        <MyChart />
      </div> */}


      <div className="mt-10 flex flex-col gap-8">
        <div className='flex max-2xl:flex-wrap max-2xl:justify-between gap-8'>

          <div className='flex flex-col w-[100%]'>
            <p className="mb-4 text-4xl">Resumen</p>
            <div className='bg-slate-50 rounded-xl p-3 w-full'>
                {renderTextFromDatabase(report.business_resume)}
            </div>

            <div className='mt-4'>
              <p className="mb-4 text-4xl">Recomendaciones</p>
              <div className='bg-slate-50 rounded-xl p-3'>
              {report.recomendations.map((data:any) => (
                <div>
                  {renderTextFromDatabase(`${data.content}`)}
                </div>
              ))}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8 w-full'>
            <div>
              <p className="mb-4 text-4xl">Metas financieras</p>
              <div className='bg-slate-50 rounded-xl p-3'>
              {renderTextFromDatabase(report.goals)}
              </div>
            </div>
            <div>
              <p className="mb-4 text-4xl">Resumen financiero</p>
              <div className='flex flex-col gap-10'>
                  {report.charts.map((data:any) => (
                    <div key={data.id} className='bg-slate-50 rounded-xl p-3 w-full '>
                      <p className='text-2xl mb-4'>Grafica: <span className='capitalize font-medium text-black'>{data.type}</span></p>
                      <div className='flex items-start gap-2'>
                        <div className='relative translate-y-0.5' >
                          <svg width={20} height={20} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z" fill="white"></path> <path d="M24 12V28" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>
                        <p>
                          Esta gráfica se lee de izquierda a derecha: inicia con ingresos totales, 
                          luego se deducen los costos de producción (los que están 
                          directamente relacionado con las ventas), revelando la utilidad bruta. 
                          A continuación, se restan los gastos operativos (los que son 
                          indirectos) para obtener la utilidad operativa. Por último se deducen 
                          los gastos financieros, para llegar a la utilidad neta. Las barras verdes 
                          suman y las rojas restan, dejando las grises como subtotales.
                        </p>
                      </div>
                      <MyChart/>
                      <div className='mt-4'>
                      
                      {renderTextFromDatabase(`${data.insights}`)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}