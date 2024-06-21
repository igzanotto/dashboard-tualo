"use client"
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/button';
import { createClient } from '@/utils/supabase/client'; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const SubscribePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('User not authenticated');
        return;
      }

      setUser(user);
    };

    fetchUser();
  }, []);

  const handleClick = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const response = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      }),
    });

    if (!response.ok) {
      console.error('Error creating Stripe session');
      return;
    }

    const { sessionId } = await response.json();
    console.log('sessionId>>', sessionId);

    const stripe = await stripePromise;

    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error('Stripe error:', error);
    }
  };

  return (
    <div>
      <h1>Subscribe to our service</h1>
      <Button onClick={handleClick}>Subscribe</Button>
    </div>
  );
};

export default SubscribePage;
