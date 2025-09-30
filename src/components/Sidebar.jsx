import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// Importa un avatar de placeholder. Reemplazaremos esto más tarde.
import userAvatar from '../assets/react.svg';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <img src={userAvatar} alt="Foto del coordinador" className="profile-pic" />
        <h3>Coordinador</h3>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/profesores" className="nav-item">Profesores</NavLink>
        <NavLink to="/correos" className="nav-item">Correos</NavLink>
        <NavLink to="/avisos" className="nav-item">Avisos</NavLink>
        <NavLink to="/configuracion" className="nav-item">Configuración</NavLink>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn">Cerrar Sesión</button>
      </div>
    </aside>
  );
};

export default Sidebar;