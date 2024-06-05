// BarChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
}

const VentasChart: React.FC<ChartProps> = ({ series, categories }) => {
    const options = {
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top' // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val: number) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: categories,
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function (val: number) {
              return val + "%";
            }
          }
        },
        title: {
        //   text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default VentasChart;
