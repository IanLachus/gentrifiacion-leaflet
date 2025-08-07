import React, { useEffect, useState } from "react";

export default function TablaZonasGentrificacion() {
  const [zonas, setZonas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/zonas_gentrificacion")
      .then((res) => res.json())
      .then((data) => setZonas(data));
  }, []);

  if (zonas.length === 0) return null;

  return (
    <div className="tabla-contenedor">
      <h2 className="titulo-tabla">Lista detallada de las zonas costeras afectadas por la Gentrificación</h2>
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>#</th>
            <th>Zona</th>
            <th>Año de inicio</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {zonas.map((z, i) => (
            <tr key={z.id}>
              <td>{i + 1}</td>
              <td>{z.zona}</td>
              <td>{z.anio_inicio}</td>
              <td>{z.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}