import { NextResponse } from "next/server";


export  async function POST(req: Request) {
 
    try {
        const response = await fetch('https://api.mercadopago.com/preapproval_plan', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            reason: "Tualo - mensual",
            auto_recurring: {
              frequency: 1,
              frequency_type: "months",
              repetitions: 12,
              billing_day: 5,
              billing_day_proportional: true,
              free_trial: {
                frequency: 1,
                frequency_type: "months"
              },
              transaction_amount: 10,
              currency_id: "MXN"
            },
            payment_methods_allowed: {
              payment_types: [{}],
              payment_methods: [{}]
            },
            back_url: "https://www.tualo.mx"
          })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error creating subscription plan:', error);
      }
    }