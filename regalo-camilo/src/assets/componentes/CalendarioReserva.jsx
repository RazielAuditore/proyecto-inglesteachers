import { useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format, startOfToday } from 'date-fns';
import 'react-day-picker/style.css';

const HORAS = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const contenedorBase = (compact) => ({
  width: '100%',
  /* El DayPicker necesita ~7 celdas; 15.5rem las aplaba y se superponía el mes */
  maxWidth: compact ? 'min(100%, 19.5rem)' : '22rem',
  borderRadius: '0.375rem',
  padding: compact ? '0.55rem 0.6rem' : '1rem',
  backdropFilter: 'blur(12px)',
});

function contenedorPorVariante(compact) {
  const base = contenedorBase(compact);
  return {
    glass: {
      ...base,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.25)',
      color: '#fff',
    },
    rosa: {
      ...base,
      background: 'linear-gradient(135deg, rgba(255,182,193,0.25) 0%, rgba(255,105,180,0.15) 100%)',
      border: '1px solid rgba(255,182,193,0.4)',
      color: '#fff',
    },
  };
}

function botonHoraStyle({ activa, ocupada, variant, compact }) {
  const base = {
    padding: compact ? '0.18rem 0.4rem' : '0.35rem 0.6rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    cursor: ocupada ? 'not-allowed' : 'pointer',
    fontSize: compact ? '0.7rem' : '0.85rem',
    fontWeight: activa ? 600 : 400,
    opacity: ocupada ? 0.38 : 1,
    textDecoration: ocupada ? 'line-through' : 'none',
  };
  if (variant === 'rosa') {
    return {
      ...base,
      background: activa ? 'rgba(255,105,180,0.45)' : 'rgba(255,255,255,0.12)',
      borderColor: activa ? 'rgba(255,182,193,0.8)' : 'rgba(255,182,193,0.35)',
      color: '#fff',
    };
  }
  return {
    ...base,
    background: activa ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
    borderColor: activa ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
    color: '#fff',
  };
}

function CalendarioReserva({
  variant = 'glass',
  titulo = 'Elige día y hora',
  compact = false,
  dia,
  hora,
  onDiaChange,
  onHoraChange,
  profesor = '',
}) {
  const [diaInner, setDiaInner] = useState(undefined);
  const [horaInner, setHoraInner] = useState(null);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [cargandoHoras, setCargandoHoras] = useState(false);
  const esControlado = onDiaChange != null && onHoraChange != null;
  const diaVal = esControlado ? dia : diaInner;
  const horaVal = esControlado ? hora : horaInner;
  const setDia = esControlado ? onDiaChange : setDiaInner;
  const setHora = esControlado ? onHoraChange : setHoraInner;

  useEffect(() => {
    if (!diaVal || !profesor) {
      setHorasOcupadas([]);
      return;
    }
    const fecha = format(diaVal, 'yyyy-MM-dd');
    setCargandoHoras(true);
    fetch(`${API_BASE}/api/reservas/ocupadas?profesor=${profesor}&fecha=${fecha}`)
      .then((r) => (r.ok ? r.json() : { horasOcupadas: [] }))
      .then((data) => {
        const ocupadas = data.horasOcupadas ?? [];
        setHorasOcupadas(ocupadas);
        if (horaVal && ocupadas.includes(horaVal)) setHora(null);
      })
      .catch(() => setHorasOcupadas([]))
      .finally(() => setCargandoHoras(false));
  }, [diaVal, profesor]);

  const paletas = contenedorPorVariante(compact);
  const estiloCaja = paletas[variant] ?? paletas.glass;

  const resumen = useMemo(() => {
    if (!diaVal || !horaVal) return null;
    const fechaTxt = format(diaVal, "EEEE d 'de' MMMM", { locale: es });
    return `${fechaTxt} · ${horaVal}`;
  }, [diaVal, horaVal]);

  return (
    <div
      className={`calendario-reserva calendario-reserva--${variant}${compact ? ' calendario-reserva--compact' : ''}`}
      style={estiloCaja}
    >
      <div
        className="fw-semibold mb-1 text-start"
        style={{ fontSize: compact ? '0.75rem' : '0.875rem' }}
      >
        {titulo}
      </div>
      <div className="d-flex justify-content-center">
        <DayPicker
          mode="single"
          selected={diaVal}
          onSelect={setDia}
          disabled={{ before: startOfToday() }}
          locale={es}
          weekStartsOn={1}
        />
      </div>
      <div className={compact ? 'mt-1' : 'mt-2'}>
        <div
          className="mb-1 text-start opacity-75"
          style={{ fontSize: compact ? '0.68rem' : '0.875rem' }}
        >
          {cargandoHoras ? 'Consultando disponibilidad…' : 'Horarios disponibles'}
        </div>
        <div className="d-flex flex-wrap gap-1 justify-content-start">
          {HORAS.map((h) => {
            const ocupada = horasOcupadas.includes(h);
            return (
              <button
                key={h}
                type="button"
                disabled={!diaVal || ocupada || cargandoHoras}
                onClick={() => setHora(h)}
                style={botonHoraStyle({ activa: horaVal === h, ocupada, variant, compact })}
              >
                {h}
              </button>
            );
          })}
        </div>
      </div>
      {resumen && (
        <div
          className="mt-2 pt-2 text-start"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            fontSize: compact ? '0.68rem' : '0.875rem',
          }}
        >
          <span className="opacity-75">Selección: </span>
          {resumen}
        </div>
      )}
    </div>
  );
}

export default CalendarioReserva;
