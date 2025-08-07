import React, { useEffect, useState } from "react";

function TablaBarrios() {
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/barrios')
      .then(res => res.json())
      .then(data => setBarrios(data));
  }, []);

  if (barrios.length === 0) return null;

  return (
    <div className="tabla-contenedor">
      <h2 className="titulo-tabla">Barrios registrados</h2>
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Distrito</th>
            <th>Población</th>
            <th>Latitud</th>
            <th>Longitud</th>
          </tr>
        </thead>
        <tbody>
          {barrios.map(b => (
            <tr key={b.id}>
              <td>{b.nombre}</td>
              <td>{b.distrito}</td>
              <td>{b.poblacion}</td>
              <td>{b.lat}</td>
              <td>{b.lng}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaBarrios;
