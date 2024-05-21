"use client"

import { Select } from '@headlessui/react'
import React, { useState } from 'react';
import DataInput from '../charts/DataInput';
import VentasStacked from '../charts/VentasStacked';
import VentasChart from '../charts/VentasChart';
import CostosGastosChart from '../charts/GastosCostosChart';
import MargenYUtilidadChart from '../charts/MargenYUtilidadChart';
import MargenesChart from '../charts/MargenesChart';
import GastosDesglosadosChart from '../charts/GastosDesglosadosChart';



const App: React.FC = () => {
  const [chartData, setChartData] = useState<{ series: { name: string; data: number[] }[]; categories: string[] } | null>(null);
  const [chartType, setChartType] = useState('ventas');

  const handleDataSubmit = (data: { series: { name: string; data: number[] }[]; categories: string[] }) => {
    setChartData(data);
  };
  const handleChartTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    if (!chartData) {
      return null;
    }
    switch (chartType) {
      case 'ventas-stacked':
        return <VentasStacked series={chartData.series} categories={chartData.categories} />;
      case 'ventas':
        return <VentasChart series={chartData.series} categories={chartData.categories} />;
      case 'costos-gastos':
        return <CostosGastosChart series={chartData.series} categories={chartData.categories} />;
      case 'margen-utilidad':
        return <MargenYUtilidadChart series={chartData.series} categories={chartData.categories} />;
      case 'margenes':
        return <MargenesChart series={chartData.series} categories={chartData.categories} />
      case 'gastos-desglosados':
        return <GastosDesglosadosChart series={chartData.series} categories={chartData.categories}/>
        default:
        return null;
    }
  };

  return (
    <div>
      <h1>Generar Gráfico desde Google Sheets</h1>
      <div className='my-10'>
      <Select id="chartType" value={chartType} onChange={handleChartTypeChange} name="status" aria-label="Project status" placeholder='Seleccione el tipo de gráfica' className="rounded-lg">
        <option value="ventas-stacked">Gráfica de ventas stacked</option>
        <option value="ventas">Gráfica de ventas</option>
        <option value="costos-gastos">Gráfica de costos y gastos</option>
        <option value="margenes">Gráfica de margenes</option>
        <option value="margen-utilidad">Gráfica de margen y utilidad neta</option>
        <option value="gastos-desglosados">Gráfica de gastos desglosados</option>
      </Select>
      </div>
      <DataInput onDataSubmit={handleDataSubmit} />
      {renderChart()}
    </div>
  );
};

export default App;
