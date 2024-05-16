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
    // colors: ['#FF5733', '#33FF57', '#7364BE', '#090715'] // Colores personalizados

  });

  const [chartSeries, setChartSeries] = useState([
    {
      data: [{
        x: 'TEAM A',
        y: [0, 96],
        strokeColor: '#775DD0'
      },
      {
        x: 'TEAM B',
        y: [96, 78]
      },
      {
        x: 'TEAM C',
        y: [78, 56]
      },
      {
        x: 'TEAM D',
        y: [0, 96]
      },
      {
        x: 'TEAM E',
        y: [96, 78]
      },
      {
        x: 'TEAM F',
        y: [78, 56]
      }]
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
