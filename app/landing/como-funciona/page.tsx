

import DashboardMobile from '@/components/landing/components/Animation/Dashboard';
import '../globals.css'
import CallToAction from '@/components/landing/components/Buttons/CallToAction';


export default function ComoFuncionaPage(){
    return (
      <div className="py-36 max-md:py-28" id="solucion">
        <div className="flex items-center justify-between max-lg:px-4 mx-auto max-lg:justify-center xl:w-[95%]">
          <div className="flex flex-col gap-10 lg:pl-10">
            <p className="text-5xl font-semibold mb-6 max-lg:text-3xl text-white max-lg:text-center">
              ¿Cómo funciona?
            </p>

            <div className="flex items-center" data-aos="fade-right">
              <div
                className="bgNumbers"
                
              >
                <span className="text-[#0065A1] font-semibold text-5xl">1</span>
              </div>
              <div className="ml-20 text-white lg:text-xl font-semibold flex flex-col gap-2">
                <p>Agenda una llamada con un expertx de nuestro equipo.</p>
              </div>
            </div>

            <div className="flex items-center" data-aos="fade-right" data-aos-delay="200">
              <div className="bgNumbers">
                <span className="text-[#0065A1] font-semibold text-5xl">2</span>
              </div>
              <p className="ml-20 text-white lg:text-xl font-semibold">
                Mándanos tus estados de cuenta bancarios en PDF.
              </p>
            </div>

            <div className="flex items-center" data-aos="fade-right" data-aos-delay="400">
              <div className="bgNumbers">
                <span className="text-[#0065A1] font-semibold text-5xl">3</span>
              </div>
              <p className="ml-20 text-white font-semibold lg:text-xl">
                Nos contactamos para revisar tus numeros e información.
              </p>
            </div>

            <div className="flex items-center" data-aos="fade-right" data-aos-delay="600">
              <div className="bgNumbers">
                <span className="text-[#0065A1] font-semibold text-5xl">4</span>
              </div>
              <p className="ml-20 text-white font-semibold lg:text-xl">
                ¡Te entregamos tu reporte personalizado con gráficas y
                recomendaciones <br className="max-lg:hidden" /> en menos de 72
                horas!
              </p>
            </div>

          </div>
          <div className="max-lg:hidden">
            <DashboardMobile />
          </div>
        </div>
        <div className="flex justify-center pt-20">
          <CallToAction/>
        </div>
      </div>
    );
}