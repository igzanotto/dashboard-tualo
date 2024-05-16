"use client";

import React, { useState } from 'react';
import Chart from 'react-apexcharts';


const MyChart: React.FC = () => {
  const [chartSeries, setChartSeries] = useState([
    {
      data: [
        { x: 'Venta', y: [0, 285.6] },
        { x: 'Venta Total', y: [0, 285] },
        { x: 'Costo Principal', y: [285, 74.6] },
        { x: 'Otros Costos', y: [74.6, 28] },
        { x: 'Utilidad Bruta', y: [0, 182.4] },
        { x: 'Gastos Principales', y: [182.4, 65.7] },
        { x: 'Otros Gastos', y: [65.7, 22.4] },
        { x: 'Utilidad Operativa', y: [0, 91.3] },
        { x: 'Gastos Financieros Totales', y: [91.3, 9.4] },
        { x: 'Utilidad Neta', y: [0, 81.9] }
      ]
    }
  ]);

  const chartOptions: any = {
    chart: {
      type: 'rangeBar',
      height: 350,
      toolbar: {
        show: false
      }
    },
   
    dataLabels: {
      enabled: true,
      formatter: function (val: [number, number]) {
        if (Array.isArray(val) && val.length === 2) {
          return `$${val[1]}`;
        } else {
          return val;
        }
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#304758']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
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
      max: 300,
      tickAmount: 7,
      labels: {
        formatter: function (val: number | undefined) {
          if (typeof val === 'number') {
            return `$${val.toFixed(0)}`;
          } else {
            return '';
          }
        }
      },
    },
    xaxis: {
      categories: chartSeries[0].data.map((point: { x: string }) => point.x)
    }
  };

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