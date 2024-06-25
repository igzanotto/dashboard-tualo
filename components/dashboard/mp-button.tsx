import React, { useEffect } from 'react';

interface MercadoPagoSubscriptionButtonProps {
  planId: string;
}

declare global {
  interface Window {
    $MPC_loaded?: boolean;
  }
}

const MercadoPagoSubscriptionButton: React.FC<
  MercadoPagoSubscriptionButtonProps
> = ({ planId }) => {
  useEffect(() => {
    const loadMPScript = () => {
      if (!window.$MPC_loaded) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://secure.mlstatic.com/mptools/render.js';
        document.body.appendChild(script);
        window.$MPC_loaded = true;
      }
    };

    loadMPScript();

    const handleMessage = (event: MessageEvent) => {
      console.log('Received message:', event.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <a
      href={`https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=${planId}`}
      id="MP-payButton"
      style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }}
    >
      Suscribirme
    </a>
  );
};

export default MercadoPagoSubscriptionButton;
