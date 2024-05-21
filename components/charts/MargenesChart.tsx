// MarginProfitChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
}

const MargenesChart: React.FC<ChartProps> = ({ series, categories }) => {
    const options: any = {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: categories,
        }
      }

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default MargenesChart;
