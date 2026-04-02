import type { LeadRecord, LeadStatus } from "../lib/quote";

export const demoAdminCredentials: { email: string; password: string } = {
  email: "admin@bca-demo.mx",
  password: "BCA2026",
};

export const leadStatusOptions: LeadStatus[] = ["Nuevo", "En revisión", "Contactado"];

export const initialLeadRecords: LeadRecord[] = [
  {
    id: "BCA-240318",
    contactName: "Luis Herrera",
    company: "Corporativo hidrosanitario Santa Lucía",
    channel: "Lead Terminal",
    requestedAt: "01 abr, 08:42",
    projectType: "comercial",
    projectTypeLabel: "Comercial",
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
    contactName: "Patricia Vela",
    company: "Cocina industrial aeropuerto norte",
    channel: "Lead Terminal",
    requestedAt: "31 mar, 17:10",
    projectType: "industrial",
    projectTypeLabel: "Industrial",
    specialty: "gas",
    specialtyLabel: "Gas Natural y LP",
    squareMeters: 180,
    estimate: { minimum: 84000, maximum: 102000 },
    status: "En revisión",
    location: "Apodaca / Nuevo León",
    phone: "+52 81 0000 0271",
    email: "operacion.aeropuerto@bca-demo.mx",
    assignedTo: "Ing. Raúl Medina",
  },
  {
    id: "BCA-239944",
    contactName: "Carlos Mena",
    company: "Amenidad hotelera Costa Azul",
    channel: "Lead Terminal",
    requestedAt: "29 mar, 12:56",
    projectType: "hotelero",
    projectTypeLabel: "Hotelería",
    specialty: "albercas",
    specialtyLabel: "Instalaciones de albercas",
    squareMeters: 240,
    estimate: { minimum: 176000, maximum: 221000 },
    status: "Contactado",
    location: "Cancún / Zona hotelera",
    phone: "+52 81 0000 0944",
    email: "amenidades.costaazul@bca-demo.mx",
    assignedTo: "Ing. Andrea Flores",
  },
];

export type OperationEvent = {
  id: string;
  title: string;
  detail: string;
  time: string;
  accent: "cyan" | "gold" | "dark";
};

export const initialOperationEvents: OperationEvent[] = [
  {
    id: "evt-001",
    title: "Lead capturado",
    detail: "Corporativo hidrosanitario Santa Lucía entró al panel con estado Nuevo.",
    time: "08:42",
    accent: "cyan",
  },
  {
    id: "evt-002",
    title: "WhatsApp confirmado",
    detail: "La mesa comercial recibió alerta del frente industrial aeropuerto norte.",
    time: "17:16",
    accent: "gold",
  },
  {
    id: "evt-003",
    title: "PDF emitido",
    detail: "La pre-cotización de Costa Azul quedó lista para adjuntar a seguimiento.",
    time: "13:02",
    accent: "dark",
  },
];
