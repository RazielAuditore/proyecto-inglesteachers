import { Navbar, Container, Nav } from 'react-bootstrap'

function Header() {
  return (
    <Navbar
      expand="md"
      className="shadow-sm position-fixed top-0 start-0 end-0 z-3 py-2"
      style={{
        background: 'rgba(33, 37, 41, 0.35)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container>
        <Navbar.Brand href="#" className="fw-semibold text-white">
          GallinasFacheras™
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-nav" className="border-light" />
        <Navbar.Collapse id="header-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#" className="text-white">
              Inicio
            </Nav.Link>
            <Nav.Link href="#" className="text-white">
              Nosotros
            </Nav.Link>
            <Nav.Link href="#contacto" className="text-white">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
