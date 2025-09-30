import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config'; // Importamos la instancia de la BD
import { collection, addDoc } from 'firebase/firestore'; // Funciones de Firestore
import './CrearDocente.css';

const CrearDocentePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    celular: '',
    curso: '',
    asignatura: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Añadimos un nuevo documento a la colección 'profesores'
      const docRef = await addDoc(collection(db, 'profesores'), formData);
      console.log("Docente guardado con ID: ", docRef.id);
      navigate('/profesores'); // Redirigir tras guardar
    } catch (err) {
      console.error("Error al guardar el docente: ", err);
      setError('No se pudo guardar el docente. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profesores');
  };

  return (
    <div className="crear-docente-page">
      <h2>Añadir Nuevo Docente</h2>
      <form onSubmit={handleSubmit} className="crear-docente-form">
        {/* ... (campos del formulario sin cambios) ... */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="celular">Celular</label>
          <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="curso">Curso a Cargo</label>
          <input type="text" id="curso" name="curso" value={formData.curso} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="asignatura">Asignatura que Imparte</label>
          <input type="text" id="asignatura" name="asignatura" value={formData.asignatura} onChange={handleChange} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn btn-cancel" disabled={isLoading}>Cancelar</button>
          <button type="submit" className="btn btn-accept" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Aceptar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearDocentePage;