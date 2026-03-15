import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardHorizontal({ imgSrc, title, text, buttonText = 'Ver más', cardStyle = {} }) {
  return (
    <Card
      style={{
        width: '100%',
        maxWidth: '22rem',
        flexDirection: 'row',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.25)',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(12px)',
        color: '#fff',
        ...cardStyle
      }}
    >
      {imgSrc && (
        <Card.Img
          variant="top"
          src={imgSrc}
          style={{ width: '90px', minWidth: '90px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="d-flex flex-column justify-content-center">
        <Card.Title className="mb-2" style={{ color: 'inherit', fontSize: '1.1rem' }}>{title}</Card.Title>
        <Card.Text className="small mb-2" style={{ color: 'rgba(255,255,255,0.95)', margin: 0 }}>
          {text}
        </Card.Text>
        {buttonText && (
          <Button variant="light" size="sm" className="align-self-start" style={{ opacity: 0.9 }}>
            {buttonText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default CardHorizontal;
