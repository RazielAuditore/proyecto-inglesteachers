-- ─────────────────────────────────────────────────────────────────────────────
-- supabase_setup.sql
--
-- Ejecutá este script UNA SOLA VEZ en el SQL Editor de Supabase
-- para crear la tabla de reservas.
--
-- Cómo ejecutarlo:
--   1. Abrí tu proyecto en https://supabase.com
--   2. Andá a la sección "SQL Editor" en el menú lateral
--   3. Pegá este código y hacé clic en "Run"
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE reservas (

  -- UUID generado automáticamente por Postgres.
  -- Es el identificador único de cada reserva.
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Solo puede ser 'camilo' o 'vivi'.
  -- CHECK es una restricción que Postgres valida en cada INSERT/UPDATE.
  profesor TEXT NOT NULL CHECK (profesor IN ('camilo', 'vivi')),

  -- Fecha de la clase en formato YYYY-MM-DD (tipo DATE de Postgres).
  fecha DATE NOT NULL,

  -- Hora de la clase en formato HH:MM (ej: '09:00', '15:00').
  hora TEXT NOT NULL,

  -- Datos del alumno
  nombre   TEXT NOT NULL,
  email    TEXT NOT NULL,
  telefono TEXT NOT NULL,
  notas    TEXT NOT NULL DEFAULT '',

  -- Timestamp automático del momento en que se insertó la fila.
  -- "WITH TIME ZONE" guarda también la zona horaria.
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- ── Clave única compuesta ──────────────────────────────────────────────────
  -- Esta restricción garantiza que no puede haber dos reservas con el mismo
  -- profesor + fecha + hora. Si se intenta insertar un duplicado,
  -- Postgres lo rechaza con el código de error 23505.
  -- Esto reemplaza el chequeo manual que hacíamos antes en JavaScript.
  CONSTRAINT reservas_sin_duplicados UNIQUE (profesor, fecha, hora)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- ÍNDICE de rendimiento (opcional pero recomendado)
--
-- Cuando el frontend pregunta las horas ocupadas de un profesor en una fecha,
-- Postgres busca filas por (profesor, fecha). Sin índice haría un "full scan"
-- (revisar toda la tabla). Con este índice la búsqueda es instantánea.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE INDEX idx_reservas_profesor_fecha ON reservas (profesor, fecha);


-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
--
-- Supabase activa RLS por defecto en tablas nuevas.
-- Con RLS activo y sin políticas definidas, NADIE puede leer ni escribir
-- la tabla desde el cliente JS con la "anon key".
--
-- En nuestro caso usamos la "service_role key" en el servidor Express,
-- que OMITE RLS por completo — así que no necesitamos definir políticas.
-- Pero es buena práctica activar RLS igual para proteger la tabla si
-- en algún momento alguien intenta accederla con la anon key.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
