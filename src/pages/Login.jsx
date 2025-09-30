import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación para el coordinador
    if (username === 'rector123' && password === '123456') {
      console.log('Login successful, redirecting to teachers page...');
      setError('');
      navigate('/profesores'); // Corregido: Redirigir a /profesores
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido a la Agenda Virtual</h2>
        <p>Selecciona tu tipo de usuario para continuar</p>

        <div className="user-type-selector">
          <button className="user-type-btn active">Coordinación</button>
          <button className="user-type-btn" disabled>Docentes</button>
          <button className="user-type-btn" disabled>Padres</button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="rector123"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;