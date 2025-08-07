import React, { useState } from 'react';
import './LoginModern.css';
import { FaCity } from 'react-icons/fa';

const LoginModern = ({ onLogin, onSwitchRegister }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Leer usuarios de localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuariosGentriCR') || '[]');
    // Buscar si existe el usuario con la contraseña correcta
    const usuarioValido = usuariosGuardados.find(
      (u) => u.username === usuario && u.password === contrasena
    );

    if (usuarioValido) {
      onLogin({ username: usuario });
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <div className="login-modern-container">
        <div className="login-modern-left">
          <div className="circle-bg">
            <FaCity size={56} style={{ marginBottom: 20, color: "white" }} />
            <h1>Impactos Sociales<br />de la Gentrificación</h1>
          </div>
        </div>
        <div className="login-modern-right">
          <div className="login-form-card">
            <h2>Iniciar sesión</h2>
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
              <button type="submit">Entrar</button>
            </form>
            {error && <div style={{ color: 'crimson', marginTop: '0.5rem', textAlign: 'center' }}>{error}</div>}
            <div className="login-links">
              <br />
              <span>
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  className="link-button"
                  onClick={onSwitchRegister}
                >
                  Regístrate aquí
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-discreto">
  © {new Date().getFullYear()} GentriCR. Todos los derechos reservados.
  &nbsp;Desarrollado por&nbsp;
  <a
    href="https://www.linkedin.com/in/ian-aar%C3%B3n-mora-espinoza-672227353/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: '#4e4f4ea1', fontWeight: 500, pointerEvents: 'auto' }}
  >
    Ian Mora
  </a>
  .
</footer>

    </>
  );
};

export default LoginModern;