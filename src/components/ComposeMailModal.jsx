import React, { useState } from 'react';
import './ComposeMailModal.css';

const ComposeMailModal = ({ onClose, onSend }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    // Aquí se llamará a la función onSend con los datos del correo
    onSend({ to, subject, body });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nuevo Correo</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="to">Para:</label>
            <input
              type="email"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Asunto del correo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Mensaje:</label>
            <textarea
              id="body"
              rows="10"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-cancel">Cancelar</button>
          <button onClick={handleSend} className="btn btn-send">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ComposeMailModal;