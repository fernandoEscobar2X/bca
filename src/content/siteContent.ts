export const navigationLinks = [
  { label: "Especialidades", href: "#especialidades" },
  { label: "Casos", href: "#casos" },
  { label: "Cotizador", href: "#cotizador" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const heroStats = [
  { value: "15+ anos", label: "operacion continua" },
  { value: "120+", label: "frentes atendidos" },
  { value: "24h", label: "respuesta preliminar" },
  { value: "NOM / NFPA", label: "criterio tecnico" },
] as const;

export const trustItems = [
  "Residencial, comercial, industrial y hotelero",
  "Gas LP y natural, bombeo y pruebas",
  "Respuesta preliminar con validacion en sitio",
  "Presentacion comercial mas seria para cada proyecto",
] as const;

export const systemModules = [
  {
    code: "01",
    title: "Lead Terminal",
    description: "Captura tipo de obra, especialidad, metraje y datos de contacto en un flujo guiado y corto.",
    bullets: ["Filtra mejor al prospecto", "Evita capturas incompletas", "Entrega un rango preliminar"],
  },
  {
    code: "02",
    title: "Panel de Prospectos",
    description: "Muestra los leads en orden de prioridad para llamar, revisar, actualizar estado y seguir con el siguiente.",
    bullets: ["Lista simple de trabajo", "Estados faciles de mover", "Acciones directas por lead"],
  },
  {
    code: "03",
    title: "WhatsApp Automatico",
    description: "Confirma la recepcion al cliente y alerta al equipo para responder rapido sin depender del correo.",
    bullets: ["Respuesta inmediata", "Menos leads perdidos", "Aviso interno al momento"],
  },
  {
    code: "04",
    title: "Pre-Cotizacion PDF",
    description: "Arma un documento listo para enviar con datos del proyecto y banda preliminar de inversion.",
    bullets: ["Formato corporativo", "Listo para adjuntar", "Ahorra tiempo comercial"],
  },
] as const;

export const benefitItems = [
  {
    title: "Menos prospectos perdidos",
    description: "Todo entra a una sola bandeja y deja de depender de hojas de Excel o mensajes sueltos.",
  },
  {
    title: "Respuesta mas rapida",
    description: "El equipo puede llamar, enviar PDF o confirmar por WhatsApp desde el mismo recorrido demo.",
  },
  {
    title: "Mejor perfilado comercial",
    description: "Cada lead ya llega con tipo de obra, especialidad, metraje y datos suficientes para seguir.",
  },
  {
    title: "Seguimiento mas claro",
    description: "El estado del lead y la siguiente accion se entienden al instante sin explicar demasiado la interfaz.",
  },
] as const;

export const services = [
  {
    code: "DC-01",
    title: "Diseno y calculo de instalaciones hidrosanitarias y gas",
    description:
      "Memorias, criterios de calculo, especificaciones y definicion tecnica para proyectos que requieren orden desde la etapa inicial.",
    accent: "hydro",
    bullets: ["Memorias y calculo", "Criterio normativo", "Bases para ejecucion"],
  },
  {
    code: "HS-02",
    title: "Instalaciones hidrosanitarias en residencial, comercial e industrial",
    description:
      "Redes hidraulicas, sanitarias y pluviales con trazos claros, pendientes controladas y mejor coordinacion en obra.",
    accent: "hydro",
    bullets: ["Redes hidraulicas", "Redes sanitarias", "Instalacion en obra"],
  },
  {
    code: "GA-03",
    title: "Instalaciones de gas LP y natural",
    description:
      "Conduccion, regulacion y seguridad para proyectos residenciales, comerciales e industriales con liberacion tecnica.",
    accent: "gold",
    bullets: ["Tuberias y regulacion", "Hermeticidad", "Liberacion tecnica"],
  },
  {
    code: "AL-04",
    title: "Instalaciones hidrosanitarias de albercas",
    description:
      "Integracion hidraulica para vasos, filtrado, recirculacion y cuartos de maquinas con mejor control de operacion.",
    accent: "hydro",
    bullets: ["Recirculacion", "Cuarto de maquinas", "Filtrado"],
  },
  {
    code: "SA-05",
    title: "Instalacion de equipos suavizadores de agua",
    description:
      "Integracion de equipos de tratamiento para mejorar condicion del agua y proteger la operacion del sistema hidraulico.",
    accent: "hydro",
    bullets: ["Tratamiento de agua", "Conexion de equipos", "Puesta en marcha"],
  },
  {
    code: "BH-06",
    title: "Instalacion de equipos de bombeo hidraulico",
    description:
      "Montaje y conexion de equipos para presion, distribucion y continuidad operativa en distintos tipos de proyecto.",
    accent: "gold",
    bullets: ["Equipos de bombeo", "Presion y control", "Operacion continua"],
  },
  {
    code: "PH-07",
    title: "Pruebas Hidrostaticas",
    description:
      "Protocolos de verificacion para recepcion de redes, deteccion de fugas y cierre documental previo a entrega.",
    accent: "gold",
    bullets: ["Bitacora tecnica", "Presion y sosten", "Evidencia final"],
  },
] as const;

export const projects = [
  {
    title: "Adecuacion hidrosanitaria para corporativo multinivel",
    location: "Monterrey, Nuevo Leon",
    summary: "Levantamiento, coordinacion y ejecucion por etapas para no interrumpir operacion del inmueble.",
    tags: ["Hidrosanitario", "Supervision", "Entrega por fases"],
  },
  {
    title: "Red de gas para cocina industrial y servicios",
    location: "Guadalajara, Jalisco",
    summary: "Regulacion, hermeticidad y liberacion tecnica con criterios de seguridad y puesta en marcha.",
    tags: ["Gas LP", "Seguridad", "Puesta en marcha"],
  },
  {
    title: "Sistema de recirculacion para amenidad hotelera",
    location: "Cancun, Quintana Roo",
    summary: "Cuarto de maquinas, filtrado y balance hidraulico con continuidad operativa y mantenimiento previsto.",
    tags: ["Albercas", "Filtrado", "Mantenimiento"],
  },
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Levantamiento tecnico",
    description: "Detectamos rutas, restricciones, interferencias y variables normativas antes de presupuestar.",
  },
  {
    index: "02",
    title: "Ejecucion controlada",
    description: "Coordinamos frentes, suministro, supervision y secuencia constructiva con trazabilidad.",
  },
  {
    index: "03",
    title: "Pruebas y entrega",
    description: "Validamos presiones, evidencias y liberacion documental para una entrega verificable.",
  },
] as const;

export const projectTypes = [
  {
    id: "residencial",
    label: "Residencial",
    description: "Casas, torres, conjuntos habitacionales y proyectos de vivienda con requerimientos tecnicos claros.",
  },
  {
    id: "comercial",
    label: "Comercial",
    description: "Locales, plazas, oficinas, restaurantes y espacios de servicio con atencion mas formal.",
  },
  {
    id: "industrial",
    label: "Industrial",
    description: "Naves, lineas de proceso, cocinas tecnicas y activos con continuidad operativa.",
  },
  {
    id: "hotelero",
    label: "Hoteleria",
    description: "Amenidades, cuartos tecnicos y servicios con exigencia permanente de operacion.",
  },
] as const;

export const specialtyOptions = [
  {
    id: "diseno-calculo",
    label: "Diseno y calculo",
    description: "Memorias, calculo y criterios tecnicos para instalaciones hidrosanitarias y gas.",
  },
  {
    id: "hidrosanitario",
    label: "Instalaciones Hidrosanitarias",
    description: "Redes hidraulicas, sanitarias y pluviales con memorias y pruebas.",
  },
  {
    id: "gas",
    label: "Gas Natural y LP",
    description: "Conduccion, regulacion, ventilacion y liberacion de seguridad.",
  },
  {
    id: "albercas",
    label: "Instalaciones de albercas",
    description: "Vasos, filtrado, recirculacion y cuarto de maquinas.",
  },
  {
    id: "suavizadores",
    label: "Equipos suavizadores de agua",
    description: "Integracion de equipos para tratamiento y mejor condicion del agua.",
  },
  {
    id: "bombeo",
    label: "Equipos de bombeo hidraulico",
    description: "Bombas, control de presion y continuidad operativa del sistema.",
  },
  {
    id: "pruebas",
    label: "Pruebas Hidrostaticas",
    description: "Recepcion, presion, sosten y bitacora de evidencia.",
  },
] as const;

export const automationModules = [
  {
    code: "MOD-01",
    title: "BCA Lead Panel",
    price: "$1,800 MXN",
    description:
      "Panel privado para ordenar prospectos, ver capturas del Lead Terminal y evitar que las oportunidades se pierdan en correo o Excel.",
  },
  {
    code: "MOD-02",
    title: "WhatsApp Automatico",
    price: "$1,200 MXN + API Meta",
    description:
      "Confirmacion inmediata al cliente y alerta tecnica al asistente comercial con el resumen del proyecto para actuar rapido.",
  },
  {
    code: "MOD-03",
    title: "Pre-Cotizacion PDF",
    price: "$800 MXN",
    description:
      "Documento corporativo listo para adjuntar con especialidad, metraje y rango preliminar de inversion generado desde el sistema.",
  },
] as const;
