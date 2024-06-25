// components/SubscriptionButton.js
import { useState } from 'react';
import { Button } from '../button';

export default function SubscriptionButton() {
  const [loading, setLoading] = useState(false);

  const handleSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mercadopago/create-subscription-plan', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log('Plan created:', data);
      // Aquí deberías manejar la respuesta. Por ejemplo:
      // if (data.id) {
      //   // Almacena el ID del plan y redirige al usuario
      //   // a una página donde pueda suscribirse a este plan específico
      // }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

return (
    <Button 
        onClick={handleSubscription} 
        disabled={loading}
        // style={{
        //     padding: '10px 20px',
        //     backgroundColor: '#007bff',
        //     color: '#fff',
        //     border: 'none',
        //     borderRadius: '5px',
        //     cursor: 'pointer',
        // }}
    >
        {loading ? 'Creando plan...' : 'Crear plan de suscripción'}
    </Button>
);
}