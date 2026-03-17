const estiloGlass = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.18)',
  color: '#fff',
};

const estiloRosa = {
  background: 'linear-gradient(135deg, rgba(255,182,193,0.35) 0%, rgba(255,105,180,0.2) 50%, rgba(255,182,193,0.25) 100%)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,182,193,0.4)',
  color: '#fff',
};

const cuerpoRosa = {
  background: 'linear-gradient(180deg, rgba(255,182,193,0.3) 0%, rgba(255,105,180,0.25) 100%)',
  backdropFilter: 'blur(12px)',
  borderTop: '1px solid rgba(255,182,193,0.35)',
  color: '#fff',
  fontSize: '0.95rem',
  lineHeight: 1.5,
  padding: '0.75rem 1rem',
};

function AccordionPrecios({ variant = 'glass' }) {
  const esRosa = variant === 'rosa';
  const estiloCaja = esRosa ? estiloRosa : estiloGlass;
  const estiloCuerpo = esRosa ? cuerpoRosa : {
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255,255,255,0.18)',
    color: '#fff',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    padding: '0.75rem 1rem',
  };

  return (
    <div style={{ width: '100%', maxWidth: '22rem' }}>
      <div style={{ ...estiloCaja, marginBottom: '0.5rem', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', fontWeight: 500 }}>
          Clases individuales
        </div>
        <div style={estiloCuerpo}>
          <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>$25.000</span>
          <span style={{ opacity: 0.95 }}> por clase</span>
          <br />
          <span style={{ fontSize: '0.85em', opacity: 0.9 }}>Paquetes desde 4 hasta 20 clases.</span>
        </div>
      </div>
    </div>
  );
}

export default AccordionPrecios;
