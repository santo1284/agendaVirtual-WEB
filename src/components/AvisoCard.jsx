import React from 'react';
import './AvisoCard.css';

const AvisoCard = ({ aviso }) => {
  // Datos de ejemplo si no se proporcionan
  const displayData = aviso || {
    titulo: "Título del Aviso",
    contenido: "Este es el texto del aviso. Puede ser un texto corto o un resumen de una circular más larga.",
    imagenUrl: "https://via.placeholder.com/400x200.png?text=Imagen+del+Aviso",
    fecha: new Date().toLocaleDateString()
  };

  return (
    <div className="aviso-card">
      {displayData.imagenUrl && <img src={displayData.imagenUrl} alt={displayData.titulo} className="aviso-imagen" />}
      <div className="aviso-contenido">
        <h4>{displayData.titulo}</h4>
        <p>{displayData.contenido}</p>
        <span className="aviso-fecha">{displayData.fecha}</span>
      </div>
    </div>
  );
};

export default AvisoCard;