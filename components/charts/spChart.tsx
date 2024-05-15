// Importar paquetes necesarios
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const MyChart = () => {
  // Definir estado para opciones del gráfico y datos
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'rangeBar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    dataLabels: {
      enabled: true
    },
    colors: ['#FF5733', '#33FF57', '#7364BE', '#090715'] // Colores personalizados

  });

  const [chartSeries, setChartSeries] = useState([
    {
      data: [
        { x: 'Team A', y: [1, 5] },
        { x: 'Team B', y: [4, 6] },
        { x: 'Team C', y: [5, 8] },
        { x: 'Team D', y: [3, 11] }
      ]
    },
    {
      data: [
        { x: 'Team A', y: [2, 6] },
        { x: 'Team B', y: [1, 3] },
        { x: 'Team C', y: [7, 8] },
        { x: 'Team D', y: [5, 9] }
      ]
    }
  ]);

  // Renderizar el componente del gráfico
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="rangeBar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default MyChart;
