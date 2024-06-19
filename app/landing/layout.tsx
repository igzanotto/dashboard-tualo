import { Inter, Poppins } from "next/font/google";

import type { Metadata } from 'next'
import "./globals.css";
import Nav from "@/components/landing/components/navbar/Nav";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({subsets:["latin"], weight:["100", "200", "300", "400", "500"]})


export const metadata: Metadata = {
  title: "Tualo",
  description: "Maneja las finanzas de tu negocio sin hacerte bolas",
  metadataBase: new URL("https://www.tualo.mx/")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta property="og:image" content="https://res.cloudinary.com/drsrva2kp/image/upload/v1715901071/logo_xk117r.png" />
      <body className={poppins.className}>
          <Nav/>
          {children}
        </body>
    </html>
  );
}
