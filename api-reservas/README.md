# API reservas (backend aparte)

Servidor **Express** para crear reservas y consultar horarios ocupados. Los datos se guardan en `data/reservas.json` (ideal para desarrollo; en producción puedes cambiar a MySQL).

## Requisitos

- Node.js 18+

## Instalar y ejecutar

```bash
cd api-reservas
npm install
npm run dev
```

Por defecto escucha en **http://localhost:8080**.

## Variables de entorno (opcional)

- `PORT` — puerto (default 8080).
- `CORS_ORIGIN` — orígenes permitidos separados por coma, ej. `http://localhost:5173,https://tudominio.com`.

## Endpoints

- `GET /health` — comprobar que el servidor vive.
- `GET /api/reservas/ocupadas?profesor=camilo|vivi&fecha=YYYY-MM-DD` — horas ya reservadas.
- `POST /api/reservas` — crear reserva. JSON:

```json
{
  "profesor": "camilo",
  "fecha": "2026-03-30",
  "hora": "10:00",
  "nombre": "Juan",
  "email": "juan@mail.com",
  "telefono": "+56912345678",
  "notas": ""
}
```

- `GET /api/reservas` — listado (solo para pruebas).

## Conectar el front (Vite)

En `regalo-camilo` crea `.env.local`:

```
VITE_API_URL=http://localhost:8080
```

Luego desde React haz `fetch` a `${import.meta.env.VITE_API_URL}/api/reservas` (y CORS debe incluir el origen del front).
