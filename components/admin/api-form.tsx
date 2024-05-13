import { useState } from 'react';

interface FormData {
  text: string;
}

const ApiForm = () => {
  const [formData, setFormData] = useState<FormData>({ text: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ApiForm;
