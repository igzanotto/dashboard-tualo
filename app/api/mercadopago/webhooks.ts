import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
    const { action, data } = req.body;

    console.log('Received webhook:', action, data);
    // Verifica la autenticidad de la notificación (implementa esto según la documentación de MP)
    // if (!isValidNotification(req)) {
    //   return res.status(401).end();
    // }

    try {
      switch (action) {
        case 'payment.created':
        case 'payment.updated':
          await handlePayment(data);
          break;
        case 'subscription.created':
        case 'subscription.updated':
          await handleSubscription(data);
          break;
        // Añade más casos según sea necesario
      }

      res.status(200).end();
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Error processing webhook' });
    }
}

async function handlePayment(paymentData: any) {
    console.log('Payment data:', paymentData);
    return
    const { data, error } = await supabase
      .from('payments')
      .upsert({
        external_id: paymentData.id,
        status: paymentData.status,
        amount: paymentData.transaction_amount,
        user_id: paymentData.payer.id,
        // Añade otros campos según sea necesario
      }, {
        onConflict: 'external_id'
      });
  
    if (error) throw error;
    return data;
  }
  
  async function handleSubscription(subscriptionData: any) {
    console.log('Subscription data:', subscriptionData);
    return
    const { data, error } = await supabase
      .from('subscriptions')
      .upsert({
        external_id: subscriptionData.id,
        status: subscriptionData.status,
        user_id: subscriptionData.payer_id,
        // Añade otros campos según sea necesario
      }, {
        onConflict: 'external_id'
      });
  
    if (error) throw error;
    return data;
  }