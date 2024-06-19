"use client"

import { useEffect } from "react";

import Aos from "aos";
import 'aos/dist/aos.css'
import '../globals.css'
import ChartPie from "@/components/landing/components/Animation/ChartPie";

export default function QueEsTualoPage (){

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    
    // Verificar si el dispositivo es iOS
    if (isIOS) {
      const iOSVersion = parseFloat(
        ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(userAgent) || [])[1])
          .replace('undefined', '3_2').replace('_', '.').replace('_', '')
      );
      
      // Verificar si la versión de iOS es menor a 12.1
      if (iOSVersion < 12.1) {
        Aos.init({
          disable: true // Deshabilitar AOS si la versión de iOS es menor a 12.1
        });
      } else {
        Aos.init();
      }
    } else {
      Aos.init();
    }
  }, []);

    return (
      <div id="nosotros" className="bg-white pt-36 max-lg:pt-16">
        <div className="flex items-center justify-around bg-white max-lg:flex-wrap max-lg:py-12 mx-auto xl:justify-around">
          <div className="max-lg:hidden">
            <ChartPie />
          </div>
          <div className="flex flex-col max-lg:px-5">
            <p
              data-aos="fade-down"
              className="text-5xl font-semibold text-center mb-6 max-lg:text-3xl bg-gradient-to-r from-[#0065A1] to-[#00AE8D] bg-clip-text text-transparent"
            >
              ¿ Qué es{" "}
              <span className="text-white bg-gradient-to-r from-[#0065A1] to-[#00AE8D] px-2 rounded-xl">
                tualo
              </span>{" "}
              ?
            </p>
            <p
              data-aos="fade-right"
              data-aos-delay="300"
              className="max-lg:text-center text-xl mt-4"
            >
              La plataforma que por fin les dará visibilidad y orden{" "}
              <br className="max-lg:hidden" /> a las finanzas de tu negocio.{" "}
              <br /> <br />
              Con ayuda de inteligencia artificial, Tualo:{" "}
              <br className="max-lg:hidden" />
              <span className="underline bg-gradient-to-r from-[#0065A1] to-[#00AE8D] bg-clip-text text-transparent font-semibold">
                extrae, organiza y traduce
              </span>{" "}
              {""}
              tu información financiera <br className="max-lg:hidden" /> en un
              sencillo dashboard que te dará{" "}
              <span className="">
                visibilidad, claridad y <br className="max-lg:hidden" />{" "}
                recomendaciones personalizadas
              </span>
              .
            </p>
          </div>
        </div>
        <p
          className="mt-5 text-center text-3xl py-36 max-lg:px-1 max-lg:text-2xl max-md:text-xl max-lg:py-14 max-sm:px-3"
          data-aos="fade-right"
          data-aos-delay="1000"
        >
          Porque sabemos que tienes demasiadas cosas que hacer... <br /> con
          Tualo,{" "}
          <span className="font-semibold bg-gradient-to-r from-[#0065A1] to-[#00AE8D] bg-clip-text text-transparent">
            tú a lo tuyo
          </span>
          .
        </p>
      </div>
    );
}