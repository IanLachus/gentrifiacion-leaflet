import React, { useState } from 'react';
import './Intro.css';
import mundo from '../assets/Construction-bro.png';

export default function Intro() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="intro-card">
      <h2>¿Qué es la Gentrificación?</h2>
      <p>
        La <span className="resaltado">gentrificación</span> es un proceso urbano en el que barrios tradicionalmente habitados por familias de ingresos medios o bajos son transformados por la llegada de residentes y comercios con mayor poder adquisitivo. Este fenómeno puede mejorar la infraestructura y los servicios del barrio, pero también suele provocar el aumento de los precios y el desplazamiento de sus habitantes originales, cambiando la identidad y el tejido social del lugar.
      </p>
      <div
        className={`flip-card-container${flipped ? ' flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
        style={{ margin: '32px auto', cursor: 'pointer', width: 320, height: 230 }}
        title="Haz clic para ver más"
      >
        <div className="flip-card">
          <div className="flip-card-front">
            <img
              src={mundo}
              alt="Ciudad moderna"
              className="intro-img"
              style={{ width: 320, height: 230, objectFit: 'cover', borderRadius: 16 }}
            />
          </div>
          <div className="flip-card-back">
            <div className="flip-content">
              <h3 style={{ marginBottom: 8 }}>¿Por qué importa?</h3>
              <p style={{ fontSize: '1.05rem', color: '#244632' }}>
                La gentrificación transforma barrios y afecta la vida, cultura y oportunidades de comunidades tradicionales.  
                <br /><br />
                Conocer este proceso nos ayuda a construir ciudades más justas y conscientes de su historia y diversidad.
              </p>
              <small style={{ opacity: 0.6 }}>(Haz clic para volver)</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}