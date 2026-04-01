import { projectTypes, specialtyOptions } from "../content/siteContent";

export type ProjectTypeId = (typeof projectTypes)[number]["id"];
export type SpecialtyId = (typeof specialtyOptions)[number]["id"];

export type QuoteState = {
  projectType: ProjectTypeId | null;
  specialty: SpecialtyId | null;
  squareMeters: string;
};

export type ResultRange = {
  minimum: number;
  maximum: number;
};

export type LeadStatus = "Nuevo" | "En revision" | "Contactado";

export type LeadContact = {
  contactName: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  notes?: string;
};

export type LeadRecord = {
  id: string;
  contactName: string;
  company: string;
  channel: string;
  requestedAt: string;
  projectType: ProjectTypeId;
  projectTypeLabel: string;
  specialty: SpecialtyId;
  specialtyLabel: string;
  squareMeters: number;
  estimate: ResultRange;
  status: LeadStatus;
  location: string;
  phone: string;
  email: string;
  assignedTo: string;
  notes?: string;
};

export const initialQuoteState: QuoteState = {
  projectType: null,
  specialty: null,
  squareMeters: "",
};

export function calculateEstimate(projectType: ProjectTypeId, specialty: SpecialtyId, squareMeters: number): ResultRange {
  const specialtyConfig: Record<SpecialtyId, { min: number; max: number; mobilization: number }> = {
    hidrosanitario: { min: 310, max: 380, mobilization: 18000 },
    gas: { min: 290, max: 360, mobilization: 21000 },
    albercas: { min: 540, max: 690, mobilization: 28000 },
    pruebas: { min: 125, max: 170, mobilization: 15000 },
  };

  const projectMultiplier: Record<ProjectTypeId, number> = {
    corporativo: 1,
    industrial: 1.2,
    hotelero: 1.14,
    institucional: 1.22,
  };

  const range = specialtyConfig[specialty];
  const multiplier = projectMultiplier[projectType];

  return {
    minimum: Math.round((squareMeters * range.min * multiplier + range.mobilization) / 1000) * 1000,
    maximum: Math.round((squareMeters * range.max * multiplier + range.mobilization * 1.18) / 1000) * 1000,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

function getProjectTypeLabel(projectType: ProjectTypeId) {
  return projectTypes.find((item) => item.id === projectType)?.label ?? "Activo corporativo";
}

function getSpecialtyLabel(specialty: SpecialtyId) {
  return specialtyOptions.find((item) => item.id === specialty)?.label ?? "Especialidad tecnica";
}

export function buildLeadRecord(
  projectType: ProjectTypeId,
  specialty: SpecialtyId,
  squareMeters: number,
  estimate: ResultRange,
  contact: LeadContact,
): LeadRecord {
  const requestedAt = new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  const projectTypeLabel = getProjectTypeLabel(projectType);
  const specialtyLabel = getSpecialtyLabel(specialty);
  const suffix = `${squareMeters}`.padStart(3, "0").slice(-3);

  return {
    id: `BCA-${Date.now().toString().slice(-6)}`,
    contactName: contact.contactName,
    company: contact.company,
    channel: "Lead Terminal",
    requestedAt,
    projectType,
    projectTypeLabel,
    specialty,
    specialtyLabel,
    squareMeters,
    estimate,
    status: "Nuevo",
    location: contact.location,
    phone: contact.phone || `+52 81 0000 ${suffix}`,
    email: contact.email || `lead.${specialty}.${projectType}@bca-demo.mx`,
    assignedTo: "Mesa comercial BCA",
    notes: contact.notes,
  };
}
