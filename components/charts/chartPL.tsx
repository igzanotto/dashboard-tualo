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

      // Sample data[#4C30C5] to-[#39AEFF]
      const data = {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3, 10, 5],
          backgroundColor: [
            'rgba(76, 48, 197, 0.8)', // #4C30C5
            'rgba(57, 174, 255, 0.8)' // #39AEFF
          ],
          borderColor: [
            'rgba(76, 48, 197, 1)', // #4C30C5
            'rgba(57, 174, 255, 1)' // #39AEFF
          ],
          borderWidth: 1
        }]
      };

      // Create a new Chart instance
      const chart = new Chart(ctx!, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            
          }
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

  return <div className='bg-slate-200 p-3 rounded-xl mt-4'>
    <canvas ref={chartRef} style={{ width: '300px', height: '150px' }}></canvas>
  </div>;
};

export default ChartPL;
