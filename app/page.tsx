
import Banner from "@/components/landing/components/banner/Banner";
import "./globals.css";
import Waves from "@/components/landing/components/waves/Waves";
import QueEsTualoPage from "./landing/que-es-tualo/page";
import ComoFuncionaPage from "./landing/como-funciona/page";
import NegociosQueHemosAyudadoPage from "./landing/negocios-que-hemos-ayudado/page";
import BeneficiosPage from "./landing/beneficios/page";
import ResenasPage from "./landing/resenas/page";
import FormPage from "./landing/form/page";
import Footer from "./landing/footer/page";
import Nav from "@/components/landing/components/navbar/Nav";



export default function HomePage() {
  return (
    <>
    <Nav/>
      <div className="gradient">
        <div className="h-full w-full">
          <Banner/>
        </div>
        <Waves />
        <QueEsTualoPage/>
        <div className="rotate-180">
            <Waves/>
        </div>
        <ComoFuncionaPage/>
        <Waves/>
        <BeneficiosPage/>
        <NegociosQueHemosAyudadoPage/>
        <ResenasPage/>
        <FormPage/>
        <div className="rotate-180">
            <Waves/>
        </div>
        <Footer/>
      </div>
    </>
  );
}
