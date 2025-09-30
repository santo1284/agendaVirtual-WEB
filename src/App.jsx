import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import ProfesoresPage from './pages/Profesores';
import CrearDocentePage from './pages/CrearDocente';
import CorreosPage from './pages/Correos';
import AvisosPage from './pages/Avisos'; // Importamos la nueva página
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/profesores" replace />} />
          <Route path="profesores" element={<ProfesoresPage />} />
          <Route path="profesores/crear" element={<CrearDocentePage />} />
          <Route path="correos" element={<CorreosPage />} />
          <Route path="avisos" element={<AvisosPage />} /> {/* Nueva ruta */}
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;