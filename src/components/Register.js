import React, { useState } from 'react';
import './LoginModern.css';
import { FaCity } from 'react-icons/fa';

const RegisterModern = ({ onRegister, onSwitchLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirma, setConfirma] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (!usuario || !contrasena || !confirma) {
      setError('Por favor llena todos los campos.');
      return;
    }
    if (contrasena !== confirma) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Leer usuarios de localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuariosGentriCR') || '[]');
    // Verificar si el usuario ya existe
    const yaExiste = usuariosGuardados.find(u => u.username === usuario);
    if (yaExiste) {
      setError('Ese usuario ya existe. Usa otro nombre de usuario.');
      return;
    }

    // Guardar el nuevo usuario
    const nuevoUsuario = { username: usuario, password: contrasena };
    localStorage.setItem('usuariosGentriCR', JSON.stringify([...usuariosGuardados, nuevoUsuario]));

    setExito('¡Usuario registrado con éxito!');
    setTimeout(() => {
      onRegister({ username: usuario });
    }, 800);
  };

  return (
    <>
      <div className="login-modern-container">
        <div className="login-modern-left">
          <div className="circle-bg">
            <FaCity size={56} style={{ marginBottom: 20, color: "white" }} />
            <h1>Únete a GentriCR<br />y descubre más</h1>
          </div>
        </div>
        <div className="login-modern-right">
          <div className="login-form-card">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirma}
                onChange={(e) => setConfirma(e.target.value)}
              />
              <button type="submit">Registrarse</button>
            </form>
            {error && <div style={{ color: 'crimson', marginTop: '0.5rem', textAlign: 'center' }}>{error}</div>}
            {exito && <div style={{ color: 'green', marginTop: '0.5rem', textAlign: 'center' }}>{exito}</div>}
            <div className="login-links">
              <span>
                ¿Ya tienes cuenta?{' '}
                <button className="link-button" type="button" onClick={onSwitchLogin}>
                  Inicia sesión
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-discreto">
        © {new Date().getFullYear()} GentriCR. Todos los derechos reservados.
      </footer>
    </>
  );
};

export default RegisterModern;