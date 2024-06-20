import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
    
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
    } catch (err) {
        console.error('Error constructing webhook event', err);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    console.log('Received event:', event);

    // Handle the event
    switch (event.type) {
        case 'customer.subscription.created':
            const subscription = event.data.object as Stripe.Subscription;
            console.log('Subscription created:', subscription);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object as Stripe.PaymentMethod;
            console.log('PaymentMethod was attached to a Customer!', paymentMethod.id);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
}