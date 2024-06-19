import ChartAnimation from "../Animation/HomeAnimation";
import AnimationHome from "../Animation/HomeAnimation";
import Link from "next/link";
import CallToAction from "../Buttons/CallToAction";
import { Poppins } from "next/font/google";

const poppins = Poppins({subsets:["latin"], weight:["100", "200", "300", "400", "500"]})


const Banner = () => {
  return (
    <div className={`flex max-lg:flex-col justify-between lg:px-7 items-center max-md:px-2 pb-20 2xl:justify-around ${poppins.className}`}>
      <div className="mt-[10%] max-lg:mt-[30%] max-sm:mt-[40%] flex flex-col lg:pl-14">
        <h1 className="font-semibold lg:pr-4 max-lg:text-center text-6xl max-xl:text-4xl max-sm:text-3xl bg-gradient-to-r from-slate-50 to-sky-50 bg-clip-text text-transparent pb-5 " style={{lineHeight:1.2}}>
          Maneja las finanzas de tu <br className="max-2xl:hidden" /> negocio <br className="2xl:hidden" /> sin hacerte bolas
        </h1>
        <p className="text-slate-300 max-lg:px-5 font-semibold text-xl max-sm:text-base max-lg:text-center pr-4 mx-auto">
          Obtén visibilidad y control de tus números en una plataforma automatizada <br className="max-2xl:hidden" /> y sácale provecho a las recomendaciones personalizadas para lograr tus metas
        </p>
        <CallToAction/>
      </div>
      <div className="md:mt-[10%] max-lg:hidden">
        <ChartAnimation/>
      </div>
    </div>
  );
}

export default Banner