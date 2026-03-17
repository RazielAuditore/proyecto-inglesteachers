import Card from 'react-bootstrap/Card';

function Tarjeta({ text = 'This is some text within a card body.' }) {
  return (
    <Card
      style={{
        width: '100%',
        maxWidth: '22rem',
        border: '1px solid rgba(255,255,255,0.25)',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(12px)',
        color: '#fff',
      }}
    >
      <Card.Body style={{ color: 'rgba(255,255,255,0.75)' }}>
        {text}
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;