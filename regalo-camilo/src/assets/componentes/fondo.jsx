import Carousel from 'react-bootstrap/Carousel';
import imagenFondo from '../../imagenes/bigben.jpg';
import imagenFondo2 from '../../imagenes/ChatGPT Image 14 mar 2026, 12_58_21 p.m..png';
import imagenFondo3 from '../../imagenes/ChatGPT Image 14 mar 2026, 01_10_02 p.m..png';
import CardHorizontal from './CardHorizontal.jsx';
import imagenCardCamilo from '../../imagenes/Captura de pantalla 2026-03-15 160019.png';
import imagenCardVivi from '../../imagenes/Captura de pantalla 2026-03-15 161632.png';

function FondoTripartito({ activeIndex, onSelect }) {

  const estiloPantalla = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center'
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={onSelect}
      wrap={false}
      interval={null}
      indicators={false}
    >
      <Carousel.Item>
        <div style={{
          ...estiloPantalla,
          justifyContent: 'flex-start',
          paddingTop: '4rem',
          backgroundImage: `url(${imagenFondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6), 1px 1px 2px #000'
        }}>
          <CardHorizontal
            imgSrc={imagenCardCamilo}
            title="Camilo Paredes"
            text="Profesor de inglés con más de 10 años de experiencia. Clases para todas las edades."
            buttonText=""
            cardStyle={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div style={{
          ...estiloPantalla,
          justifyContent: 'flex-start',
          paddingTop: '4rem',
          backgroundImage: `url(${imagenFondo2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6), 1px 1px 2px #000'
        }}>
          <div className="mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 7vw, 4rem)', lineHeight: 1.2, letterSpacing: '0.12em', textShadow: 'none' }}>
            <div style={{ padding: 0, margin: 0 }}>
              <span style={{ color: '#e63946' }}>APRENDE </span>
              <span style={{ color: '#1d3557' }}>INGLÉS</span>
            </div>
            <div style={{ padding: 0, margin: 0 }}>
              <span style={{ color: '#e63946' }}>CON </span>
              <span style={{ color: '#1d3557' }}>NOSOTROS</span>
            </div>
          </div>
          <p className="mb-3" style={{ fontSize: '1.15rem', fontWeight: 500, maxWidth: '90%', textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' }}>+ Somos Camilo y Vivi y estamos para ayudarte a aprender inglés, tenemos mas de 10 años dando clases de ingles en los mejores colegios de chile</p>
          <p className="mb-0" style={{ fontSize: '1.15rem', fontWeight: 500, maxWidth: '90%', textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' }}>Tenemos clases para todas las edades. Camilo se encuentra a la izquierda y Vivi a la derecha. ¡CONÓCELOS!</p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div style={{
          ...estiloPantalla,
          justifyContent: 'flex-start',
          paddingTop: '4rem',
          backgroundImage: `url(${imagenFondo3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6), 1px 1px 2px #000'
        }}>
          <CardHorizontal
            imgSrc={imagenCardVivi}
            title="Viviana Fernandez"
            text="Profesora de inglés con más de 10 años de experiencia. Clases para todas las edades."
            buttonText=""
            cardStyle={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)', marginTop: '6rem' }}
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default FondoTripartito;