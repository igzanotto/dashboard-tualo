// prompts reporte inicial
export const initial_QA_prompt =
'primero te daré el transcript de la sesión de Q&A que tuve con el emprendedor:';

export const initial_QA_transcript = 
`1. ¿Cómo te llamas y cuál es tu posición en la empresa?
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
- necesito llevar un inventario más estrictamente para que genere la menor merma, un control de inventarios`;

export const initial_QA_close = 
'si te queda claro, hazme un resumen de esto y pídeme la información de sus metas financieras';


// goals

export const goals_prompt = 
`Le pedí al emprendedor que eligiera la(s) opción(es) que más correspondieran a sus metas actuales desde el punto de vista de las finanzas de su empresa. A continuación su respuesta:

¿Cuál es la meta financiera más importante para tu empresa actualmente? Por favor, elige una de las siguientes opciones, explicando porqué la elegiste.
a. "Necesito vender más o gastar menos": Puede ser que quieras aumentar tus ingresos, ya sea encontrando más clientes, vendiendo más productos o servicios, o reduciendo tus gastos actuales.
b. "Necesito más dinero en el banco": Podría ser que quieras mejorar tu flujo de efectivo o tener más ahorros para emergencias o futuras inversiones.
c. "Necesito obtener un préstamo o encontrar inversores": Para algunas empresas pequeñas, un objetivo clave puede ser obtener financiamiento externo.
d. "Necesito crecer mi negocio": Esto podría implicar contratar más personal, abrir una nueva sucursal, o expandir tu oferta de productos o servicios.
e. "Otro":`;

export const goals_transcript =``
// `definitivamente necesito vender más, no necesariamente porque sí creo que soy muy eficiente. Por otro lado, también necesito mejorar mi flujo porque tengo muy poco dinero en el banco y eso tiene que cambiar.`;

export const goals_close =
`si te queda claro, dame un resumen de esto y pídeme su P&L`;

// P&L

export const initial_PL_prompt =
'A continuación una tabla con su P&L:';

export const initial_PL_transcript = '';
`Estado de Resultados, moneda: MXN, año: 2023-2024																													
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
    cálculo de márgen	Margen Operativo (2)		-6.10%	8.00%	24.40%	20.30%	25.50%	18.10%	-17.00%	29.20%	1.80%	21.30%	33.20%	15.90%	5.90%	28.10%	9.10%											15.80%	`;

export const initial_PL_close =
'si te queda claro, respóndeme solamente con un resumen que sintetice lo anterior y pídeme siguientes instrucciones';

// graficas
export const initial_charts_prompt =
`ahora vamos con el 1er entregable: *comentarios de las gráficas*
necesito insights que le ayuden al cliente a interpretar sus resultados financieros de la empresa en caso de que él no pueda llegar a esas conclusiones por su cuenta (facilitarle los insights financieros principales dados los números resultantes este mes)
pon ejemplos específicos, usa números reales, no solo le expliques cómo interpretarlo sino interpretalo por él
menciona los tres insights más importantes de cada una en bullets y hazlos personalizados
las gráficas del reporte son:

- waterfall chart que representa su P&L acumulado. las barras son: primero los ingresos, luego los costos, luego gastos, y finalmente gastos financieros; y los subtotales que van quedando son primero la utilidad bruta, luego la operativa y luego la neta. no hay números individuales de cada mes, sino del periodo completo
- gráfica de barras de sus ventas mensuales con una línea para el promedio
- gráfica de barras de sus costos mensuales y gastos mensuales, con líneas para cada uno de los promedios
- gráfica de barras que muestra la utilidad neta en el eje izquierdo, y el margen neto en gráfica de línea en el eje derecho
- gráfica de líneas con la evolución de los tres márgenes principales: margen bruto, margen operativo, y margen neto
- gráfica de líneas de la evolución de sus gastos mensuales desglosado por tipo de gasto (no incluye los costos ni los financieros, solo gastos)`;

// analysis
export const analysis_prompt =
`vamos con el 2do entregable: **highlights y análisis del P&L**
usando lo aprendido en las gráficas anteriores del 1er entregable, resume las conclusiones e insights más importantes en un análisis financiero

toma las siguientes consideraciones para hacerlo:

- haz 5 bullets con los highlights financieros
- usa ejemplos específicos para explicar tus hallazgos, mencionando métricas o números
- habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)
- enfócate en hacer solamente análisis, nada de recomendaciones

——-

una vez que hayas terminado, pídeme siguientes instrucciones`;

// Prompts recomendaciones estratégicas

export const bullets_prompt = `
para el 3er entregable lo vamos a hacer paso a paso

lo primero que haremos es lo siguiente:
haz una lista en bullets de al menos 10 recomendaciones que podrían servirle a esta
empresa dado su modelo de negocios y su situación financiera, todas enfocadas al cumplimiento de su meta financiera
`;

export const evaluation_prompt = `
muy bien, ahora vamos a evaluar estas recomendaciones iniciales. Por favor, crea una matriz con las recomendaciones propuestas, evaluándolas según su nivel de personalización para este cliente, su nivel de accionabilidad, y su nivel de alineación con su meta financiera, usando la siguiente estructura:

recomendación | nivel de personalización (1 = muy genérica, 10 = hiper personalizada) | nivel de accionabilidad (1 = tomaría muchos meses o años, 10 = se podría implementar en unas semanas) | nivel de alineación con su meta financiera (1 = nada alineada, 10 = totalmente alineada al cumplimiento de su meta)

Quiero ponderar la alineación con metas con 10 puntos, la accionabilidad con 5 puntos y la personalización con 3 puntos. Con eso en mente, ¿cuáles serían las recomendaciones más adecuadas para incluir en el reporte?
`;

export const recomendations_prompt = `
muy bien, ahora sí desarrollaremos el 3er entregable: **recomendaciones estratégicas**

considera lo siguiente:

- desarrolla las 3 a 5 mejores recomendaciones de la lista anterior, las que tuvieron el puntaje más alto en la ponderación
- usa el siguiente formato: un título seguido de un emoji relacionado, una descripción de una línea, una justificación de por qué decidiste incluir esa recomendación (usa ejemplos específicos de sus finanzas o su modelo de negocio para justificarlo), y una lista de entre 3 y 5 pasos para explicar cómo lograrlo
- habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)
- si consideras que alguna es algo compleja para personas que no tienen mucho expertise en negocios, incluye "Tips adicionales" donde menciones herramientas específicas a usar o contenido en línea que pueda ayudarles a entenderlo mejor
- nunca recomiendes nada relacionado a mejorar la gestión de gastos o el control financiero, ya que eso es lo que estamos haciendo nosotros con los clientes ;)
`;





// Prompts reportes de seguimiento
export const previous_resume_prompt = 
`vamos a hacer un follow up del análisis
la primera parte que ya hicimos era el reporte inicial con sus números históricos y nos permitió empezar la relación laboral con el cliente
ahora, vamos a tener una relación mensual y cada mes que pase nos estará dando algo de contexto de su empresa, además de los números de este nuevo mes, para que le demos un siguiente reporte financiero
vamos a hacer lo siguiente:

1. te voy a dar un Q&A que tuve con el emprendedor para que sepas qué pasó este mes
2. te voy a dar un follow up de las recomendaciones que habíamos hecho para ver cómo las acató
3. te voy a dar el P&L histórico, que incluye los resultados del mes

con base en esas tres cosas haremos un análisis detallado del mes
recuerda que tus respuestas deben de ser concisas y el lenguaje que uses debe de ser para gente no-financiera, que sea fácil de entender e interpretar

si te parece bien, y para estar seguros de que tienes toda la información a la mano, lo primero que quiero es que hagas un resumen de máximo 500 palabras del reporte anterior en formato bullets`;

export const recomendations_feedback_prompt = 
`le pedí al emprendedor que respondiera las siguientes preguntas de cada una de las recomendaciones que le hicimos en el reporte del mes anterior:

- a) Califica la recomendación que te hicimos: ¿Qué tan útil y adecuada te pareció? 1= nada útil, 5 = muy útil
- b) ¿Crees que debería de haber un cambio con respecto a esta recomendación? 
1. Quiero ajustarla un poco
2. Continuar sobre la misma línea
3. Eliminarla, no me sirve de nada
- c) ¿Implementaste la recomendación en tu negocio este último mes? Si sí, cuéntanos: ¿Cómo fue el proceso? ¿Qué impacto has observado hasta ahora?

a continuación sus respuestas:
`;

export const recomendations_feedback_close = 
`
si te quedó claro, no necesito un resumen y solo pídeme el P&L de este mes`;

export const QA_transcript = '';
`
*Operaciones y Ventas*

1. ¿Hubo algún producto o servicio nuevo que se lanzó este mes?
    
    No
    
2. ¿Se realizaron promociones o descuentos especiales este mes?
    
    No
    
*Gastos y Costos*

1. ¿Hubo algún gasto extraordinario o no recurrente este mes?
    
    Si, Un conejo de 13,000 pesos que se compró para la tienda
    
2. ¿Se realizaron contrataciones o despidos significativos en el equipo este mes?
    
    Si, Se fue un vendedor (Erik) todavía no encontramos reemplazo
    
*Inversiones y Financiamiento*

1. ¿Hubo algún cambio relevante en la estrategia o modelo de negocio de la empresa este mes?
    
    No
    
2. ¿Adquiriste algún nuevo préstamo o inversión este mes?
    
    No
    
3. ¿Invertiste en algo relevante este mes? (compra de algún activo o algo similar)
    
    No
    
*Eventos Externos*

1. ¿Hubo eventos externos que afectaron las operaciones (por ejemplo, desastres naturales, huelgas)?
    
    No
    
*Relaciones Comerciales*

1. ¿Se establecieron o terminaron alianzas o asociaciones estratégicas?
    
    No
`;

export const followup_goals_start =
`———
Por otro lado, te recuerdo que la meta financiera de la empresa era:
`;

export const followup_goals_transcript = ``;

export const observations_prompt = `
____
y nos hicieron observaciones:`;

export const followup_QA_close =
`
_______
si te queda claro, hazme un resumen de esto en bullets y pídeme después el follow up de las recomendaciones pasadas`;

export const followup_PL_prompt =
`te voy a mandar el P&L del cliente con toda la historia, pero recuerda que el mes que estamos analizando es el último

———`

export const PL_transcript = '';
`Venta Total	Venta tarjeta	248994.05
Venta Total	Venta efectivo	110368.97
Venta Total	Franquicia	0
Venta Total		
Costo Principal	Productos	-82119.5
Otros Costos	Envíos	-10424.73
Otros Costos	Material	-22319.28
Otros Costos	Terminal	-385.37
Utilidad Bruta (1)		
Gastos Principales	Sueldo Empleados	-74161
Gastos Principales	Renta	-52992.5
Gastos Principales	Sueldo Emprendedor	-80000
Otros Gastos	Marketing	-2222.62
Otros Gastos	Mantenimiento	-1900
Otros Gastos	Servicios	-3285
Otros Gastos	Tecnología	0
Otros Gastos	Gastos Administrativos	-1199
Otros Gastos	Transporte	-6003.5
Otros Gastos	Otros Gastos	-695
Utilidad Operativa (2)		
Gastos Financieros Totales	Intereses (-)	0
Gastos Financieros Totales	Comisiones (-)	0
Gastos Financieros Totales	Rendimientos (+)	0
Gastos Financieros Totales	Efectivo (-)	0
Gastos Financieros Totales	Otros	0
Gastos Financieros Totales	Impuestos (-)	0
Utilidad Neta (3)`;

export const followup_PL_close = `
———

si te queda claro, respóndeme con la tabla resumida y pídeme siguientes instrucciones`

export const highlights_and_PL_analysis_prompt =
`lo siguiente será empezar con el primer entregable: **highlights y análisis del P&L del mes de enero**

toma las siguientes consideraciones para hacerlo:

- haz 5 bullets con los highlights financieros
- enfocar el análisis en el mes actual enero, no hacer highlights de meses anteriores excepto para hacer comparaciones entre lo que pasó este mes vs lo que había pasado en meses anteriores
- habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)

——-

una vez que hayas terminado, pídeme siguientes instrucciones`;


export const followup_charts_prompt =
 `lo siguiente será empezar con el 1er entregable: *comentarios de las gráficas del mes*
necesito insights que le ayuden al cliente a interpretar sus resultados financieros de la empresa en caso de que él no pueda llegar a esas conclusiones por su cuenta (facilitarle los insights financieros principales dados los números resultantes este mes)
pon ejemplos específicos, usa números reales, no solo le expliques cómo interpretarlo sino interpretalo por él
menciona los tres insights más importantes de cada una en bullets y hazlos personalizados
las gráficas son las siguientes:

1. waterfall chart del P&L del mes actual de sus ingresos y egresos. cada barra es un rubro de ingresos, costos o gastos, y va quedando primero la utilidad bruta, luego la operativa y luego la neta.
2. gráfica de barras con dos series: la primera es el mes actual y la segunda es el promedio de los meses anteriores; y hay 6 categorías en el eje X: ventas, costos, utilidad bruta, gastos, utilidad operativa, gastos financieros, y utilidad neta
3. gráfica de barras con dos series: la primera es el mes actual y la segunda es el promedio de los meses anteriores; y hay 3 categorías en el eje X: margen bruto, margen operativo y margen neto
 `;

export const history_charts_prompt =
`ahora vamos con el 2do entregable: *comentarios de las gráficas históricas*
nuevamente genera insights que le ayuden al cliente a interpretar sus resultados financieros de la empresa en caso de que él no pueda llegar a esas conclusiones por su cuenta (facilitarle los insights financieros principales dados los números resultantes este mes)
pon ejemplos específicos, usa números reales, no solo le expliques cómo interpretarlo sino interpretalo por él
menciona los tres insights más importantes de cada una en bullets y hazlos personalizados
**las gráficas son las siguientes:

1. gráfica de barras de sus ventas mensuales con una línea para el promedio, resaltando las ventas del mes actual
2. gráfica de barras de sus costos mensuales y gastos mensuales, con líneas para cada uno de los promedios, resaltando los correspondientes al mes actual
3. gráfica de barras que muestra la utilidad neta en el eje izquierdo, y el margen neto en gráfica de línea en el eje derecho, resaltando los resultados del mes actual
4. gráfica de líneas con la evolución de los tres márgenes principales: margen bruto, margen operativo, y margen neto, resaltando los del mes actual
5. gráfica de líneas de la evolución de sus gastos mensuales desglosado por tipo de gasto (no incluye los costos ni los gastos financieros, solo gastos operativos)`

export const followup_analysis_prompt =
`ahora vamos con el 3er entregable: **highlights y análisis del P&L del mes de XXX**

toma las siguientes consideraciones para hacerlo:

- haz 5 bullets con los highlights financieros
- enfocar el análisis en el mes actual (XXX), no hacer highlights de meses anteriores excepto para hacer comparaciones entre lo que pasó este mes vs lo que había pasado en meses anteriores
- habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)
- usa ejemplos específicos para explicar tus hallazgos, mencionando métricas o números
- enfócate en hacer solamente análisis, nada de recomendaciones

——-

una vez que hayas terminado, pídeme siguientes instrucciones `

export const followup_recomendations_bullets_prompt =
`muy bien, vamos por el 4to entregable: recomendaciones estratégicas
lo vamos a hacer paso a paso
lo primero que haremos es lo siguiente:
haz una lista en bullets de las recomendaciones que hiciste en el reporte anterior, y cada una con propuestas de cambios, mejora o eliminación (sin desarrollar, solo ideas en bullets) según el feedback que recibimoss`;

export const followup_recomendations_ideas_prompt =
`ahora, sin considerar esa lista, ayúdame a generar una lluvia de ideas de posibles nuevas recomendaciones que podrían servirle a esta empresa dado su modelo de negocios y su situación financiera del periodo actual, todas enfocadas al cumplimiento de sus metas financieras y las actualizaciones de las mismas`

export const followup_recomendations_evaluation_prompt =
`muy bien, ahora vamos a evaluar tanto las recomendaciones pasadas como estas nuevas propuestas de recomendaciones. Crea una matriz con todas las recomendaciones, evaluándolas según su nivel de personalización para este cliente, su nivel de accionabilidad, y su nivel de alineación con su meta financiera actualizadas, usando la siguiente estructura:

recomendación | tipo de recomendación (”anterior”, si viene del reporte anterior, o “nueva”, si se generó a partir de este nuevo ejercicio) | nivel de personalización (1 = muy genérica, 10 = hiper personalizada) | nivel de accionabilidad (1 = tomaría muchos meses o años, 10 = se podría implementar en unas semanas) | nivel de alineación con su meta financiera (1 = nada alineada, 10 = totalmente alineada al cumplimiento de su meta)`

export const followup_recomendations_ponderation_prompt =
`Finalmente, quiero ponderar la alineación con metas con 10 puntos, la accionabilidad con 5 puntos y la personalización con 3 puntos. Con eso en mente, ¿cuáles serían las recomendaciones más adecuadas para incluir en el reporte? Menciona solo las 5 mejores.`

export const followup_recomendations_selection_prompt =
`Si en esta lista final no están incluidas las recomendaciones de tipo "anterior" cuyo accionable tras el feedback recibido no haya sido eliminarla, amplia la lista para incluirlas tanto como sea necesario. El orden en que las presentes deberá ser: primero las recomendaciones anteriores en el orden en que aparecían antes (excluyendo las eliminadas), y luego las nuevas ordenadas según su puntuación total.`

export const followup_recomendations_generation_prompt =
`muy bien, ahora sí desarrollaremos el 4to entregable: **recomendaciones estratégicas**

desarrolla las recomendaciones de la lista anterior considerando lo siguiente:

- usa el siguiente formato: un título seguido de un emoji relacionado, una descripción de una línea, una justificación de por qué decidiste incluir esa recomendación (usa ejemplos específicos de sus finanzas o su modelo de negocio para justificarlo), y una lista de entre 3 y 5 pasos para explicar cómo lograrlo
- tomar en cuenta *la continuidad* para las anteriores: no solo repitas lo que se dijo en el reporte anterior, sino ejecuta lo que dedujiste usando el feedback
- habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)
- si consideras que alguna es algo compleja para personas que no tienen mucho expertise en negocios, incluye "Tips adicionales" donde menciones herramientas específicas a usar o contenido en línea que pueda ayudarles a entenderlo mejor
- nunca recomiendes nada relacionado a mejorar la gestión de gastos o el control financiero, ya que eso es lo que estamos haciendo nosotros con los clientes`;