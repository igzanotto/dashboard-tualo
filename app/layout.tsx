import { Inter, Poppins } from "next/font/google";
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({subsets:["latin"], weight:["100", "200", "300", "400", "500"]})

export const metadata: Metadata = {
  title: "Tualo Dashboard",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`antialiased`}>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}