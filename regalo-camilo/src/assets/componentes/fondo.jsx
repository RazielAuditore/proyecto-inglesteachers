import { useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import imagenFondo from '../../imagenes/bigben.jpg';
import imagenFondo2 from '../../imagenes/ChatGPT Image 14 mar 2026, 12_58_21 p.m..png';
import imagenFondo3 from '../../imagenes/fondo londres definitivo.png';
import CardHorizontal from './CardHorizontal.jsx';
import Tarjeta from './card.jsx';
import AccordionPrecios from './AccordionPrecios.jsx';
import ModalAgendar from './agendar.jsx';
import imagenCardCamilo from '../../imagenes/Captura de pantalla 2026-03-15 160019.png';
import imagenCardVivi from '../../imagenes/Captura de pantalla 2026-03-15 161632.png';

// Botón circular flotante usado como indicador para bajar/subir en el swiper vertical del slide central.
const estiloIndicador = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '2.75rem',
  height: '2.75rem',
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.5)',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(6px)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
};

function FondoTripartito({ activeIndex, onSelect }) {
  const swiperCentroRef = useRef(null);
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
          paddingBottom: '2rem',
          overflowY: 'auto',
          backgroundImage: `url(${imagenFondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6), 1px 1px 2px #000'
        }}>
          <CardHorizontal
            imgSrc={imagenCardCamilo}
            title="Camilo Paredes"
            text="Profesor de inglés, de la Universidad Alberto Hurtado. He trabajado más de 10 años en el colegio Tajamar. Tengo 34 años."
            buttonText=""
            cardStyle={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          />
          <div style={{ marginTop: '1.5rem' }}>
            <Tarjeta text="Clases para reforzamiento escolar y/o universitario, práctica de conversación, apoyo a viajeros, preparación de exámenes internacionales, entre otros." />
          </div>
          <div style={{ marginTop: '1rem', width: '100%', maxWidth: '22rem' }}>
            <AccordionPrecios />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <ModalAgendar variant="glass" profesor="camilo" />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <Swiper
          direction="vertical"
          style={{ height: '100vh' }}
          observer
          observeParents
          onSwiper={(swiper) => { swiperCentroRef.current = swiper; }}
        >
          <SwiperSlide>
            <div style={{
              ...estiloPantalla,
              justifyContent: 'flex-start',
              paddingTop: '4rem',
              backgroundImage: `url(${imagenFondo2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6), 1px 1px 2px #000',
              position: 'relative'
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
              <p className="mb-3" style={{ fontSize: '1.15rem', fontWeight: 500, maxWidth: '90%', textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' }}>Queridos estudiantes de inglés, estamos acá para ayudarlos a caminar en este sendero de aprender inglés... LEARN WITH US</p>
              <p className="mb-0" style={{ fontSize: '1.15rem', fontWeight: 500, maxWidth: '90%', textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' }}>Tenemos clases para todas las edades. Camilo se encuentra a la izquierda y Vivi a la derecha. ¡CONÓCELOS!</p>

              <button
                type="button"
                onClick={() => swiperCentroRef.current?.slideNext()}
                aria-label="Ver planes"
                style={{ ...estiloIndicador, bottom: '1.5rem' }}
              >
                <BsChevronDown size={20} />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div style={{
              ...estiloPantalla,
              justifyContent: 'flex-start',
              paddingTop: '4rem',
              overflowY: 'auto',
              backgroundImage: `url(${imagenFondo2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6), 1px 1px 2px #000',
              position: 'relative'
            }}>
              <button
                type="button"
                onClick={() => swiperCentroRef.current?.slideTo(0)}
                aria-label="Volver"
                style={{ ...estiloIndicador, top: '5rem' }}
              >
                <BsChevronUp size={20} />
              </button>

              <div className="mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 6vw, 3rem)', letterSpacing: '0.1em', textShadow: 'none', marginTop: '2.5rem' }}>
                <span style={{ color: '#e63946' }}>NUESTROS </span>
                <span style={{ color: '#1d3557' }}>PLANES</span>
              </div>

              <div style={{ width: '100%', maxWidth: '22rem' }}>
                <AccordionPrecios />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </Carousel.Item>

      <Carousel.Item style={{ overflow: 'visible' }}>
        <div style={{
          ...estiloPantalla,
          justifyContent: 'flex-start',
          paddingTop: '5.5rem',
          paddingBottom: '2.5rem',
          overflowY: 'auto',
          minHeight: '100vh',
          height: 'auto',
          backgroundImage: `url(${imagenFondo3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6), 1px 1px 2px #000'
        }}>
          <CardHorizontal
            imgSrc={imagenCardVivi}
            title="Viviana Fernández"
            text="Profesora de inglés con más de 10 años de experiencia. Clases para todas las edades."
            buttonText=""
            cardStyle={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)', marginTop: '1rem' }}
          />
          <div style={{ marginTop: '1.25rem' }}>
            <Tarjeta text="Clases para reforzamiento escolar y/o universitario, práctica de conversación, apoyo a viajeros, preparación de exámenes internacionales, entre otros." />
          </div>
          <div style={{ marginTop: '0.9rem', width: '100%', maxWidth: '22rem' }}>
            <AccordionPrecios variant="rosa" />
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <ModalAgendar variant="rosa" profesor="vivi" />
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default FondoTripartito;