import { DM_Sans, Inter, Montserrat, Poppins, Libre_Baskerville } from "next/font/google";
import { Metadata } from 'next';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"


const montserrat = Montserrat({subsets:["latin"], weight:["100", "200", "300", "400", "500"]})
const libreBaskerville = Libre_Baskerville({subsets:["latin"], weight:["400", "700"]})


export const metadata: Metadata = {
  title: "Tualo Dashboard",
  description: "Maneja las finanzas de tu negocio sin hacerte bolas",
  metadataBase: new URL("https://tualo-dashboard.vercel.app/")
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta property="og:image" content="https://res.cloudinary.com/drsrva2kp/image/upload/v1715901071/logo_xk117r.png" />
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}