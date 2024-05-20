"use client"

import React, { useState } from 'react';
import DataInput from '../charts/DataInput';
import Chart from '../charts/StackedBar';


const App: React.FC = () => {
  const [chartData, setChartData] = useState<{ series: { name: string; data: number[] }[]; categories: string[] } | null>(null);

  const handleDataSubmit = (data: { series: { name: string; data: number[] }[]; categories: string[] }) => {
    setChartData(data);
  };

  return (
    <div>
      <h1>Generar Gráfico desde Google Sheets</h1>
      <DataInput onDataSubmit={handleDataSubmit} />
      {chartData && <Chart series={chartData.series} categories={chartData.categories} />}
    </div>
  );
};

export default App;
