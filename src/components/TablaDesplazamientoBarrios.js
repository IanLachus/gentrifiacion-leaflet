import React, { useEffect, useState } from "react";

function TablaDesplazamientoBarrios() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/desplazamiento_barrios')
      .then(res => res.json())
      .then(data => setDatos(data));
  }, []);

  if (!datos.length) return null;

  return (
    <div className="tabla-contenedor">
      <h2 className="titulo-tabla">Desplazamiento de habitantes en barrios urbanos</h2>
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>Barrio</th>
            <th>Año</th>
            <th>Personas desplazadas</th>
            <th>Motivo</th>
            <th>Nuevo destino</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(d => (
            <tr key={d.id}>
              <td>{d.barrio}</td>
              <td>{d.anio}</td>
              <td>{d.personas_desplazadas}</td>
              <td>{d.motivo}</td>
              <td>{d.nuevo_destino}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDesplazamientoBarrios;