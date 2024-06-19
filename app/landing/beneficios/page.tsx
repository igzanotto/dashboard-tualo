import CheckIcon from '@/components/landing/components/Icons/CheckIcon';
import '../globals.css'

import Link from 'next/link';


export default function BeneficiosPage(){
    return (
      <div id='beneficios' className="bg-white pt-24  md:py-36 ">
        <div>
          <p className="text-5xl font-semibold text-center pb-6 max-lg:text-3xl bg-gradient-to-r from-[#0065A1] to-[#00AE8D] bg-clip-text text-transparent">
            ¿Qué beneficios tendré?
          </p>
        </div>
        <div className="w-[50%] mx-auto justify-center items-center bgBeneficios mt-16 rounded-3xl max-md:w-[95%]">
          <div className="mx-auto">
            <div className="flex flex-col gap-3 p-5">
                <div data-aos="fade-right" className="flex items-center gap-2 bgBeneficio text-white rounded-2xl p-4">
                    <CheckIcon/>
                    <p className="ml-9">Reporte financiero mensual</p>
                </div>
                <div data-aos="fade-right" className="flex items-center gap-2 bgBeneficio text-white rounded-2xl p-4">
                    <CheckIcon/>
                    <p className="ml-9">Visibilidad gráfica y simple de tu situación financiera</p>
                </div>
                <div data-aos="fade-right" className="flex items-center gap-2 bgBeneficio text-white rounded-2xl p-4">
                    <CheckIcon/>
                    <p className="ml-9">Fácil interpretación de tus números, aún sin saber de finanzas</p>
                </div>
                <div data-aos="fade-right" className="flex items-center gap-2 bgBeneficio text-white rounded-2xl p-4">
                    <CheckIcon/>
                    <p className="ml-9">Recomendaciones estratégicas accionables para mejorar tu negocio</p>
                </div>
                <div data-aos="fade-right" className="flex items-center gap-2 bgBeneficio text-white rounded-2xl p-4">
                    <CheckIcon/>
                    <p className="ml-9">suscripción mensual a un precio increíble</p>
                </div>
                <div data-aos="fade-right" className="flex items-center gap-2 bgBeneficio text-white rounded-2xl p-4">
                    <CheckIcon/>
                    <p className="ml-9">Liberarte del estrés de tus finanzas, y así tú a lo tuyo</p>
                </div>
                <Link href={"https://calendly.com/jorge-tualo/business-initial-interview"} target="_blank" className="bg-[#ff6c0e] p-3 text-center text-white text-lg rounded-xl font-semibold hover:bg-[#ff9655] transition-all">
                    ¡Quiero probarlo!
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
}