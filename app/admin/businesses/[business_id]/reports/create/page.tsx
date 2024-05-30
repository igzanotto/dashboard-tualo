'use client';

import { Button } from '@/components/button';
import { createReport } from '@/lib/actions';
import { useState } from 'react';

interface FormData {
  QA_prompt: string;
  QA_transcript: string;
  QA_close: string;
}

export default function CreateReportPage({ params }: { params: any }) {
  const { business_id } = params;
  console.log('business_id', business_id);
  
  const [statusMessage, setStatusMessage] = useState('');
  const [threadId, setThreadId] = useState('');

  const [formData, setFormData] = useState<FormData>({
    QA_prompt:
      'Este es el formulario que completo mi cliente con informacion relevante de su empresa',
    QA_transcript: `1. ¿Cómo te llamas y cuál es tu posición en la empresa?
    Ana Carolina Salcedo, dueña
    2. ¿Cuál es el nombre de tu empresa y en qué industria o sector opera?
    Amïn Condesa
    sector alimenticio
    3. Pensando en el modelo de negocios de tu empresa, ¿qué tipo de empresa tienes? Escribe solo la letra que más se ajuste a tu empresa:
    **a. Venta de bienes tangibles (como minoristas, restaurantes, o fabricantes)**
    b. Prestación de servicios (como consultoría, educación, salud)
    ****c. Productos de software y tecnología (empresas como SaaS o hardware)
    d. Bienes raíces y construcción
    ****e. Instituciones financieras (que ganan dinero a través de intereses de préstamos e inversiones)
    f. Empresas de energía y servicios públicos (que venden electricidad, agua, gas, etc.)
    4. ¿Podrías describir brevemente tu modelo de negocio y cómo haces dinero? ¿Qué tipo de bienes o servicios ofreces? Si son más de un bien o servicio, por favor haz una lista completa.
    Ofrezco café, pan dulce y pan salado, bebidas frías y calientes, tisanas, desayunos y tapas o sándwiches, además estoy haciendo mi nueva línea de productos: croissants rellenos (dulces y salados)
    básicamente vendemos bebidas y comida en mi cafetería
    5. ¿Podrías describir tu target de clientes? ¿A qué segmentos estás dirigido?
    doble A, no tanto triple A
    edades: quiero acaparar el mercado juvenil pero aun no lo tengo, de licenciatura en adelante
    6. Podrías describir el manejo de cuentas bancarias en tu empresa: ¿Tienen una o varias cuentas dedicadas? ¿Utilizan tarjetas de crédito de la empresa, realizan operaciones en efectivo frecuentemente, etc.? ¿Usas algún software de ventas? Si tienes más de una cuenta, haz una lista de todas mencionando el banco y qué tipo de uso le dan.
    uso un software de venta, sistema operativo, que se llama AMDIT
    hay dos cuentas bancarias: 
    - Santander: la uso para darles tarjeta a empleados y se hacen compras en Costco y Sam’s
    - Inbursa: es mi cuenta principal, y la tengo porque la terminal cobra las menores comisiones, también para compras en Walmart, la abrí en junio de este año
    opero con tarjetas de crédito, tengo terminal de Inbursa
    el efectivo que ingresamos se usa para pagar algunos insumos y caja chica
    7. ¿Tienes algún tipo de deuda o financiamiento? Si sí, describe brevemente las condiciones (plazo, fecha de contratación, monto inicial, tasa de interés, tipo de interés, quién fue el prestador, etc).
    sí, un crédito con Santander ligado a la cuenta del negocio
    monto: 1mdp
    originación: nov 2022, renovado en julio 2023
    crédito de pymes
    tasa de interés variable: me habían ofrecido 18.9% pero varía dependiendo la tasa de referencia
    me lo cobran mensualmente a mi cuenta fiscal, $25,138.34 pago cada mes de capital y el interés varía
    plazo: 48 meses a partir de julio 2023
    8. ¿Cómo describirías el nivel de estrés financiero que tu empresa está experimentando actualmente? ¿Qué lo está causando y cómo planean manejarlo?
    de agosto a septiembre hubo una variación a la baja de 10%
    de mayo a junio aprox una baja de 15%
    es decir, de mayo a septiembre, aprox ha bajado 25%
    lo está causando el estrés económico general del país, y no he tocado los precios hace un año, tengo que modificarlos y también tengo que innovar con mi nueva línea de productos y con servicio enfocado más hacia la tarde/noche (tengo bien cubierto lo de la mañana y mediodía con los productos que vendo); planeo incorporar alcohol hasta las 5pm 
    9. ¿Cuál es la meta financiera más importante para tu empresa actualmente? Por favor, elige una de las siguientes opciones, explicando porqué la elegiste.
    **a. "Necesito vender más o gastar menos": Puede ser que quieras aumentar tus ingresos, ya sea encontrando más clientes, vendiendo más productos o servicios, o reduciendo tus gastos actuales.**
    b. "Necesito más dinero en el banco": Podría ser que quieras mejorar tu flujo de efectivo o tener más ahorros para emergencias o futuras inversiones.
    c. "Necesito obtener un préstamo o encontrar inversionistas": Para algunas empresas pequeñas, un objetivo clave puede ser obtener financiamiento externo.
    **d. "Necesito crecer mi negocio": Esto podría implicar contratar más personal, abrir una nueva sucursal, o expandir tu oferta de productos o servicios.**
    e. "Otro": 
    justificación: tengo ambas, porque sí necesito cubrir tardes y noche de venta, aumentar la venta, en función de los productos que ofrezco ya que el local está muy bien ubicado y hay afluencia. hay un restaurante al lado muy grande y variado pero yo tengo lo que ellos no tienen. y claro: me encantaría replicarlo, pero lo haría con algo más establecido (con una cocina, etc), acá me aventé más pronto pero ya tengo más aprendida la línea para uno nuevo
    10. Bonus: ¿algo más que creas relevante añadir?
    - soy persona física con actividad empresarial, y manejo otros negocios (manejo departamentos en renta en Tulúm)
    - sé que lo que necesito es un menú con imágenes más atractivas y que el cliente vea lo que vendo, que sea vistoso y que le de opciones al cliente para decidir
    - necesito saber los costos que varían de mis recetas para en función a eso ir variando los precios de mis productos, porque sé que ahorita ya me rebasaron los costos vs mis precios
    - necesito llevar un inventario más estrictamente para que genere la menor merma, un control de inventarios`,
    QA_close: 'hazme un resumen de esto',
  });


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Creando hilo...');

    try {
      const generateThreadResponse = await fetch('/api/thread/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ business_id }),
      });

      if (!generateThreadResponse.ok) {
        throw new Error('Error al enviar el formulario');
      }

      const threadResult = await generateThreadResponse.json();
      const threadId = threadResult.thread.id;
      setThreadId(threadId);

      setStatusMessage('Hilo creado con éxito');

      console.log('Thread generado con éxito', threadResult);

      setStatusMessage('Agregando mensaje al hilo...');

      const runMessageResponse = await fetch('/api/message/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content:
            formData.QA_prompt + formData.QA_transcript + formData.QA_close,
          threadId,
        }),
      });

      if (!runMessageResponse.ok) {
        throw new Error('Error al agregar mensaje al thread');
      }

      const messageResult = await runMessageResponse.json();
      setStatusMessage('Mensaje agregado con éxito');
      console.log('Mensaje creado con éxito', messageResult);
      
    } catch (error: any) {
      console.error(error.message);
    } 
  };

  const handleRetrieveThreadMessages = async (e: React.FormEvent) => {
    e.preventDefault();
    const business_resume = document.getElementById('business_resume');

    const response = await fetch(`/api/thread/retrieve?threadId=${threadId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error al obtener mensajes');
      return;
    }

    const result = await response.json();
    console.log('Mensajes obtenidos con exito', result);

    const responseBusinessResume = result.messagesData[1].content;

    if (!business_resume) {
      return;
    }

    business_resume.innerHTML = responseBusinessResume;
  };

  return (
    <main>
      <div className="mt-3 ">
        <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
          Generador de Reportes
        </h2>
        <textarea
          name="QA_prompt"
          value={formData.QA_prompt}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <textarea
          name="QA_transcript"
          value={formData.QA_transcript}
          onChange={handleChange}
          rows={12}
          className="w-full rounded-md border-2 border-blue-400 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
          placeholder=">>> ingresar el transcript del Q&A <<<"
        />
        <textarea
          name="QA_close"
          value={formData.QA_close}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border-2 border-blue-400 bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />

        <div className="my-2 flex justify-between">
          <Button onClick={handleRun}>
            Ejecutar
          </Button>
          <p>{statusMessage}</p>
          <Button onClick={handleRetrieveThreadMessages}>
            obtener mensajes
          </Button>
          <input
            type="text"
            defaultValue={threadId}
            name="thread_id"
            className="border-2 border-blue-400"
          />
        </div>
        

        <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
          Resumen de la empresa
        </h2>
        <form action={createReport}>
          <textarea
            rows={9}
            id="business_resume"
            name="business_resume"
            className="w-full rounded-md border-2 border-blue-400 px-3  py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="text"
            name="business_id"
            defaultValue={business_id}
            hidden
          />
          <div className="space-between my-2 flex items-center justify-around">
            <select
              name="month"
              className="w-1/2 rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Seleccione un mes</option>
              <option value="Enero">Enero</option>
              <option value="Febrero">Febrero</option>
              <option value="Marzo">Marzo</option>
              <option value="Abril">Abril</option>
              <option value="Mayo">Mayo</option>
              <option value="Junio">Junio</option>
              <option value="Julio">Julio</option>
              <option value="Agosto">Agosto</option>
              <option value="Septiembre">Septiembre</option>
              <option value="Octubre">Octubre</option>
              <option value="Noviembre">Noviembre</option>
              <option value="Diciembre">Diciembre</option>
            </select>
            <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
              crear en DB
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
