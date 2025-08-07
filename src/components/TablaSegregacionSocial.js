import React, { useEffect, useState } from "react";

function TablaSegregacionSocial() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/segregacion_social')
      .then(res => res.json())
      .then(data => setDatos(data));
  }, []);

  if (datos.length === 0) return null;

  return (
    <div className="tabla-contenedor">
      <h2 className="titulo-tabla">Ejemplos Segregación Social</h2>
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>Barrio</th>
            <th>% Desplazados</th>
            <th>Índice Diversidad</th>
            <th>Ingreso Promedio</th>
            <th>Cambios en Comercio</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(row => (
            <tr key={row.id}>
              <td>{row.barrio}</td>
              <td>{row.porcentaje_desplazados}%</td>
              <td>{row.indice_diversidad}</td>
              <td>{row.ingreso_promedio}</td>
              <td>{row.cambios_comercio}</td>
              <td>{row.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaSegregacionSocial;