/**
 * store.js — Capa de acceso a datos usando Supabase (PostgreSQL)
 *
 * Antes este archivo guardaba las reservas en un archivo JSON local.
 * Ahora usa Supabase, que es una base de datos PostgreSQL en la nube.
 *
 * FLUJO GENERAL:
 *   1. createClient() conecta al proyecto Supabase usando URL + clave secreta
 *   2. Las funciones exportadas hacen consultas a la tabla "reservas"
 *   3. Supabase devuelve siempre un objeto { data, error }:
 *        - Si todo salió bien: data contiene el resultado, error es null
 *        - Si hubo error:      data es null,               error describe qué pasó
 */

import { createClient } from '@supabase/supabase-js';

// ─── Inicialización del cliente ───────────────────────────────────────────────
//
// createClient(url, key) crea la conexión al proyecto Supabase.
//
// • SUPABASE_URL  → la URL de tu proyecto, tiene la forma:
//                   https://xxxxxxxxxxxx.supabase.co
// • SUPABASE_KEY  → la "service_role" key (NO la anon key).
//                   La service_role ignora las políticas RLS y puede
//                   leer/escribir todo. Nunca la pongas en el frontend.
//
// Ambas las encontrás en: Supabase Dashboard → Settings → API
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ─── listarReservas ───────────────────────────────────────────────────────────
//
// Devuelve todas las reservas ordenadas de más nueva a más vieja.
// Usado por el endpoint GET /api/reservas (solo para revisar datos / admin).
export async function listarReservas() {
  const { data, error } = await supabase
    .from('reservas')           // tabla en Supabase
    .select('*')                // equivalente a SELECT * FROM reservas
    .order('created_at', { ascending: false }); // más recientes primero

  if (error) throw error; // el servidor lo captura y responde 500
  return data;
}

// ─── crearReserva ─────────────────────────────────────────────────────────────
//
// Inserta una nueva reserva. Si el horario ya está ocupado, Postgres
// lo rechaza automáticamente gracias a la restricción UNIQUE (profesor, fecha, hora)
// que definimos en la tabla — no necesitamos chequear duplicados a mano.
//
// Retorna:
//   { ok: true,  reserva: {...} }   → inserción exitosa
//   { ok: false, error: "..." }     → horario duplicado
export async function crearReserva(payload) {
  const { data, error } = await supabase
    .from('reservas')
    .insert(payload)   // INSERT INTO reservas (...) VALUES (...)
    .select()          // que nos devuelva la fila recién insertada
    .single();         // esperamos exactamente 1 fila de respuesta

  if (error) {
    // Código 23505 = violación de restricción UNIQUE en PostgreSQL.
    // Supabase lo reenvía tal cual desde Postgres.
    if (error.code === '23505') {
      return { ok: false, error: 'Ese horario ya está reservado para este profesor.' };
    }
    // Cualquier otro error de base de datos lo relanzamos
    // para que el servidor responda con 500.
    throw error;
  }

  return { ok: true, reserva: data };
}

// ─── horasOcupadas ────────────────────────────────────────────────────────────
//
// Devuelve la lista de horas ya reservadas para un profesor en una fecha dada.
// El frontend la usa al seleccionar un día en el calendario para
// deshabilitar los botones de hora que ya están tomados.
//
// Ejemplo de respuesta: ['09:00', '15:00']
export async function horasOcupadas(profesor, fecha) {
  const { data, error } = await supabase
    .from('reservas')
    .select('hora')            // solo necesitamos la columna "hora"
    .eq('profesor', profesor)  // WHERE profesor = ?
    .eq('fecha', fecha);       // AND fecha = ?

  if (error) throw error;
  return data.map((r) => r.hora); // convertimos [{hora:'09:00'}, ...] a ['09:00', ...]
}
