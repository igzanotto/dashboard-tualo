// prompts reporte inicial
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

si te parece bien, y para estar seguros de que tienes toda la información a la mano, lo primero que quiero es que hagas un resumen de máximo 500 palabras del reporte anterior`;

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

export const QA_transcript = 
`primero te mando el Q&A de la información del mes:

———

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
    
———

Por otro lado, te recuerdo que la meta financiera de la empresa era:

"Necesitar vender más o gastar menos”

———

si te queda claro, hazme un resumen de esto en bullets y pídeme después el follow up de las recomendaciones pasadas`;

export const PL_transcript = 
`te voy a mandar el P&L del cliente con toda la historia, pero recuerda que el mes que estamos analizando es el último

———

Venta Total	Venta tarjeta	248994.05
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
Utilidad Neta (3)

———

si te queda claro, respóndeme con la tabla resumida y pídeme siguientes instrucciones`;

export const highligths_and_PL_analysis_prompt =
`lo siguiente será empezar con el primer entregable: **highlights y análisis del P&L del mes de enero**

toma las siguientes consideraciones para hacerlo:

- haz 5 bullets con los highlights financieros
- enfocar el análisis en el mes actual enero, no hacer highlights de meses anteriores excepto para hacer comparaciones entre lo que pasó este mes vs lo que había pasado en meses anteriores
- habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)

——-

una vez que hayas terminado, pídeme siguientes instrucciones`;

export const followup_recomendations_prompt =
`muy bien, vamos por el 2do entregable: **recomendaciones estratégicas**

considera lo siguiente:

- haz entre 3 y 5 recomendaciones enfocadas al cumplimiento de la meta financiera de la empresa con el siguiente formato: un título seguido de un emoji relacionado, una descripción de una línea, una justificación de por qué decidiste incluir esa recomendación (usa ejemplos específicos de sus finanzas o su modelo de negocio para justificarlo), y una lista de entre 3 y 5 pasos para explicar cómo lograrlo
- tomar en cuenta *la continuidad* para hacerlas, no solo inventes nuevas recomendaciones sino considera las anteriores y corrígelas usando el feedback
    - en caso de que el feedback así lo pida, haz nuevas recomendaciones
- asegúrate de que sean accionables, que puedan ejecutarse con pasos específicos y que no requieran esperar meses o sean muy etéreas
- habla en un idioma natural: considera que los usuarios no tienen experiencia financiera (no uses palabras técnicas financieras como márgenes, utilidad, rentabilidad, ebitda, etc)
- si consideras que alguna es algo compleja para personas que no tienen mucho expertise en negocios, incluye "Tips adicionales" donde menciones herramientas específicas a usar o contenido en línea que pueda ayudarles a entenderlo mejor
- nunca recomiendes nada relacionado a mejorar la gestión de gastos o el control financiero, ya que eso es lo que estamos haciendo nosotros con los clientes ;)

te recuerdo que las recomendaciones anteriores que hiciste fueron:
Recomendación 1: Intensificar la Estrategia de Marketing Digital 💻
Recomendación 2: Fortalecimiento del Equipo mediante Capacitación Continua 📚
Recomendación 3: Programa de Referidos para Turistas 🌍
Recomendación 4: Optimización de la Experiencia del Cliente en Tienda 🛍️
Recomendación 5: Maximizar la Visibilidad en Línea 🌐

una vez hecho eso, me pides siguientes instrucciones`;

 export const followup_charts_prompt =
 `ahora vamos con el 2do entregable: *comentarios de las gráficas históricas*
 nuevamente genera insights que le ayuden al cliente a interpretar sus resultados financieros de la empresa en caso de que él no pueda llegar a esas conclusiones por su cuenta (facilitarle los insights financieros principales dados los números resultantes este mes)
 pon ejemplos específicos, usa números reales, no solo le expliques cómo interpretarlo sino interpretalo por él
 menciona los tres insights más importantes de cada una en bullets y hazlos personalizados
 **las gráficas son las siguientes:
 
 1. gráfica de barras de sus ventas mensuales con una línea para el promedio, resaltando las ventas del mes actual
 2. gráfica de barras de sus costos mensuales y gastos mensuales, con líneas para cada uno de los promedios, resaltando los correspondientes al mes actual
 3. gráfica de barras que muestra la utilidad neta en el eje izquierdo, y el margen neto en gráfica de línea en el eje derecho, resaltando los resultados del mes actual
 4. gráfica de líneas con la evolución de los tres márgenes principales: margen bruto, margen operativo, y margen neto, resaltando los del mes actual
 5. gráfica de líneas de la evolución de sus gastos mensuales desglosado por tipo de gasto (no incluye los costos ni los gastos financieros, solo gastos operativos)
 `;

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