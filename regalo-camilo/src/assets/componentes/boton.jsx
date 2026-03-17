const estilosBase = {
  padding: '0.5rem 1.25rem',
  borderRadius: '0.375rem',
  fontWeight: 600,
  fontSize: '0.95rem',
  border: 'none',
  cursor: 'pointer',
  backdropFilter: 'blur(12px)',
};

const estilosPorVariante = {
  glass: {
    ...estilosBase,
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.35)',
    color: '#fff',
  },
  rosa: {
    ...estilosBase,
    background: 'linear-gradient(135deg, rgba(255,182,193,0.45) 0%, rgba(255,105,180,0.35) 100%)',
    border: '1px solid rgba(255,182,193,0.55)',
    color: '#fff',
  },
};

function BotonAgendar({ variant = 'glass', onClick, className = '', style = {}, ...props }) {
  const estilos = { ...(estilosPorVariante[variant] ?? estilosPorVariante.glass), ...style };

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={estilos}
      {...props}
    >
      Agendar primera reunión
    </button>
  );
}

export default BotonAgendar;
