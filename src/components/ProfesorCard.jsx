import React, { useState } from 'react';
import './ProfesorCard.css';
import userAvatar from '../assets/react.svg'; // Placeholder

const ProfesorCard = ({ profesor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Datos de ejemplo si no se proporcionan
  const displayData = profesor || {
    nombre: "Nombre del Docente",
    curso: "Curso Asignado",
    foto: userAvatar,
    info: "Aquí va más información sobre el docente...",
    estudiantes: ["Estudiante 1", "Estudiante 2", "Estudiante 3"]
  };

  return (
    <div className={`profesor-card ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
      <div className="card-header">
        <img src={displayData.foto} alt={`Foto de ${displayData.nombre}`} className="profesor-pic" />
        <div className="profesor-summary">
          <h4>{displayData.nombre}</h4>
          <p>{displayData.curso}</p>
        </div>
      </div>
      {isExpanded && (
        <div className="card-details">
          <h5>Información Adicional:</h5>
          <p>{displayData.info}</p>
          <h5>Estudiantes a Cargo:</h5>
          <ul>
            {displayData.estudiantes.map((estudiante, index) => (
              <li key={index}>{estudiante}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfesorCard;