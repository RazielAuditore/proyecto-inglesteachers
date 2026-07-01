/**
 * index.js — Servidor Express (API REST de reservas)
 *
 * Express es un framework para crear servidores HTTP en Node.js.
 * Este archivo define las "rutas" (endpoints) que el frontend puede llamar.
 *
 * RUTAS DISPONIBLES:
 *   GET  /health                              → chequeo de vida del servidor
 *   GET  /api/reservas/ocupadas?profesor=&fecha=  → horas ya reservadas ese día
 *   POST /api/reservas                        → crear una nueva reserva
 *   GET  /api/reservas                        → listar todas (solo admin/testing)
 */

import express from 'express';
import cors from 'cors';
import { crearReserva, horasOcupadas, listarReservas } from './store.js';

const app = express();

// El puerto viene de la variable de entorno PORT (que Render asigna
// automáticamente) o 8080 por defecto en desarrollo local.
const PORT = Number(process.env.PORT) || 8080;

// ─── CORS ─────────────────────────────────────────────────────────────────────
//
// CORS (Cross-Origin Resource Sharing) es una medida de seguridad del navegador.
// Sin esto, el frontend en localhost:5173 no podría llamar a la API en localhost:8080
// porque tienen orígenes distintos (distinto puerto = distinto origen).
//
// En producción, CORS_ORIGIN debe ser la URL de tu frontend en producción,
// por ejemplo: https://mi-app.onrender.com
// Podés poner varias URLs separadas por coma en la variable de entorno.
const origenes = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: origenes,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// express.json() hace que Express pueda leer el body de los POST
// que lleguen con Content-Type: application/json.
app.use(express.json());

// ─── GET /health ──────────────────────────────────────────────────────────────
//
// Endpoint simple que Render usa para verificar que el servidor está vivo.
// Si responde 200, Render considera que el proceso está sano.
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// ─── GET /api/reservas/ocupadas ───────────────────────────────────────────────
//
// El frontend llama esto cuando el usuario selecciona un día en el calendario,
// para saber qué horas ya están reservadas y deshabilitar esos botones.
//
// Query params esperados:
//   ?profesor=camilo   (o "vivi")
//   &fecha=2026-07-15  (formato YYYY-MM-DD)
//
// Respuesta exitosa:
//   { profesor: "camilo", fecha: "2026-07-15", horasOcupadas: ["09:00", "15:00"] }
app.get('/api/reservas/ocupadas', async (req, res) => {
  const { profesor, fecha } = req.query;

  // Validamos que lleguen los dos parámetros
  if (!profesor || !fecha) {
    return res.status(400).json({ error: 'Faltan query params: profesor y fecha (YYYY-MM-DD).' });
  }

  const p = String(profesor).toLowerCase();
  if (p !== 'camilo' && p !== 'vivi') {
    return res.status(400).json({ error: 'profesor debe ser "camilo" o "vivi".' });
  }

  try {
    const horas = await horasOcupadas(p, String(fecha));
    res.json({ profesor: p, fecha, horasOcupadas: horas });
  } catch (err) {
    // Si Supabase falla (ej: credenciales mal, red caída), respondemos 500
    console.error('[ocupadas] error:', err.message);
    res.status(500).json({ error: 'Error al consultar disponibilidad.' });
  }
});

// ─── POST /api/reservas ───────────────────────────────────────────────────────
//
// Crea una nueva reserva. El frontend lo llama cuando el usuario completa
// el formulario del modal y hace clic en "Aceptar".
//
// Body JSON esperado:
//   {
//     profesor: "camilo",
//     fecha:    "2026-07-15",
//     hora:     "10:00",
//     nombre:   "Ana González",
//     email:    "ana@ejemplo.com",
//     telefono: "+56 9 1234 5678",
//     notas:    ""           ← opcional
//   }
//
// Códigos de respuesta:
//   201 → reserva creada exitosamente (devuelve el objeto de la reserva)
//   400 → datos inválidos o faltantes
//   409 → conflicto: ese horario ya estaba reservado
//   500 → error interno del servidor
app.post('/api/reservas', async (req, res) => {
  const { profesor, fecha, hora, nombre, email, telefono, notas } = req.body || {};

  const p = String(profesor || '').toLowerCase();
  if (p !== 'camilo' && p !== 'vivi') {
    return res.status(400).json({ error: 'profesor debe ser "camilo" o "vivi".' });
  }

  // Validamos que estén todos los campos obligatorios
  if (!fecha || !hora || !nombre || !email || !telefono) {
    return res.status(400).json({ error: 'Faltan campos: fecha, hora, nombre, email o teléfono.' });
  }

  try {
    const result = await crearReserva({
      profesor: p,
      fecha:    String(fecha),
      hora:     String(hora),
      nombre:   String(nombre).trim(),
      email:    String(email).trim(),
      telefono: String(telefono).trim(),
      notas:    notas != null ? String(notas).trim() : '',
    });

    // store.js devuelve { ok: false } cuando el horario ya estaba ocupado
    if (!result.ok) {
      return res.status(409).json({ error: result.error });
    }

    // 201 Created → la reserva se guardó correctamente
    res.status(201).json(result.reserva);
  } catch (err) {
    console.error('[crear reserva] error:', err.message);
    res.status(500).json({ error: 'Error interno al guardar la reserva.' });
  }
});

// ─── GET /api/reservas ────────────────────────────────────────────────────────
//
// Devuelve TODAS las reservas. Solo para revisar datos o panel admin básico.
// En producción conviene proteger esto con algún token o eliminarlo.
app.get('/api/reservas', async (_req, res) => {
  try {
    const reservas = await listarReservas();
    res.json(reservas);
  } catch (err) {
    console.error('[listar reservas] error:', err.message);
    res.status(500).json({ error: 'Error al listar reservas.' });
  }
});

// ─── Inicio del servidor ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`API reservas en http://localhost:${PORT}`);
  console.log(`CORS permitido para: ${origenes.join(', ')}`);
});
