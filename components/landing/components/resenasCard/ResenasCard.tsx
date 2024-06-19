"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "../../../../app/landing/globals.css"
import "swiper/css";
import "swiper/css/pagination";
import javier from "./javier-tualo.png";
import santiago from "./santiago1.png";
import mujer from "./woman.jpeg";
import CardSliderProps from "./CardSliderProps";
import empty from './empty.png'

const cards = [
  {
    name: "Santiago Fernández",
    enterprise: "Pingüino",
    occupation: "Tienda de Arte Popular",
    description:
      "¡Tualo me ayuda a entender las finanzas de mi negocio con gráficas claras, para tomar decisiones estratégicas con mi socia y lograr mis objetivos!",
    image: santiago,
  },
  {
    name: "Javier Gutiérrez",
    enterprise: "Dos Cien Arqs",
    occupation: "Despacho de Arquitectura y Diseño",
    description:
      "Tualo me ha ayudado a ahorrar tiempo y dinero al automatizar muchas de mis tareas financieras.",
    image: javier,
  },
  {
    name: "Ana Carolina Salcedo",
    enterprise: "Amïn",
    occupation: "Cafetería Local",
    description: "Tualo me dio claridad financiera y me abrió un mundo de oportunidades. Ahora controlo mis finanzas, optimizo gastos y priorizo tareas para ser más exitosa.",
    image: mujer,
  },
];

const ResenasCard = () => {

  return (
    <div className="flex flex-col bg-white py-20 shadow-xl">
      <p className="my-10 text-center font-semibold text-xl sm:text-xl max-sm:px-5 md:text-2xl lg:text-3xl bg-gradient-to-r from-[#0065A1] to-[#00AE8D] bg-clip-text text-transparent">
        ...y lo que opinan de <span className="bg-gradient-to-r from-[#0065A1] to-[#00AE8D] rounded-lg"><span className="text-white px-2 max-md:px-1">tualo</span></span>
      </p>

      <div className="flex justify-center items-center mt-10">
        <div className="w-4/5 max-md:w-5/6">
          <Swiper
          // style={{
          //     "--swiper-pagination-color": "#3946ff",
          //     "--swiper-pagination-bullet-inactive-color": "#999999",
          //     "--swiper-pagination-bullet-inactive-opacity": "1",
          //     "--swiper-pagination-bullet-size": "12px",
          //     "--swiper-pagination-bullet-horizontal-gap": "6px"
          // }}
            navigation={true}
            autoplay={{
              delay:4000
            }}
            loop={true}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {cards.map((card, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center pb-14"
              >
                <div className="flex justify-center">
                  <CardSliderProps
                    key={card.name}
                    name={card.name}
                    enterprise={card.enterprise}
                    image={card.image}
                    description={card.description}
                    occupation={card.occupation}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ResenasCard;
