import React from 'react';
import './NavbarModern.css';
import { FaUserFriends, FaMapMarkedAlt, FaListUl, FaTheaterMasks, FaSignOutAlt, FaHeadset } from 'react-icons/fa';
import { PiSneakerMoveBold } from "react-icons/pi";

// AGREGA el nuevo ítem aquí ↓
const SECCIONES = [
  { id: 'segregacion', nombre: 'Segregación social', icon: <FaUserFriends /> },
  { id: 'desplazamiento', nombre: 'Desplazamiento de habitantes', icon: <PiSneakerMoveBold /> },
  { id: 'elementos', nombre: 'Elementos de la gentrificación', icon: <FaListUl /> },
  { id: 'identidad', nombre: 'Identidad cultural', icon: <FaTheaterMasks /> },
  { id: 'mapa', nombre: 'Mapa de zonas afectadas', icon: <FaMapMarkedAlt /> },
  { id: 'contacto', nombre: 'Soporte / Contacto', icon: <FaHeadset /> }, // <-- NUEVO
];

export default function NavbarModern({ seccionActiva, setSeccionActiva, onLogout }) {
  return (
    <nav className="navbar-modern">
      <div className="navbar-logo">GentriCR</div>
      <ul className="navbar-list">
        {SECCIONES.map(sec => (
          <li
            key={sec.id}
            className={`navbar-item${seccionActiva === sec.id ? ' active' : ''}`}
            onClick={() => setSeccionActiva(sec.id)}
          >
            <span className="navbar-icon">{sec.icon}</span>
            <span className="navbar-text">{sec.nombre}</span>
          </li>
        ))}
      </ul>
      <button className="navbar-logout" onClick={onLogout}>
        <FaSignOutAlt style={{ marginRight: 8 }} />
        Cerrar sesión
      </button>
    </nav>
  );
}
