import { Navbar, Container, Nav } from 'react-bootstrap'

function Header({ onIrAPantalla }) {
  const irA = (e, index) => {
    e.preventDefault()
    onIrAPantalla?.(index)
  }

  return (
    <Navbar
      className="shadow-sm position-fixed top-0 start-0 end-0 z-3"
      style={{
        background: 'rgba(33, 37, 41, 0.35)',
        backdropFilter: 'blur(8px)',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
      }}
    >
      <Container className="d-flex flex-column align-items-center py-0" style={{ gap: '0.2rem' }}>
        <Navbar.Brand href="#" className="fw-semibold text-white mb-0" style={{ fontSize: '0.9rem' }}>
          TeacherCouple™
        </Navbar.Brand>
        <Nav className="d-flex align-items-center" style={{ width: '100%', maxWidth: '320px', justifyContent: 'space-between', fontSize: '0.75rem' }}>
          <Nav.Link href="#" className="text-white py-0" onClick={(e) => irA(e, 0)}>
            Teacher Camilo
          </Nav.Link>
          <Nav.Link href="#" className="text-white py-0" onClick={(e) => irA(e, 1)}>
            Inicio
          </Nav.Link>
          <Nav.Link href="#" className="text-white py-0" onClick={(e) => irA(e, 2)}>
            Teacher Viviana
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
