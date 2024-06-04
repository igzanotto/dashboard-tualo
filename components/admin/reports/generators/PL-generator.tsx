'use client';

import { Button } from '@/components/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  PL_prompt: string;
  PL_transcript: string;
  PL_close: string;
}

export default function PLGenerator({ threadId }: { threadId: any }) {
  const report_id = useParams().report_id as string;
  const business_id = useParams().business_id as string;
  const [statusMessage, setStatusMessage] = useState('');

  const [formData, setFormData] = useState<FormData>({
    PL_prompt:
      'A continuacion te dare una tabla con su P&L para que entiendas sus numeros mas relevantes',
    PL_transcript: `Estado de Resultados, moneda: MXN, año: 2023-2024																													
    Categoria principal	sub categoria		ene 2023	feb 2023	mar 2023	abr 2023	may 2023	jun 2023	jul 2023	ago 2023	sep 2023	oct 2023	nov 2023	dic 2023	ene 2024	feb 2024	mar 2024	abr 2024	may 2024	jun 2024	jul 2024	ago 2024	sep 2024	oct 2024	nov 2024	dic 2024		 Año completo 2023	 % ventas
    Venta Total	Venta Total		 $ 315,066 	 $ 260,997 	 $ 286,362 	 $ 321,005 	 $ 394,868 	 $ 386,656 	 $ 278,755 	 $ 338,363 	 $ 262,182 	 $ 412,303 	 $ 558,354 	 $ 500,800 	 $ 366,833 	 $ 426,633 	 $ 450,989 	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -		 $ 5,560,166 	 $ 10,805,267 
    Venta Total	Venta tarjeta		 $ 255,565 	 $ 201,845 	 $ 226,983 	 $ 277,818 	 $ 350,758 	 $ 334,893 	 $ 246,047 	 $ 290,893 	 $ 227,034 	 $ 378,471 	 $ 504,935 	 $ 492,955 	 $ 326,803 	 $ 389,361 	 $ 393,652 											 $ 4,898,012 	 $ 9,540,458 
    Venta Total	Venta efectivo		 $ 27,169 	 $ 37,702 	 $ 48,225 	 $ 43,187 	 $ 44,111 	 $ 44,763 	 $ 32,709 	 $ 47,470 	 $ 35,148 	 $ 33,833 	 $ 53,420 	 $ 7,845 	 $ 40,030 	 $ 37,272 	 $ 57,338 											 $ 590,219 	 $ 1,153,269 
    Venta Total	Franquicia		$32,332	$21,450	$11,154	$ -	$ -	$7,000	$ -	$ -	$ -	$ -	$ -	$ -	$ -	$ -	$ -											$71,936	$111,540
                                                              
    Costos Totales	Costos Totales		-$ 171,983 	-$ 87,910 	-$ 63,531 	-$ 91,027 	-$ 138,776 	-$ 145,540 	-$ 85,932 	-$ 46,950 	-$ 63,709 	-$ 119,336 	-$ 180,471 	-$ 175,816 	-$ 122,719 	-$ 111,833 	-$ 190,966 	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -		-$ 1,796,498 	-$ 3,421,013 
    Costos Totales	Productos		-$ 130,924 	-$ 79,097 	-$ 48,420 	-$ 70,191 	-$ 121,761 	-$ 111,624 	-$ 71,983 	-$ 27,643 	-$ 40,810 	-$ 94,372 	-$ 158,435 	-$ 117,120 	-$ 82,120 	-$ 83,304 	-$ 172,760 											-$ 1,410,563 	-$ 2,690,203 
    Costos Totales	Envíos		-$ 18,600 	-$ 2,000 	-$ 5,000 	-$ 11,700 	-$ 4,500 	-$ 21,435 	-$ 4,900 	-$ 7,551 	-$ 13,200 	-$ 9,050 	-$ 5,750 	-$ 26,670 	-$ 10,425 	-$ 5,540 	-$ 6,689 											-$ 153,010 	-$ 287,419 
    Costos Totales	Material		-$ 14,792 	-$ 758 	-$ 3,302 	-$ 802 	-$ 1,992 	-$ 2,435 	-$ 1,470 	-$ 3,028 	-$ 2,888 	-$ 489 	-$ 982 	-$ 17,291 	-$ 22,319 	-$ 5,716 	-$ 51 											-$ 78,314 	-$ 141,836 
    Costos Totales	Terminal		-$7,667	-$6,055	-$6,809	-$8,335	-$10,523	-$10,047	-$7,580	-$8,727	-$6,811	-$15,425	-$15,303	-$14,735	-$7,855	-$17,272	-$11,466											-$154,611	-$301,554
                                                              
    Cálculo de utilidad	Utilidad Bruta (1)		$143,082	$173,087	$222,830	$229,978	$256,093	$241,116	$192,823	$291,413	$198,473	$292,968	$377,883	$324,984	$244,114	$314,800	$260,024	$ -	$ -	$ -	$ -	$ -	$ -	$ -	$ -	$ -		$3,188,845	
    cálculo de márgen	Margen Bruto (1)		45.40%	66.30%	77.80%	71.60%	64.90%	62.40%	69.20%	86.10%	75.70%	71.10%	67.70%	64.90%	66.50%	73.80%	57.70%											68.10%	
                                                              
    Gastos Totales	Gastos Totales		-$ 162,335 	-$ 152,290 	-$ 152,818 	-$ 164,831 	-$ 155,307 	-$ 171,168 	-$ 240,254 	-$ 192,495 	-$ 193,647 	-$ 204,967 	-$ 192,766 	-$ 245,399 	-$ 222,459 	-$ 195,074 	-$ 218,902 	 $ -   	 $ -   	 $ -   	 $ -   	 $ -   	 $ -   	 $ -   	 $ -   	 $ -   		-$ 2,864,713 	-$ 5,567,091 
    Gastos Totales	Sueldo Empleados		-$ 49,600 	-$ 33,850 	-$ 37,440 	-$ 29,180 	-$ 42,740 	-$ 42,800 	-$ 58,710 	-$ 39,440 	-$ 47,022 	-$ 53,977 	-$ 49,434 	-$ 73,057 	-$ 74,161 	-$ 44,737 	-$ 48,564 											-$ 724,712 	-$ 1,399,824 
    Gastos Totales	Renta		-$ 47,150 	-$ 47,150 	-$ 47,150 	-$ 47,150 	-$ 48,150 	-$ 48,150 	-$ 48,150 	-$ 53,625 	-$ 51,983 	-$ 52,800 	-$ 52,813 	-$ 53,185 	-$ 52,993 	-$ 53,993 	-$ 53,993 											-$ 758,433 	-$ 1,469,715 
    Gastos Totales	Sueldo Emprendedor		-$ 60,000 	-$ 60,000 	-$ 60,000 	-$ 61,942 	-$ 60,000 	-$ 70,000 	-$ 70,000 	-$ 70,000 	-$ 70,000 	-$ 70,000 	-$ 75,000 	-$ 105,000 	-$ 80,000 	-$ 80,000 	-$ 100,000 											-$ 1,091,942 	-$ 2,123,884 
    Gastos Totales	Marketing		-$ 557 	-$ 5,420 	-$ 350 	-$ 946 	-$ 545 	-$ 2,124 	-$ 39,414 	-$ 20,915 	-$ 1,890 	-$ 6,876 	-$ 5,622 	-$ 3,631 	-$ 2,223 	-$ 2,479 	-$ 429 											-$ 93,421 	-$ 186,285 
    Gastos Totales	Mantenimiento		-$ 200 	-$ 2,770 	-$ 358 	-$ 5,464 	-$ 435 	-$ 1,960 	-$ 15,966 	-$ 4,529 	-$ 1,310 	-$ 4,879 	-$ 200 	 $ -	-$ 1,900 	-$ 429 	-$ 1,020 											-$ 41,419 	-$ 82,639 
    Gastos Totales	Servicios		-$ 1,628 	-$ 3,322 	-$ 2,884 	-$ 4,727 	-$ 1,852 	-$ 2,178 	-$ 4,197 	-$ 3,370 	-$ 3,160 	-$ 3,558 	-$ 2,667 	-$ 4,618 	-$ 3,285 	-$ 4,216 	-$ 2,954 											-$ 48,616 	-$ 95,604 
    Gastos Totales	Tecnología		 $ -	 $ -	 $ -	 $ -	-$ 500 	 $ -	 $ -	 $ -	 $ -	 $ -	-$ 411 	 $ -	 $ -	-$ 757 	 $ -											-$ 1,668 	-$ 3,336 
    Gastos Totales	Gastos Administrativos		-$ 600 	-$ 600 	-$ 600 	 $ -	 $ -	 $ -	 $ -	 $ -	 $ -	-$ 800 	-$ 800 	-$ 800 	-$ 1,199 	-$ 1,199 	-$ 800 											-$ 7,398 	-$ 14,196 
    Gastos Totales	Transporte		-$ 400 	-$ 288 	-$ 1,600 	-$ 12,912 	-$ 356 	-$ 2,132 	-$ 2,170 	 $ -	-$ 11,350 	-$ 6,494 	-$ 658 	-$ 657 	-$ 6,004 	-$ 1,850 	-$ 8,457 											-$ 55,328 	-$ 110,256 
    Gastos Totales	Otros Gastos		-$2,200	$1,109	-$2,435	-$2,510	-$729	-$1,824	-$1,647	-$616	-$6,933	-$5,584	-$5,161	-$4,451	-$695	-$5,415	-$2,686											-$41,776	-$81,352
                                                              
    Cálculo de utilidad	Utilidad Operativa (2)		-$19,253	$20,797	$70,012	$65,147	$100,786	$69,948	-$47,431	$98,919	$4,825	$88,000	$185,117	$79,584	$21,656	$119,726	$41,121	$ -	$ -	$ -	$ -	$ -	$ -	$ -	$ -	$ -		$738,108	
    cálculo de márgen	Margen Operativo (2)		-6.10%	8.00%	24.40%	20.30%	25.50%	18.10%	-17.00%	29.20%	1.80%	21.30%	33.20%	15.90%	5.90%	28.10%	9.10%											15.80%	`,
    PL_close: 'dame un resumen de esto',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatusMessage('creando mensaje...');
    const response = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content:
          formData.PL_prompt +
          formData.PL_transcript +
          formData.PL_close,
        threadId: threadId,
      }),
    });

    if (!response.ok) {
      console.error('Error al agregar menssage al thread');
      setStatusMessage('Error al crear mensaje');
      return;
    }

    const result = await response.json();
    console.log('message creado con exito', result);
    setStatusMessage('mensaje creado con exito!');
  };

  const handleRetrieveThreadMessages = async (e: React.FormEvent) => {
    e.preventDefault();
    const goals = document.getElementById('goals');

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

    const responseBusinessResume = result.messagesData[5].content;

    if (!goals) {
      return;
    }

    goals.innerHTML = responseBusinessResume;
  };


  return (
    <div className="mt-3">
      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        Ingresar P&L
      </h2>

      <textarea
        name="PL_prompt"
        value={formData.PL_prompt}
        onChange={handleChange}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
      />
      <textarea
        name="PL_transcript"
        value={formData.PL_transcript}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
        placeholder=">>> ingresar el P&L sin formato <<<"
      />
      <textarea
        name = "PL_close"
        value={formData.PL_close}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-md bg-blue-100 px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        autoFocus
      />

      <div className="my-2 flex justify-between">
        <Button onClick={handleCreateMessage}>crear mensaje</Button>
        <p>{statusMessage}</p>
        <Button onClick={handleRetrieveThreadMessages}>obtener mensajes</Button>
        <input type="text" defaultValue={threadId} name="thread_id" className=' border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none' />
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-blue-600">
        P&L procesado
      </h2>
      <form>
        
        <textarea
          rows={9}
          id="goals"
          name="goals"
          className="w-full rounded-md px-3 py-2 text-black  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
        <input type="text" name="report_id" defaultValue={report_id} hidden />

        <div className="my-2 flex justify-end">
          <a href={`/admin/businesses/${business_id}/reports/${report_id}/charts`} className="rounded-md bg-blue-600 px-3 py-2 text-white  border-2 border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none disabled:opacity-50">
            Ir a Gráficos
          </a>
        </div>
      </form>
    </div>
  );
}
