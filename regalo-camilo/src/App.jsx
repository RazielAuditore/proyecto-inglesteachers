import { useState } from 'react'
import './App.css'
import Header from './assets/componentes/header.jsx'
import FondoTripartito from './assets/componentes/fondo.jsx'
import { FooterGeneral } from './assets/componentes/footer.jsx'

function App() {
  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <div>
      <Header onIrAPantalla={setActiveIndex} />
      <FondoTripartito activeIndex={activeIndex} onSelect={setActiveIndex} />
      <FooterGeneral pantallaActiva={activeIndex} />
    </div>
  )
}

export default App
