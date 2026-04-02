export const navigationLinks = [
  { label: "Especialidades", href: "#especialidades" },
  { label: "Casos", href: "#casos" },
  { label: "Cotizador", href: "#cotizador" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const heroStats = [
  { value: "15+ años", label: "operación continua" },
  { value: "120+", label: "frentes atendidos" },
  { value: "24h", label: "respuesta preliminar" },
  { value: "NOM / NFPA", label: "criterio técnico" },
] as const;

export const trustItems = [
  "Residencial, comercial, industrial y hotelero",
  "Gas LP y natural, bombeo y pruebas",
  "Respuesta preliminar con validación en sitio",
  "Presentación comercial más seria para cada proyecto",
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
    title: "WhatsApp Automático",
    description: "Confirma la recepción al cliente y alerta al equipo para responder rápido sin depender del correo.",
    bullets: ["Respuesta inmediata", "Menos leads perdidos", "Aviso interno al momento"],
  },
  {
    code: "04",
    title: "Pre-Cotización PDF",
    description: "Arma un documento listo para enviar con datos del proyecto y banda preliminar de inversión.",
    bullets: ["Formato corporativo", "Listo para adjuntar", "Ahorra tiempo comercial"],
  },
] as const;

export const benefitItems = [
  {
    title: "Menos prospectos perdidos",
    description: "Todo entra a una sola bandeja y deja de depender de hojas de Excel o mensajes sueltos.",
  },
  {
    title: "Respuesta más rápida",
    description: "El equipo puede llamar, enviar PDF o confirmar por WhatsApp desde el mismo recorrido demo.",
  },
  {
    title: "Mejor perfilado comercial",
    description: "Cada lead ya llega con tipo de obra, especialidad, metraje y datos suficientes para seguir.",
  },
  {
    title: "Seguimiento más claro",
    description: "El estado del lead y la siguiente acción se entienden al instante sin explicar demasiado la interfaz.",
  },
] as const;

export const services = [
  {
    code: "DC-01",
    title: "Diseño y cálculo de instalaciones hidrosanitarias y gas",
    description:
      "Memorias, criterios de cálculo, especificaciones y definición técnica para proyectos que requieren orden desde la etapa inicial.",
    accent: "hydro",
    bullets: ["Memorias y cálculo", "Criterio normativo", "Bases para ejecución"],
  },
  {
    code: "HS-02",
    title: "Instalaciones hidrosanitarias en residencial, comercial e industrial",
    description:
      "Redes hidráulicas, sanitarias y pluviales con trazos claros, pendientes controladas y mejor coordinación en obra.",
    accent: "hydro",
    bullets: ["Redes hidráulicas", "Redes sanitarias", "Instalación en obra"],
  },
  {
    code: "GA-03",
    title: "Instalaciones de gas LP y natural",
    description:
      "Conducción, regulación y seguridad para proyectos residenciales, comerciales e industriales con liberación técnica.",
    accent: "gold",
    bullets: ["Tuberías y regulación", "Hermeticidad", "Liberación técnica"],
  },
  {
    code: "AL-04",
    title: "Instalaciones hidrosanitarias de albercas",
    description:
      "Integración hidráulica para vasos, filtrado, recirculación y cuartos de máquinas con mejor control de operación.",
    accent: "hydro",
    bullets: ["Recirculación", "Cuarto de máquinas", "Filtrado"],
  },
  {
    code: "SA-05",
    title: "Instalación de equipos suavizadores de agua",
    description:
      "Integración de equipos de tratamiento para mejorar condición del agua y proteger la operación del sistema hidráulico.",
    accent: "hydro",
    bullets: ["Tratamiento de agua", "Conexión de equipos", "Puesta en marcha"],
  },
  {
    code: "BH-06",
    title: "Instalación de equipos de bombeo hidráulico",
    description:
      "Montaje y conexión de equipos para presión, distribución y continuidad operativa en distintos tipos de proyecto.",
    accent: "gold",
    bullets: ["Equipos de bombeo", "Presión y control", "Operación continua"],
  },
  {
    code: "PH-07",
    title: "Pruebas Hidrostáticas",
    description:
      "Protocolos de verificación para recepción de redes, detección de fugas y cierre documental previo a entrega.",
    accent: "gold",
    bullets: ["Bitácora técnica", "Presión y sostén", "Evidencia final"],
  },
] as const;

export const projects = [
  {
    title: "Adecuación hidrosanitaria para corporativo multinivel",
    location: "Monterrey, Nuevo León",
    summary: "Levantamiento, coordinación y ejecución por etapas para no interrumpir la operación del inmueble.",
    tags: ["Hidrosanitario", "Supervisión", "Entrega por fases"],
  },
  {
    title: "Red de gas para cocina industrial y servicios",
    location: "Guadalajara, Jalisco",
    summary: "Regulación, hermeticidad y liberación técnica con criterios de seguridad y puesta en marcha.",
    tags: ["Gas LP", "Seguridad", "Puesta en marcha"],
  },
  {
    title: "Sistema de recirculación para amenidad hotelera",
    location: "Cancún, Quintana Roo",
    summary: "Cuarto de máquinas, filtrado y balance hidráulico con continuidad operativa y mantenimiento previsto.",
    tags: ["Albercas", "Filtrado", "Mantenimiento"],
  },
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Levantamiento técnico",
    description: "Detectamos rutas, restricciones, interferencias y variables normativas antes de presupuestar.",
  },
  {
    index: "02",
    title: "Ejecución controlada",
    description: "Coordinamos frentes, suministro, supervisión y secuencia constructiva con trazabilidad.",
  },
  {
    index: "03",
    title: "Pruebas y entrega",
    description: "Validamos presiones, evidencias y liberación documental para una entrega verificable.",
  },
] as const;

export const projectTypes = [
  {
    id: "residencial",
    label: "Residencial",
    description: "Casas, torres, conjuntos habitacionales y proyectos de vivienda con requerimientos técnicos claros.",
  },
  {
    id: "comercial",
    label: "Comercial",
    description: "Locales, plazas, oficinas, restaurantes y espacios de servicio con atención más formal.",
  },
  {
    id: "industrial",
    label: "Industrial",
    description: "Naves, líneas de proceso, cocinas técnicas y activos con continuidad operativa.",
  },
  {
    id: "hotelero",
    label: "Hotelería",
    description: "Amenidades, cuartos técnicos y servicios con exigencia permanente de operación.",
  },
] as const;

export const specialtyOptions = [
  {
    id: "diseno-calculo",
    label: "Diseño y cálculo",
    description: "Memorias, cálculo y criterios técnicos para instalaciones hidrosanitarias y gas.",
  },
  {
    id: "hidrosanitario",
    label: "Instalaciones Hidrosanitarias",
    description: "Redes hidráulicas, sanitarias y pluviales con memorias y pruebas.",
  },
  {
    id: "gas",
    label: "Gas Natural y LP",
    description: "Conducción, regulación, ventilación y liberación de seguridad.",
  },
  {
    id: "albercas",
    label: "Instalaciones de albercas",
    description: "Vasos, filtrado, recirculación y cuarto de máquinas.",
  },
  {
    id: "suavizadores",
    label: "Equipos suavizadores de agua",
    description: "Integración de equipos para tratamiento y mejor condición del agua.",
  },
  {
    id: "bombeo",
    label: "Equipos de bombeo hidráulico",
    description: "Bombas, control de presión y continuidad operativa del sistema.",
  },
  {
    id: "pruebas",
    label: "Pruebas Hidrostáticas",
    description: "Recepción, presión, sostén y bitácora de evidencia.",
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
    title: "WhatsApp Automático",
    price: "$1,200 MXN + API Meta",
    description:
      "Confirmación inmediata al cliente y alerta técnica al asistente comercial con el resumen del proyecto para actuar rápido.",
  },
  {
    code: "MOD-03",
    title: "Pre-Cotización PDF",
    price: "$800 MXN",
    description:
      "Documento corporativo listo para adjuntar con especialidad, metraje y rango preliminar de inversión generado desde el sistema.",
  },
] as const;
