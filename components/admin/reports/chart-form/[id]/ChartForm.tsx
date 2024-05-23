

export default function ChartForm({
  params,
}: {
  params: { id: string };
}) {
  
  const reportId = params.id;

  return (
    <div className="flex flex-col gap-6 justify-center xl:w-[70%] mx-auto">
      <h1>Crear Gráfico para Reporte {reportId}</h1>
      <form action="" className="flex flex-col gap-4">
        <input type="text" placeholder='Url del gráfico' className="p-2 rounded-xl"/>
        <button type="submit" className="p-3 rounded-xl bg-blue-500 text-white font-semibold">Crear gráfico</button>
      </form>
    </div>
  );
}
