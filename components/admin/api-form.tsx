import { useState } from 'react';

interface FormData {
  text: string;
}

const ApiForm = () => {
  const [formData, setFormData] = useState<FormData>({ text: ''});

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })



    if (!response.ok) {
      console.error('Error al enviar el formulario');
      return;
    }

    const result = await response.json();
    console.log('Formulario enviado con éxito', result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Texto:
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className='border border-gray-400 rounded-md w-full p-2 mt-1'
        />
      </label>
      <button type="submit"
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'
      >Enviar</button>
    </form>
  );
};

export default ApiForm;
