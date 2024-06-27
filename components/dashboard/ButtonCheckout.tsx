'use client';

function ButtonCheckout({ priceId }: { priceId: string }) {
  return (
    <button
      className="rounded bg-sky-500 px-4 py-2 text-white"
      onClick={async () => {
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          body: JSON.stringify({
            priceId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        window.location.href = data.url;
      }}
    >
      Suscribirse
    </button>
  );
}

export default ButtonCheckout;
