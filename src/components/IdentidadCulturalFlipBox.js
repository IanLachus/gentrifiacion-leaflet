import React, { useState } from "react";
import { FaUserFriends, FaTheaterMasks, FaBrush, FaMapMarkedAlt, FaSmile } from "react-icons/fa";
import "./IdentidadCulturalFlipBox.css";

const datos = [
  {
    icon: <FaUserFriends size={30} color="#228855" />,
    titulo: "Desplazamiento cultural",
    detalle: "Las familias originales migran y sus costumbres se pierden o quedan en minoría, debilitando el sentido de pertenencia."
  },
  {
    icon: <FaTheaterMasks size={30} color="#228855" />,
    titulo: "Pérdida de tradiciones",
    detalle: "Fiestas, gastronomía y música locales se reemplazan por actividades modernas o eventos para turistas."
  },
  {
    icon: <FaBrush size={30} color="#228855" />,
    titulo: "Cambio de imagen",
    detalle: "Se sustituyen murales, arte y símbolos históricos por estéticas modernas o globalizadas."
  },
  {
    icon: <FaMapMarkedAlt size={30} color="#228855" />,
    titulo: "Redefinición de espacios",
    detalle: "Plazas y parques pierden su función comunitaria y se vuelven zonas de consumo o quedan excluidos los vecinos originales."
  },
  {
    icon: <FaSmile size={30} color="#228855" />,
    titulo: "Desarraigo emocional",
    detalle: "Los antiguos habitantes ya no se sienten identificados con el barrio, aumentando el desapego."
  },
];

export default function IdentidadCulturalFlipBox() {
  const [flipped, setFlipped] = useState(Array(datos.length).fill(false));
  const toggleFlip = idx => setFlipped(
    flipped.map((f, i) => i === idx ? !f : f)
  );
  return (
    <div>
      <h2 style={{textAlign:'center', marginBottom:18, color:'#228855'}}>🎭 Impacto en la Identidad Cultural</h2>
      <div className="flipbox-grid">
        {datos.map((d, idx) => (
          <div
            className={`flipbox ${flipped[idx] ? "flipped" : ""}`}
            onClick={() => toggleFlip(idx)}
            key={idx}
            tabIndex={0}
            aria-label={d.titulo}
          >
            <div className="flipbox-inner">
              <div className="flipbox-front">
                {d.icon}
                <div className="flipbox-title">{d.titulo}</div>
              </div>
              <div className="flipbox-back">
                <div className="flipbox-back-content">{d.detalle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center', fontSize:'0.93em', color:'#888', marginTop:8}}>Toca o haz click en cada tarjeta para ver más detalles.</div>
    </div>
  );
}