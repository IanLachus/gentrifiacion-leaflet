import React, { useEffect, useState } from "react";

function TablaEventosDesplazamiento() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/eventos_desplazamiento')
      .then(res => res.json())
      .then(data => setEventos(data));
  }, []);

  if (eventos.length === 0) return null;

  return (
    <div className="tabla-contenedor">
      <h2 className="titulo-tabla">Eventos de Desplazamiento</h2>
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>Barrio ID</th>
            <th>Año</th>
            <th>Personas desplazadas</th>
            <th>Causa</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(ev => (
            <tr key={ev.id}>
              <td>{ev.barrio_id}</td>
              <td>{ev.año}</td>
              <td>{ev.personas_desplazadas}</td>
              <td>{ev.causa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEventosDesplazamiento;
