import ButtonCheckout from "@/components/dashboard/ButtonCheckout";
import { Stripe } from "stripe";

async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const prices = await stripe.prices.list();
  const sortedPrices = prices.data.sort(
    (a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0)
  );
  return sortedPrices;
}

async function PricingPage() {
  const prices = await loadPrices();
  console.log(prices);
  const price = prices[0];

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        
              <ButtonCheckout priceId={price.id} />
           

    
      </div>
    </div>
  );
}

export default PricingPage;
