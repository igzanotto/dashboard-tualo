'use client';

import Logo from '../Icons/Logo';
import { Navlinks } from '../navlinks/Navlinks';
import { useEffect, useState } from 'react';
import LogoScrolled from '../Icons/LogoScrolled';
import CallToAction from '../Buttons/CallToAction';
import Link from 'next/link';
import LogIn from '../Icons/LogIn';
import CalendarIcon from '../Icons/CalendarIcon';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Poppins } from 'next/font/google';

const poppins = Poppins({subsets:["latin"], weight:["100", "200", "300", "400", "500"]})

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { path: '/#nosotros', text: 'Nosotros' },
    { path: '/#solucion', text: ' Solución' },
    { path: '/#beneficios', text: 'Beneficios' },
    { path: '/#clientes', text: 'Clientes' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed z-50 flex h-[90px] w-full items-center justify-between px-4 transition-colors ${
        isScrolled ? 'h-[90px] bg-white shadow-lg' : 'bg-transparent'
      } ${poppins.className}`}
    >
      <div className="flex justify-center max-[840px]:mx-auto">
        {isScrolled ? <LogoScrolled /> : <Logo />}
      </div>

      <div className="flex items-center gap-12 max-[840px]:hidden">
        {navLinks.map((navlink, index) => (
          <div key={`${navlink}-${index}`}>
            <Navlinks
              className={`${
                isScrolled ? 'text-[#0065A1]' : 'text-white'
              } font-medium text-base hover:underline hover:underline-offset-8`}
              //           // key={navlink.path}
              text={navlink.text}
              path={navlink.path}
            />
          </div>
        ))}
      </div>

      <div className="max-[840px]:hidden">
        <Link
          target="_blank"
          href={'https://calendly.com/jorge-tualo/business-initial-interview'}
          className="flex items-center gap-2 rounded-xl bg-[#ff6c0e] p-2 text-center font-medium text-white transition-all hover:bg-[#ff9655]"
        >
          <CalendarIcon />
          Agenda una llamada
        </Link>
        {/* <Link href={"https://tualo-dashboard.vercel.app/"} target="_blank" className="bg-[#ff6c0e] text-white font-medium w-[170px] p-2 rounded-xl hover:bg-[#ff9655] transition-all text-center flex items-center gap-2">
          <LogIn/>
          Iniciar sesión
       </Link> */}
      </div>

      <div className="min-[840px]:hidden">
        <Sheet key={'right'}>
          <SheetTrigger>
            <Bars3Icon
              width={30}
              height={30}
              color={isScrolled ? '#0065A1' : 'white'}
            />
          </SheetTrigger>
          <SheetContent side={'right'} className="w-full">
            <SheetHeader>
              <LogoScrolled />
              <SheetDescription className="pt-10">
                <div className="flex flex-col items-start gap-4">
                  {navLinks.map((navlink, index) => (
                    <Link
                      key={`${navlink}-${index}`}
                      href={navlink.path}
                      className="rounded-lg bg-gradient-to-r from-[#0065A1] to-[#00AE8D] p-1 px-2 text-center font-medium text-white"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      {navlink.text}
                    </Link>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <Link
                    target="_blank"
                    href={
                      'https://calendly.com/jorge-tualo/business-initial-interview'
                    }
                    className="flex w-[150px] items-center justify-center gap-2 rounded-xl bg-[#ff6c0e] p-2 text-center font-medium text-white transition-all hover:bg-[#ff9655]"
                  >
                    ¡ Quiero probarlo !
                  </Link>
                  {/* <Link
                    href={'https://tualo-dashboard.vercel.app/'}
                    target="_blank"
                    className="flex w-[150px] items-center justify-center gap-2 rounded-xl bg-[#ff6c0e] p-2 text-center font-medium text-white transition-all hover:bg-[#ff9655]"
                  >
                    <LogIn />
                    Iniciar sesión
                  </Link> */}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
