import type { LeadRecord, LeadStatus } from "../lib/quote";

export const demoAdminCredentials: { email: string; password: string } = {
  email: "admin@bca-demo.mx",
  password: "BCA2026",
};

export const leadStatusOptions: LeadStatus[] = ["Nuevo", "En revision", "Contactado"];

export const initialLeadRecords: LeadRecord[] = [
  {
    id: "BCA-240318",
    company: "Corporativo hidrosanitario Santa Lucia",
    channel: "Lead Terminal",
    requestedAt: "01 abr, 08:42",
    projectType: "corporativo",
    projectTypeLabel: "Corporativo",
    specialty: "hidrosanitario",
    specialtyLabel: "Instalaciones Hidrosanitarias",
    squareMeters: 320,
    estimate: { minimum: 117000, maximum: 146000 },
    status: "Nuevo",
    location: "Monterrey / San Pedro",
    phone: "+52 81 0000 0318",
    email: "control.santalucia@bca-demo.mx",
    assignedTo: "Mesa comercial BCA",
  },
  {
    id: "BCA-240271",
    company: "Cocina industrial aeropuerto norte",
    channel: "Lead Terminal",
    requestedAt: "31 mar, 17:10",
    projectType: "industrial",
    projectTypeLabel: "Industrial",
    specialty: "gas",
    specialtyLabel: "Gas Natural y LP",
    squareMeters: 180,
    estimate: { minimum: 84000, maximum: 102000 },
    status: "En revision",
    location: "Apodaca / Nuevo Leon",
    phone: "+52 81 0000 0271",
    email: "operacion.aeropuerto@bca-demo.mx",
    assignedTo: "Ing. Raul Medina",
  },
  {
    id: "BCA-239944",
    company: "Amenidad hotelera Costa Azul",
    channel: "Lead Terminal",
    requestedAt: "29 mar, 12:56",
    projectType: "hotelero",
    projectTypeLabel: "Hoteleria",
    specialty: "albercas",
    specialtyLabel: "Albercas y Recirculacion",
    squareMeters: 240,
    estimate: { minimum: 176000, maximum: 221000 },
    status: "Contactado",
    location: "Cancun / Zona hotelera",
    phone: "+52 81 0000 0944",
    email: "amenidades.costaazul@bca-demo.mx",
    assignedTo: "Ing. Andrea Flores",
  },
];

export const operationSignals = [
  "Lead capturado desde el simulador",
  "Alerta operativa por WhatsApp",
  "Pre-cotizacion PDF lista para enviar",
] as const;
