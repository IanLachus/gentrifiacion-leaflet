import React, { useEffect, useState } from "react";

function TablaPreciosVivienda() {
  const [precios, setPrecios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/precios_vivienda')
      .then(res => res.json())
      .then(data => setPrecios(data));
  }, []);

  if (precios.length === 0) return null;

  return (
    <div className="tabla-contenedor">
      <h2 className="titulo-tabla">Precios de Vivienda</h2>
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>Barrio ID</th>
            <th>Año</th>
            <th>Precio promedio</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {precios.map(p => (
            <tr key={p.id}>
              <td>{p.barrio_id}</td>
              <td>{p.anio}</td>
              <td>{p.precio_promedio}</td>
              <td>{p.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPreciosVivienda;
