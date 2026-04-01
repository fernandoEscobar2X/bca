export const navigationLinks = [
  { label: "Especialidades", href: "#especialidades" },
  { label: "Casos", href: "#casos" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Modulos", href: "#modulos" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const heroStats = [
  { value: "15+ anos", label: "operacion continua" },
  { value: "120+", label: "frentes atendidos" },
  { value: "24h", label: "respuesta preliminar" },
  { value: "NOM / NFPA", label: "criterio tecnico" },
] as const;

export const trustItems = [
  "Cumplimiento NOM",
  "ISO 9001",
  "Control documental",
  "Supervision en campo",
] as const;

export const services = [
  {
    code: "HS-01",
    title: "Instalaciones Hidrosanitarias",
    description:
      "Redes hidraulicas, sanitarias y pluviales con trazos coordinados, pendientes controladas y pruebas de recepcion.",
    accent: "hydro",
    bullets: ["Diseno y memorias", "Supervision de obra", "Pruebas y entrega"],
  },
  {
    code: "GI-02",
    title: "Gas Natural y LP",
    description:
      "Conduccion, regulacion y seguridad operacional para activos industriales, corporativos y de servicio continuo.",
    accent: "gold",
    bullets: ["Tuberias y regulacion", "Hermeticidad", "Liberacion tecnica"],
  },
  {
    code: "AL-03",
    title: "Albercas y Recirculacion",
    description:
      "Cuartos de maquinas, filtrado, balance hidraulico y continuidad operativa para amenidades de alto estandar.",
    accent: "hydro",
    bullets: ["Balance hidraulico", "Filtrado", "Operacion premium"],
  },
  {
    code: "PH-04",
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
    id: "corporativo",
    label: "Corporativo",
    description: "Oficinas, campus, inmuebles administrativos y espacios de alta ocupacion.",
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
  {
    id: "institucional",
    label: "Institucional",
    description: "Equipamiento educativo, hospitalario o publico con control riguroso de cumplimiento.",
  },
] as const;

export const specialtyOptions = [
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
    label: "Albercas y Recirculacion",
    description: "Vasos, filtrado, recirculacion y cuarto de maquinas.",
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
