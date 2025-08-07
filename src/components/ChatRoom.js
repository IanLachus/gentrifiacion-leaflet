import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { FaRegComments, FaInfoCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import './ChatRoom.css';

const socket = io('http://localhost:4000');

const REGLAS_CHAT = [
  "Respetar a los demás participantes. No se permiten insultos ni lenguaje ofensivo.",
  "No compartir datos personales (números, direcciones, contraseñas, etc).",
  "Los mensajes deben estar relacionados con la gentrificación y la comunidad.",
  "No spam, publicidad ni enlaces sospechosos.",
  "Cualquier abuso será moderado y los mensajes podrán ser eliminados.",
];

export default function ChatRoom() {
  // Recupera usuario de localStorage, si existe
  const [usuario, setUsuario] = useState(() => localStorage.getItem('chat_usuario') || "");
  const [nombreTemp, setNombreTemp] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [showReglas, setShowReglas] = useState(false);
  const chatEndRef = useRef(null);

  // Recibe mensajes nuevos y el historial
  useEffect(() => {
    socket.on('chat-message', (msg) => {
      setMensajes((prev) => [...prev, msg]);
    });
    socket.on('historial', (rows) => {
      setMensajes(rows || []);
    });
    return () => {
      socket.off('chat-message');
      socket.off('historial');
    };
  }, []);

  // Scroll automático al final
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    socket.emit('chat-message', { usuario, mensaje });
    setMensaje('');
  };

  // Cuando el usuario entra, guarda en localStorage
  const entrarAlChat = (e) => {
    e.preventDefault();
    const nombreFinal = nombreTemp.trim() ? nombreTemp.trim() : "Anónimo";
    setUsuario(nombreFinal);
    localStorage.setItem('chat_usuario', nombreFinal);
  };

  // Permite salir del chat (borrar usuario)
  const salirChat = () => {
    localStorage.removeItem('chat_usuario');
    setUsuario("");
    setNombreTemp("");
  };

  if (!usuario) {
    return (
      <div className="chatroom-card chatroom-login">
        <div className="chat-login-header">
          <FaRegComments size={34} className="chat-icon" />
          <h2>
            <span>Foro sobre la </span>
            <span className="verde">Gentrificación</span>
          </h2>
        </div>
        <p className="chat-subtext">
          ¡Bienvenido! Elige un <b>nombre o apodo</b> para unirte a la conversación:
        </p><br />
        <form
          className="chat-login-form"
          onSubmit={entrarAlChat}
        >
          <input
            className="chat-input"
            placeholder="Ej: Sofía, El Observador, Anónimo..."
            value={nombreTemp}
            onChange={e => setNombreTemp(e.target.value)}
            maxLength={24}
            autoFocus
          />
          <button type="submit" className="chat-boton verde">Entrar</button>
        </form>
        {showReglas && (
  <div className="popup-overlay">
    <div className="popup-reglas">
      <h3>Reglas del chat</h3>
      <ul>
        {REGLAS_CHAT.map((regla, idx) => (
          <li key={idx}>{regla}</li>
        ))}
      </ul>
      <button
        className="popup-cerrar"
        onClick={() => setShowReglas(false)}
      >
        Cerrar
      </button>
    </div>
  </div>
)}

        <div className="chat-login-note"><br />
          <span>No necesitas registrarte. ¡Tu privacidad está protegida!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="chatroom-card">
      <div className="chatroom-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h2 style={{ margin: 0 }}><FaRegMessage />Foro sobre la Gentrificación</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="chat-usuario-actual" style={{ color: "#228055", fontWeight: 600, fontSize: 14, marginRight: 6 }}>
            {usuario}
          </span>
          <button
            className="chat-info-btn"
            aria-label="Ver reglas del chat"
            onClick={() => setShowReglas(true)}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <FaInfoCircle size={22} />
          </button>
          <button
            className="chat-salir-btn"
            aria-label="Salir del chat"
            onClick={salirChat}
            style={{
              marginLeft: 10,
              background: "#ec6056",
              border: "none",
              color: "#fff",
              padding: "5px 12px",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14
            }}
          >
            Salir
          </button>
        </div>
      </div>
      <div className="chat-mensajes">
        {mensajes.map((msg, idx) => (
          <div className={`chat-mensaje ${msg.usuario === usuario ? "propio" : ""}`} key={idx}>
            <span className="chat-user">{msg.usuario || "Anon"}:</span>{" "}
            <span>{msg.mensaje}</span>
            <span className="chat-fecha">{msg.fecha ? ` • ${msg.fecha}` : ""}</span>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <form onSubmit={enviarMensaje} className="chat-form">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="chat-boton">Enviar</button>
      </form>

      {showReglas && (
        <div className="popup-overlay">
          <div className="popup-reglas">
            <h3>Reglas del chat</h3>
            <ul>
              {REGLAS_CHAT.map((regla, idx) => (
                <li key={idx}>{regla}</li>
              ))}
            </ul>
            <button
              className="popup-cerrar"
              onClick={() => setShowReglas(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}