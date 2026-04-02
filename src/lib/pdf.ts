import type { LeadRecord } from "./quote";
import { formatCurrency } from "./quote";

export async function downloadPrequotePdf(lead: LeadRecord) {
  const { jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    format: "a4",
    unit: "pt",
  });

  pdf.setFillColor(14, 17, 19);
  pdf.rect(0, 0, 595, 84, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(244, 244, 245);
  pdf.text("BCA INGENIERIA | PRE-COTIZACION", 40, 50);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(255, 255, 255);
  pdf.text(`Folio ${lead.id}`, 40, 68);

  pdf.setDrawColor(23, 26, 29);
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(40, 108, 515, 122, 0, 0, "FD");

  pdf.setTextColor(0, 168, 232);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("RESUMEN TECNICO", 56, 132);

  pdf.setTextColor(14, 17, 19);
  pdf.setFontSize(21);
  pdf.text(lead.specialtyLabel, 56, 162);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(`Tipo de obra: ${lead.projectTypeLabel}`, 56, 188);
  pdf.text(`Metraje estimado: ${lead.squareMeters} m2`, 56, 208);

  pdf.setFillColor(201, 169, 44);
  pdf.rect(40, 260, 515, 84, "F");
  pdf.setTextColor(14, 17, 19);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("BANDA PRELIMINAR DE INVERSION", 56, 288);
  pdf.setFontSize(28);
  pdf.text(`${formatCurrency(lead.estimate.minimum)} - ${formatCurrency(lead.estimate.maximum)}`, 56, 322);

  pdf.setDrawColor(23, 26, 29);
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(40, 376, 515, 154, 0, 0, "FD");
  pdf.setTextColor(0, 168, 232);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("OBSERVACION COMERCIAL", 56, 400);

  pdf.setTextColor(23, 26, 29);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(
    "Cálculo algorítmico preliminar sujeto a levantamiento en sitio, revisión de rutas, restricciones, memorias y validación técnica final.",
    56,
    428,
    { maxWidth: 480, lineHeightFactor: 1.5 },
  );

  pdf.text(`Contacto demo: ${lead.email} | ${lead.phone}`, 56, 498);

  pdf.setFontSize(10);
  pdf.setTextColor(80, 84, 89);
  pdf.text("Documento demo generado desde el prototipo comercial BCA.", 40, 790);

  pdf.save(`BCA-pre-cotización-${lead.id}.pdf`);
}
