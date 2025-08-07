import React, { useState } from "react";
import "./ContactoSoporte.css";
import ilustracion from "../assets/Contact us-bro.png";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2"; // 👈 nuevo import

export default function ContactoSoporte() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Mostrar alerta moderna al enviar
    Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Gracias por contactarnos. Te responderemos pronto.',
      icon: 'success',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#228855'
    });

    setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <div className="contacto-soporte-section">
      <div className="contacto-grid">
        {/* IZQUIERDA */}
        <div className="contacto-info">
          <h2>
            ¿En qué podemos ayudarte? <span role="img" aria-label="manos">🤝</span>
          </h2>
          <p className="contacto-sub">
            Cuéntanos tu aporte, tu consulta o inquietud sobre la gentrificación en Costa Rica.
          </p>
          <img className="contacto-img" src={ilustracion} alt="Soporte GentriCR" />
          <div className="contacto-channels">
            <div>
              <span className="contacto-icon">📧</span>
              <b>Email:</b>
              <div className="contacto-detail">contacto@gentricr.com</div>
            </div>
            <div>
              <span id="wsp" className="contacto-icon"><FaWhatsapp /></span>
              <b>WhatsApp:</b>
              <div className="contacto-detail">+506 8541-7232</div>
            </div>
          </div>
        </div>

        {/* DERECHA */}
        <form className="contacto-form" onSubmit={handleSubmit}>
          <h3>Escríbenos aquí</h3>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono (opcional)"
            value={form.telefono}
            onChange={handleChange}
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje (máximo 500 caracteres)"
            maxLength={500}
            value={form.mensaje}
            onChange={handleChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}