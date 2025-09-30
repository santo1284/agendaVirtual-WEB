import React, { useState } from 'react';
import './CrearAvisoModal.css'; // Usaremos un CSS similar al de correos

const CrearAvisoModal = ({ onClose, onSave }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  const handleSave = () => {
    onSave({ titulo, contenido, imagenUrl });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Crear Nuevo Aviso</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="titulo">Título del Aviso</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Suspensión de Clases"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contenido">Contenido</label>
            <textarea
              id="contenido"
              rows="5"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Escribe el cuerpo del aviso..."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="imagenUrl">URL de la Imagen (Opcional)</label>
            <input
              type="text"
              id="imagenUrl"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-cancel">Cancelar</button>
          <button onClick={handleSave} className="btn btn-accept">Guardar Aviso</button>
        </div>
      </div>
    </div>
  );
};

export default CrearAvisoModal;