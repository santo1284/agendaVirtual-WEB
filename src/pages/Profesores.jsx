import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import ProfesorCard from '../components/ProfesorCard';
import './Profesores.css';

const ProfesoresPage = () => {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profesoresCollection = collection(db, 'profesores');

    // onSnapshot escucha cambios en tiempo real en la colección
    const unsubscribe = onSnapshot(profesoresCollection, (snapshot) => {
      const profesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProfesores(profesList);
      setIsLoading(false);
    }, (error) => {
      console.error("Error al obtener los profesores: ", error);
      setIsLoading(false);
    });

    // Limpiamos el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const handleAddProfesor = () => {
    navigate('/profesores/crear');
  };

  return (
    <div className="profesores-page">
      <div className="profesores-header">
        <h1>Gestión de Profesores</h1>
        <button onClick={handleAddProfesor} className="add-profesor-btn">Añadir Profesor</button>
      </div>
      <div className="profesores-list">
        {isLoading ? (
          <p>Cargando profesores...</p>
        ) : profesores.length > 0 ? (
          profesores.map(profesor => (
            <ProfesorCard key={profesor.id} profesor={profesor} />
          ))
        ) : (
          <p>Aún no hay profesores registrados. ¡Añade uno!</p>
        )}
      </div>
    </div>
  );
};

export default ProfesoresPage;