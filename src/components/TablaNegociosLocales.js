import React, { useEffect, useState } from "react";

function TablaNegociosLocales() {
  const [negocios, setNegocios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/negocios_locales')
      .then(res => res.json())
      .then(data => setNegocios(data));
  }, []);

  if (negocios.length === 0) return null;

  return (
    <div className="tabla-contenedor">
      <h2 className="titulo-tabla">Negocios Locales</h2>
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Barrio ID</th>
            <th>Año apertura</th>
          </tr>
        </thead>
        <tbody>
          {negocios.map(n => (
            <tr key={n.id}>
              <td>{n.nombre}</td>
              <td>{n.tipo}</td>
              <td>{n.barrio_id}</td>
              <td>{n.año_apertura}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaNegociosLocales;
