import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request: Request) {
  const { priceId } = await request.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
  });
  const successUrl = process.env.SUCCESS_URL;
  const cancelUrl = process.env.CANCEL_URL;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return NextResponse.json({
    url: session.url,
  });
}
