import React from 'react';
import logoGentri from '../assets/nature-leaves-logo-by-Vexels.png'; // Usa el nombre de tu archivo

function Main() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <img 
        src={logoGentri}
        alt="Bienvenida GentriCR"
        style={{
          width: '270px',       // Ajusta el tamaño a tu gusto
          maxWidth: '80vw',
          margin: '20px auto',
          opacity: 0.94,
          borderRadius: '22px',
          boxShadow: '0 8px 40px rgba(50,160,110,0.08)'
        }}
      />
    </div>
  );
}

export default Main;
