'use client';

import { Button } from '@/components/button';
import { createReport } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  start_prompt: string;
  QA_prompt: string;
  QA_transcript: string;
  QA_close: string;
}

export default function CreateReportPage() {
  const business_id = useParams().id;

  const [formData, setFormData] = useState<FormData>({
    // start_prompt:
    //   'voy a darle asesoría financiera a un cliente, vas a ayudarme a hacerla te voy a dar contexto sobre la empresa y sus metas financieras, así como su P&L de los últimos meses con base en eso, me vas a generar tres entregables: 1. comentarios de las gráficas 2. highlights y análisis del P&L 3. recomendaciones estratégicas tus respuestas deben de ser concisas y el lenguaje que uses debe de ser para gente no-financiera, que sea fácil de entender e interpretar estás de acuerdo?',
    // QA_prompt:
    //   'primero te daré el transcript de la sesión de Q&A que tuve con el cliente, quiero que lo analices y me devuelvas un resumen. Aquí está el transcript:',
    // QA_transcript:
    //   '1. ¿Cómo te llamas y cuál es tu posición en la empresa?\n\nDorothy Lerch, soy propietaria de Casa Kooch y realizo básicamente todas las actividades: dirigir, cocinar, entregar, administrar, pagos, cobranza, toda la operación del día a día.\n\nHay una persona adicional que me ayuda tanto en cocina como en entrega.\n\n2. ¿Cuál es el nombre de tu empresa y en qué industria o sector opera?\n\nCasa Kooch, es del sector alimenticio, hacemos particularmente quesos y postres veganos en venta ya sea particular o en tiendas retail.\n\n3. Pensando en el modelo de negocios de tu empresa, ¿qué tipo de empresa tienes? Escribe solo la letra que más se ajuste a tu empresa: a. Venta de bienes tangibles (como minoristas, restaurantes, o fabricantes)\n\na. Venta de bienes tangibles (como minoristas, restaurantes, o fabricantes)\n\n4. ¿Podrías describir brevemente tu modelo de negocio y cómo haces dinero? ¿Qué tipo de bienes o servicios ofreces? Si son más de un bien o servicio, por favor haz una lista completa.\n\nVenta de quesos principalmente, tanto a particular como a retail. Es venta de bienes, no ofrezco ningún servicio. Lo hacemos en la CDMX por el momento, con el objetivo de expandirnos a otras partes de la república. Como funciona es que producimos quesos semanalmente y entregamos a los clientes que ya nos compramos. Los productos son: quesos de diferentes tipos, postres, algunos son de temporada y algunos nos toman tiempo producirlos.\n\n5. ¿Podrías describir tu target de clientes? ¿A qué segmentos estás dirigido?\n\nMi target principalmente es gente vegana, que no consume productos de origen animal. También se expande a gente que no consume lácteos, gluten o soya. También están aquellos que solo le gustan los quesos aunque no tengan restricciones. Es un producto caro por lo que el sector es de altos ingresos.\n\n6. Podrías describir el manejo de cuentas bancarias en tu empresa: ¿Tienen una o varias cuentas dedicadas? ¿Utilizan tarjetas de crédito de la empresa, realizan operaciones en efectivo frecuentemente, etc.? ¿Usas algún software de ventas? Si tienes más de una cuenta, haz una lista de todas mencionando el banco y qué tipo de uso le dan.\n\nManejo dos cuentas bancarias, una es de ahorro de BBVA y otra que es de crédito de AMEX. Ambas están ligadas a mis gastos personales también. Tenemos algunas operaciones en efectivo pero son muy pocas, menos del 10%. Todo está registrado en mi excel, aunque no viene detallado el método de pago. Ese efectivo lo suelo usar para gastos personales. Donde más vendo en efectivo es en bazares. El software que uso de ventas es Google Sheets y yo manualmente voy actualizando mis ventas. También WA for Business para dar seguimiento a los clientes.\n\n7. ¿Tienes algún tipo de deuda o financiamiento? Si sí, describe brevemente las condiciones (plazo, fecha de contratación, monto inicial, tasa de interés, tipo de interés, quién fue el prestador, etc).\n\nSolo mi tarjeta de crédito, nada más.\n\n8. ¿Cómo describirías el nivel de estrés financiero que tu empresa está experimentando actualmente? ¿Qué lo está causando y cómo planean manejarlo?\n\nEstrés financiero altísimo, vivimos al día. Cada pago que recibimos lo usamos para pagar cosas y es mucha presión. Parte de la raíz es no tener claridad administrativa y no entender cuánto se va al negocio vs a mis gastos personales, y entonces yo como emprendedora también tengo un alto estrés financiero. La forma en la que lo queremos manejar es tener más orden y claridad, y por eso esta asesoría! Hay mucho dinero que gastamos en envíos, muchos los pagan los clientes, pero hay mucho ahí que yo absorbo y que no tengo claridad. También hay temas con la merma, que no es demasiada, pero por ahí también hay áreas de mejora.\n\n9. ¿Cuál es la meta financiera más importante para tu empresa actualmente? Por favor, elige una de las siguientes opciones, explicando porqué la elegiste. a. "Necesito vender más o gastar menos": Puede ser que quieras aumentar tus ingresos, ya sea encontrando más clientes, vendiendo más productos o servicios, o reduciendo tus gastos actuales. b. "Necesito más dinero en el banco": Podría ser que quieras mejorar tu flujo de efectivo o tener más ahorros para emergencias o futuras inversiones. c. "Necesito obtener un préstamo o encontrar inversionistas": Para algunas empresas pequeñas, un objetivo clave puede ser obtener financiamiento externo. d. "Necesito crecer mi negocio": Esto podría implicar contratar más personal, abrir una nueva sucursal, o expandir tu oferta de productos o servicios. e. "Otro"\n\nRespuesta: A, B y D\n\nJustificación: con la A definitivamente necesito vender más, aunque gastar menos no necesariamente porque sí creo que soy muy eficiente. Por otro lado, la B, también necesito mejorar mi flujo porque tengo muy poco dinero en el banco y eso tiene que cambiar. Y la D también, que está ligada a incrementar las ventas, pero no solo eso sino que tener más capacidad instalada (probablemente tener un taller e invertir en máquinas para hacer mejores y más eficientes mis procesos).\n\n10. Bonus: ¿algo más que creas relevante añadir?\n\nNo por ahora. Seguro saldrán más cosas después, pero por ahora esto es lo importante. Algo importante es diferencias mis ventas a particulares vs mis ventas en retail. Las particulares las hago directo a través de WA, yo lo coordino y ejecuto y las termino entregando a través de un chofer que me ayuda algunos días a la semana (con rutas pre-planeadas) o con LalaMove que es un servicio de entregas (los envíos casi siempre los cobro a parte, a veces con un poco de margen pero hay veces que incluso subsidio yo). Y el modelo de retail es yo buscando a las tiendas que ya tengo en mi cartera, suelen ser ventas más planeadas y con una mejor estructura para mi producción. Las entrego de forma similar. El 50% de los clientes de retail me paga el producto contra entrega, y el otro 50% me paga a final del mes, y aunque es compra a consignación casi nunca hay merma entonces es prácticamente venta en firme. Se los vendo con un 30-35% de descuento, dependiendo el deal. Otra cosa importante es que mi comunicación no es muy buena: no tengo pagina de internet, ni newsletter o otras cosas de contenido, no capturo datos de mis clientes ni nada similar. Donde más me esfuerzo es en Instagram, pero estoy segura que podría mejorar para tener más ventas. Hay otros gastos que sé que son muy importantes y necesarios que no he hecho porque no tengo dinero: contratar un servicio profesional para tomar fotos de mis productos y que mejoren las ventas; contratar un químico en alimentos que me ayude con las recetas y a optimizar mis procesos, etc',
    // QA_close:
    //   'si te queda claro, hazme un resumen de esto y pídeme la información de sus metas financieras',
    start_prompt:
      'voy a darle asesoría financiera a un cliente, vas a ayudarme a hacerla ',
    QA_prompt: 'te voy a pasar la transcriopcion de la entrevista que tuvimos',
    QA_transcript:
      'de que se trata tu empresa? \
      vendemos ropa \
      cuanto vendieron el mes pasado? \
      vendimos 10000 en poleras y 2000 en pantalones \
      cuantas personas trabajan en la empresa? \
      estoy yo con mi socio y otros 3 empleados',
    QA_close: 'dame una descripcion de lo que crees que podria ser la empresa',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const business_resume = document.getElementById('business_resume');

    const response = await fetch('/api/thread/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error('Error al enviar el formulario');
      return;
    }

    const result = await response.json();
    console.log('Formulario enviado con éxito', result.content);

    if (!business_resume) {
      return;
    }

    business_resume.innerHTML = result.content;
  };

  const handleCreateThread = async () => {
    const response = await fetch('/api/thread/create', {
      headers: {
        'Content-Type': 'application/json',
        method: 'GET',
      },
    });

    console.log('response', response.body);

    if (!response.ok) {
      console.error('Error al enviar el formulario');
      return;
    }

    const result = await response.json();
    console.log('thread y assistant generados con exito', result.content);
  }

  return (
    <main>
      <div className="mt-3">
        <h1 className="my-3 text-center">Generador de reportes</h1>
        <Button onClick={handleCreateThread}>
         crear thread
        </Button>
        <form onSubmit={handleSubmit}>
          <textarea
            name="text"
            value={formData.start_prompt}
            onChange={handleChange}
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />
          <textarea
            name="QA_prompt"
            value={formData.QA_prompt}
            onChange={handleChange}
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />
          <textarea
            name="QA_transcript"
            value={formData.QA_transcript}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
            placeholder=">>> ingresar el transcript del Q&A <<<"
          />
          <textarea
            name="QA_close"
            value={formData.QA_close}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />

          <div className="my-2 flex justify-end">
            <button className="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50">
              Generar
            </button>
          </div>
        </form>

        <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
          Resumen de la empresa
        </h2>
        <form action={createReport}>
          <textarea
            rows={9}
            id="business_resume"
            name="business_resume"
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input type="text" name="business_id" defaultValue={business_id} hidden />
          <div className="space-between my-2 flex items-center justify-around">
            <select
              name="month"
              className="w-1/2 rounded-md bg-blue-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Seleccione un mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
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
