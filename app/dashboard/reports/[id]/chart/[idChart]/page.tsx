import ChartEmbed from '@/components/charts/ChartEmbed';
import { fetchChartById } from '@/lib/data';

export default async function ChartPage({
  params,
}: {
  params: { idChart: string };
}) {
  const { idChart } = params;
  const chart = await fetchChartById(idChart);
  console.log(chart);
  

  return (
    <div>
      <h1>Detalles del Gráfico</h1>
      <p>Report ID: {chart.report_id}</p>
      <p>Chart ID: {idChart}</p>
      {/* Aquí puedes renderizar más detalles del gráfico */}
      <div>
        <h2>{chart.type}</h2>
        <div>
          <ChartEmbed src={chart.graphy_url} />
        </div>
        <div>
          {chart.insights && (
            <div>
              <h3>Insights</h3>
              <p>{chart.insights}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
