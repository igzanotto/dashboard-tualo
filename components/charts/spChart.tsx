"use client";

import Chart from 'react-apexcharts';

const MyChart = () => {
  const chartOptions = {
    chart: {
      type: 'rangeBar',
      height: 350,
      fill: {
        colors: ['#F44336', '#E91E63', '#9C27B0']
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val:any, opts:any) {
          return ("$" + val)
      },
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
      }
    },
    yaxis: {
      min: 0,
      max: 280,
      tickAmount: 7, // Ajusta la cantidad de marcas en el eje Y según lo necesites
      labels: {
        formatter: function(val:any) {
          return "$" + val.toFixed(0); // Añade el símbolo de dólar y redondea el valor
        }
      },
    }
  };

  const chartSeries = [{
    data: [
    {
      x: 'Venta',
      y: [0, 285.6],
    },
    {
      x: 'Venta Total',
      y: [0, 285]
    },
    {
      x: 'Costo Principal',
      y: [285.6, 74.6]
    },
    {
      x: 'Otros Costos',
      y: [74, 28]
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
  }]
    
  

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
