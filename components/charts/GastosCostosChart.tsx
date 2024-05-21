// CostExpenseChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
}

const CostosGastosChart: React.FC<ChartProps> = ({ series, categories }) => {
  const options:any = {
    chart: {
      type: 'bar',
      height: 350,
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return val / 1000 + 'K';
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: ['#000'],
          fontSize: '12px'
        }
      }
    },
    fill: {
      opacity: 1
    },
    colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
    yaxis: {
      labels: {
        formatter: (val: number) => {
          return val / 1000 + 'K';
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default CostosGastosChart;
