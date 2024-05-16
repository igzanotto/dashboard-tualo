"use client";


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
    yaxis: {
      min: 0,
      max: 280,
      tickAmount: 8, // Ajusta la cantidad de marcas en el eje Y según lo necesites
      labels: {
        formatter: function(val:any) {
          return "$" + val.toFixed(0); // Añade el símbolo de dólar y redondea el valor
        }
      }
    }
  });

//   const labels = ['Venta', 'Venta Total', 'Costo Principal', 'Otros Costos', 'Utilidad Bruta', 'Gastos Principales', 
//   'Otros Gastos', "Utilidad Operativa", 'Gastos Financieros Totales', 'Utilidad Neta'];
// data: [285.6, 285, 74.6, 28.6, 182.4, 65.7, 22.4, 91.3, 9.4, 81.9]

  const [chartSeries, setChartSeries] = useState([
    {
      data: [{
        x: 'Venta',
        y: [0, 285.6],
        strokeColor: '#775DD0'
      },
      {
        x: 'Venta Total',
        y: [0, 285]
      },
      {
        x: 'Costo Principal',
        y: [285, 74.6]
      },
      {
        x: 'Otros Costos',
        y: [74.6, 28.6]
      },
      {
        x: 'Utilidad Bruta',
        y: [0, 182.4]
      },
      {
        x: 'Gastos Principales',
        y: [182.4, 65.7]
      },
      {
        x: 'Otros Gastos',
        y: [65.7, 22.4]
      },
      {
        x: "Utilidad Operativa",
        y: [0, 91.3]
      },
      {
        x: "Gastos Financieros Totales",
        y: [91.3, 9.4]
      },
      {
        x: "Utilidad Neta",
        y: [0, 81.9]
      }
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
