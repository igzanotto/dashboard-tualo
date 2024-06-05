import { createStackedChart } from '@/lib/actions';
import React, { useState } from 'react';

interface DataInputProps {
  onDataSubmit: (data: { series: { name: string; data: number[] }[]; categories: string[] }) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onDataSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const lines = inputText.trim().split('\n');
    const categories = lines[0].split('\t').slice(0); // Obtener los meses de la primera línea

    const series = lines.slice(1).map(line => {
      const [name, ...data] = line.split('\t');
      return {
        name,
        data: data.map(Number)
      };
    });
    try {
      await createStackedChart({ series, categories });
      console.log('Datos del gráfico guardados en Supabase', series, categories);
      // Puedes agregar lógica adicional aquí, como limpiar el formulario o mostrar un mensaje de éxito
      
      onDataSubmit({series, categories});
      
    } catch (error) {
      // Maneja errores si la función falla al guardar los datos en Supabase
      console.error('Error al guardar los datos del gráfico en Supabase:', error);
    }
    onDataSubmit({ series, categories });
    console.log({series, categories});
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Pega aquí los datos de Google Sheets"
      />
      <br />
      <button type="submit">Generar Gráfico</button>
    </form>
  );
};

export default DataInput;