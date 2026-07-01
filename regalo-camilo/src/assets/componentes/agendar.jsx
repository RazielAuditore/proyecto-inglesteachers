import { useState } from 'react';
import { format } from 'date-fns';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import BotonAgendar from './boton.jsx';
import CalendarioReserva from './CalendarioReserva.jsx';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function ModalAgendar({ variant = 'glass', profesor = 'camilo' }) {
  const [show, setShow] = useState(false);
  const [dia, setDia] = useState(undefined);
  const [hora, setHora] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const cerrar = () => {
    setShow(false);
    setDia(undefined);
    setHora(null);
    setNombre('');
    setEmail('');
    setTelefono('');
    setEnviando(false);
    setErrorMsg('');
  };

  const puedeAceptar =
    dia &&
    hora &&
    nombre.trim() &&
    email.trim() &&
    telefono.trim() &&
    !enviando;

  async function handleAceptar(e) {
    e.preventDefault();
    if (!puedeAceptar) return;
    setErrorMsg('');
    setEnviando(true);
    try {
      const fecha = format(dia, 'yyyy-MM-dd');
      const res = await fetch(`${API_BASE}/api/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profesor,
          fecha,
          hora,
          nombre: nombre.trim(),
          email: email.trim(),
          telefono: telefono.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error || 'No se pudo guardar la reserva. Intentá de nuevo.');
        return;
      }
      cerrar();
    } catch {
      setErrorMsg('No hay conexión con el servidor. ¿Está encendido el API?');
    } finally {
      setEnviando(false);
    }
  }

  const estiloCuerpo = {
    background:
      variant === 'rosa'
        ? 'linear-gradient(180deg, rgba(60,40,50,0.97) 0%, rgba(45,30,40,0.98) 100%)'
        : 'rgba(30, 34, 38, 0.97)',
    color: '#fff',
    borderTop: '1px solid rgba(255,255,255,0.12)',
  };

  const estiloHeader = {
    ...estiloCuerpo,
    borderBottom: '1px solid rgba(255,255,255,0.12)',
  };

  return (
    <>
      <BotonAgendar variant={variant} onClick={() => setShow(true)} />
      <Modal
        show={show}
        onHide={cerrar}
        centered
        dialogClassName="modal-agendar-dialog"
        contentClassName="modal-agendar-content"
      >
        <Modal.Header closeButton closeVariant="white" style={estiloHeader}>
          <Modal.Title as="h6" className="mb-0">
            Agendar primera reunión
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={estiloCuerpo} className="py-3">
          <div className="d-flex justify-content-center">
            <CalendarioReserva
              variant={variant}
              titulo="Elegí día y hora"
              compact
              dia={dia}
              hora={hora}
              onDiaChange={setDia}
              onHoraChange={setHora}
              profesor={profesor}
            />
          </div>
          <Form
            id="form-agendar-reserva"
            className="mt-3 pt-2 border-top border-secondary border-opacity-25"
            onSubmit={handleAceptar}
          >
            <Form.Group className="mb-2" controlId="agendar-nombre">
              <Form.Label className="small mb-1 opacity-90">Nombre</Form.Label>
              <Form.Control
                type="text"
                className="modal-agendar-input"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoComplete="name"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="agendar-email">
              <Form.Label className="small mb-1 opacity-90">Correo</Form.Label>
              <Form.Control
                type="email"
                className="modal-agendar-input"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="agendar-telefono">
              <Form.Label className="small mb-1 opacity-90">Teléfono</Form.Label>
              <Form.Control
                type="tel"
                className="modal-agendar-input"
                placeholder="Ej. +56 9 1234 5678"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                autoComplete="tel"
              />
            </Form.Group>
            {errorMsg ? (
              <div className="small text-warning mb-0" role="alert">
                {errorMsg}
              </div>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer style={estiloCuerpo} className="border-0 pt-0 justify-content-between">
          <Button variant="outline-light" size="sm" type="button" onClick={cerrar}>
            Cerrar
          </Button>
          <Button
            variant="light"
            size="sm"
            type="submit"
            form="form-agendar-reserva"
            disabled={!puedeAceptar}
          >
            {enviando ? 'Enviando…' : 'Aceptar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAgendar;
