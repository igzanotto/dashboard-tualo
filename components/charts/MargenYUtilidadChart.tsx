// MarginProfitChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface ChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
}

const MargenYUtilidadChart: React.FC<ChartProps> = ({ series, categories }) => {
  const options: any = {
    chart: {
      height: 350,
      type: 'line'
    },
    stroke: {
      width: [0, 4]
    },
    title: {
      text: 'Traffic Sources'
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: categories,
    xaxis: {
      type: 'datetime'
    },
    yaxis: [
      {
        title: {
          text: 'Website Blog'
        }
      },
      {
        opposite: true,
        title: {
          text: 'Social Media'
        }
      }
    ]
  };

  return (
    <div>
      <Chart 
        options={options} 
        series={series} 
        type="line" 
        height={350} 
    />
    </div>
  );
};

export default MargenYUtilidadChart;
