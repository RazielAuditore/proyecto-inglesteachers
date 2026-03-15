// Contactos para usar en el footer:
// - Camilo: https://www.instagram.com/camilongous/
// - Charming Locked: https://www.instagram.com/charminglocked/

const CONTACTOS = {
  instagramCamilo: "https://www.instagram.com/camilongous/",
  instagramCharmingLocked: "https://www.instagram.com/charminglocked/",
};

import { BsInstagram } from "react-icons/bs";

export function FooterGeneral({ pantallaActiva = 1 }) {
  const soloCamilo = pantallaActiva === 0;
  const soloVivi = pantallaActiva === 2;
  const soloNormal = pantallaActiva === 1;

  return (
    <footer className="bg-dark text-white mt-auto">
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
        <div className={`d-flex flex-wrap justify-content-between align-items-center ${!soloNormal ? 'border-top border-secondary pt-2' : ''}`}>
          <span className="text-secondary small">© 2026 GallinasFacheras™</span>
        </div>
      </div>
    </footer>
  );
}

export default FooterGeneral;
