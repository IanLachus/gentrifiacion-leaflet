import React, { useEffect, useState } from "react";
import "./TablaIdentidadCultural.css"; // Recuerda crear este archivo para estilos

export default function TablaIdentidadCultural() {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/identidad_cultural_afectada")
      .then(res => res.json())
      .then(data => setLugares(data));
  }, []);

  return (
    <div className="tabla-identidad-container">
      <h2 className="tabla-identidad-titulo">Lugares más afectados en su Identidad Cultural</h2>
      <div className="tabla-scroll">
        <table className="tabla-identidad">
          <thead>
            <tr>
              <th>#</th>
              <th>Lugar</th>
              <th>Manifestaciones afectadas</th>
              <th>Causa</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {lugares.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.lugar}</td>
                <td>{item.manifestaciones}</td>
                <td>{item.causa}</td>
                <td>{item.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}