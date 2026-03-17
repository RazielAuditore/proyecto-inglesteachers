// Contactos para usar en el footer:
// - Camilo: https://www.instagram.com/camilongous/
// - Charming Locked: https://www.instagram.com/charminglocked/

const CONTACTOS = {
  instagramCamilo: "https://www.instagram.com/camilongous/",
  instagramCharmingLocked: "https://www.instagram.com/charminglocked/",
};

import { BsInstagram } from "react-icons/bs";

const FOOTER_PALETAS = {
  // Pantalla 1 - Camilo (Big Ben): cálidos, tierra, ámbar (tono más claro)
  0: {
    background: 'linear-gradient(135deg, #4a3020 0%, #5c4030 50%, #6d5240 100%)',
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
  // Pantalla 2 - Centro: gris oscuro (por defecto)
  1: {
    background: '#212529',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  // Pantalla 3 - Viviana: tonos suaves, rosados/mauve (tono más claro)
  2: {
    background: 'linear-gradient(135deg, #5c4550 0%, #6d5565 50%, #7d6575 100%)',
    borderColor: 'rgba(255, 182, 193, 0.35)',
  },
};

export function FooterGeneral({ pantallaActiva = 1 }) {
  const soloCamilo = pantallaActiva === 0;
  const soloVivi = pantallaActiva === 2;
  const soloNormal = pantallaActiva === 1;
  const paleta = FOOTER_PALETAS[pantallaActiva] ?? FOOTER_PALETAS[1];

  return (
    <footer
      className="text-white mt-auto"
      style={{
        background: paleta.background,
        borderTop: `1px solid ${paleta.borderColor}`,
      }}
    >
      <div className="container py-3">
        {!soloNormal && (
          <div className="row g-2 mb-2">
            <div className="col-md-6 col-lg-3">
              <h5 className="text-uppercase fw-semibold mb-2">Contacto</h5>
              <div className="d-flex flex-column gap-2">
                {soloCamilo && (
                  <div className="d-flex justify-content-between align-items-center">
                    <a href={CONTACTOS.instagramCamilo} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none d-flex align-items-center gap-2">
                      <BsInstagram size={22} />
                      <span>Camilo Paredes</span>
                    </a>
                    <a href="tel:+56969032063" className="text-white text-decoration-none small">+56969032063</a>
                  </div>
                )}
                {soloVivi && (
                  <div className="d-flex justify-content-between align-items-center">
                    <a href={CONTACTOS.instagramCharmingLocked} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none d-flex align-items-center gap-2">
                      <BsInstagram size={22} />
                      <span>Viniana Fernandez</span>
                    </a>
                    <a href="tel:+56971905600" className="text-white text-decoration-none small">+56971905600</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div
          className="d-flex flex-wrap justify-content-between align-items-center pt-2"
          style={!soloNormal ? { borderTop: `1px solid ${paleta.borderColor}` } : {}}
        >
          <span className="small" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>© 2026 GallinasFacheras™</span>
        </div>
      </div>
    </footer>
  );
}

export default FooterGeneral;
