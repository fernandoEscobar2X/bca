# Arquitectura Recomendada

Fecha: 2026-04-01

Estado: base propuesta pendiente de confirmar con el cliente si se implementaran modulos extra.

## Veredicto

- Para producto final, ya no basta con SPA visual.
- Para este cliente, el patron correcto es `modular monolith`, no microservicios.
- La parte de seguridad marcada en la auditoria es valida si entran `Lead Panel + WhatsApp + PDF`.
- Donde conviene ajustar la recomendacion es en `cuando separar backend` y en `que meter desde dia 1`.

## Lo que si compraria tal cual

- `Next.js` para el frontend final.
- `TypeScript + Zod + Prisma + PostgreSQL`.
- `React Hook Form` para formularios.
- `Arquitectura modular por dominio`.
- `Service layer`.
- `Auditoria`, `rate limiting`, `auth seria`, `webhook verification`, `DB privada`.
- No sobredisenar con CQRS, microservicios o DDD extremo.

## Lo que yo afinaria

1. `Fastify` me gusta mas que Express para este caso.
   - Mejor ergonomia con TypeScript.
   - Mas limpio para APIs y webhooks.
   - Muy buen fit con validacion y performance.
   - Express sigue siendo valido si el equipo ya lo domina y quieres velocidad de entrega.

2. No separaria demasiado pronto el sistema.
   - Si el MVP es corto, puedes hacer `Next.js + PostgreSQL + Prisma + auth` y resolver bastante.
   - Si si van fuerte con `webhooks`, `PDFs`, `notificaciones` y procesos asincronos, entonces si conviene `Next + backend Fastify`.

3. Agregaria dos piezas que faltan en esa auditoria:
   - `Jobs/queue` para WhatsApp y PDFs.
   - `Observabilidad` real: logs estructurados y Sentry.

## Arquitectura recomendada

- `Frontend`: Next.js App Router
- `Backend`: Fastify + TypeScript
- `DB`: PostgreSQL + Prisma
- `Validacion`: Zod compartida
- `Forms`: React Hook Form + Zod Resolver
- `Auth`: cookie segura o sesion HttpOnly
- `Jobs`: BullMQ o equivalente si hay automatizaciones
- `Storage`: S3/R2 para PDFs si se van a descargar o reenviar
- `Infra`: Docker + Nginx/Caddy + HTTPS + backups

## Modulos de dominio

- `prospects`
- `quotes`
- `auth`
- `notifications`
- `pdfs`
- `audit`

## Patron limpio

- `routes/controllers`
- `use-cases`
- `repositories`
- `services`
- `schemas`
- `entities`

Eso da clean code sin caer en arquitectura enterprise de adorno.

## Decision recomendada

Si esto ya va a pasar de demo a software comercial, la recomendacion es:

1. Mantener el prototipo actual solo como pieza de venta.
2. Construir el producto final aparte en `Next.js + Fastify + PostgreSQL`.
3. Reutilizar UI, copy y sistema visual del prototipo.
4. Empezar con `Lead Terminal + Lead Panel`.
5. Despues montar `WhatsApp` y `PDF`.

## Resumen corto

La auditoria esta bien.

Formula recomendada:

`Next.js + Fastify + TypeScript + Zod + Prisma + PostgreSQL + arquitectura modular por dominio + seguridad seria + sin sobrediseno`

## Nota pendiente

Falta definir con el cliente si el alcance final incluira:

- `BCA Lead Panel`
- `Integracion WhatsApp`
- `Motor de Pre-Cotizaciones PDF`

Si esos modulos entran, esta arquitectura pasa de recomendada a practicamente obligatoria.
