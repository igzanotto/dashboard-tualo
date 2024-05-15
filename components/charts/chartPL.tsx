"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartPL: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null); // Ref to store the canvas element

  useEffect(() => {
    let ctx: CanvasRenderingContext2D | null = null;

    if (chartRef.current) {
      // Get the canvas context
      ctx = chartRef.current.getContext('2d');

      // Sample data
      // const data = {
      //   labels: ['Venta', 'Venta Total', 'Costo Principal', 'Otros Costos', 'Utilidad Bruta', 'Gastos Principales', 'Otros Gastos', "Utilidad Operativa", 'Gastos Financieros Totales', 'Utilidad Neta'],
      //   datasets: [{
      //     label: '# of Votes',
      //     data: [285.6, 285, 74.6, 28.6, 182.4, 65.7, 22.4, 91.3, 9.4, 81.9],
          
          
      //     backgroundColor: [
      //       'rgba(76, 48, 197, 0.8)', // #4C30C5
      //       'rgba(57, 174, 255, 0.8)' // #39AEFF
      //     ],
      //     borderColor: [
      //       'rgba(76, 48, 197, 1)', // #4C30C5
      //       'rgba(57, 174, 255, 1)' // #39AEFF
      //     ],
      //     borderWidth: 1
      //   }]
      // };
      const labels = ['Venta', 'Venta Total', 'Costo Principal', 'Otros Costos', 'Utilidad Bruta', 'Gastos Principales', 'Otros Gastos', "Utilidad Operativa", 'Gastos Financieros Totales', 'Utilidad Neta'];
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Venta',
            data: [285.6],
            backgroundColor:  '#008f39',
          },
          {
            label: 'Venta Total',
            data: [285, 260],
            backgroundColor: '#ff0000',
          },
          {
            label: 'Costo Principal',
            data: [-74.6],
            backgroundColor:  '#ff0000',
          },
        ]
      };

      
      const chart = new Chart(ctx!, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Floating Bar Chart'
            }
          },
          // scales: {
          //   y: {
          //     min: 0,
          //     max: 280,
          //     ticks: {
          //       stepSize: 40,
          //       callback: function(value) {
          //         return '$' + value;
          //       }
          //     }
          //   }
          // },
        }
      });

      // Cleanup function to destroy the Chart instance when the component unmounts
      return () => {
        if (chart) {
          chart.destroy();
        }
      };
    }
  }, []);

  return (
    <div className='bg-slate-200 p-3 rounded-xl mt-4'>
      <canvas ref={chartRef} style={{ width: '300px', height: '150px' }}></canvas>
    </div>
  );
};

export default ChartPL;