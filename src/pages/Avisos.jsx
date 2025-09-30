import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import AvisoCard from '../components/AvisoCard';
import CrearAvisoModal from '../components/CrearAvisoModal';
import './Avisos.css';

const AvisosPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avisos, setAvisos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const avisosCollection = collection(db, 'avisos');
    const unsubscribe = onSnapshot(avisosCollection, (snapshot) => {
      const avisosList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convertimos el timestamp de Firebase a una fecha legible
        fecha: doc.data().timestamp?.toDate().toLocaleDateString() || new Date().toLocaleDateString()
      }));
      setAvisos(avisosList);
      setIsLoading(false);
    }, (error) => {
      console.error("Error al obtener los avisos: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveAviso = async (avisoData) => {
    try {
      await addDoc(collection(db, 'avisos'), {
        ...avisoData,
        timestamp: serverTimestamp() // Guarda la fecha y hora del servidor
      });
      console.log("Aviso guardado con éxito.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar el aviso: ", error);
    }
  };

  return (
    <div className="avisos-page">
      {isModalOpen && (
        <CrearAvisoModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAviso}
        />
      )}
      <div className="avisos-header">
        <h1>Mural de Avisos</h1>
        <button onClick={() => setIsModalOpen(true)} className="create-aviso-btn">Crear Aviso</button>
      </div>
      <div className="avisos-grid">
        {isLoading ? (
          <p>Cargando avisos...</p>
        ) : avisos.length > 0 ? (
          avisos.map(aviso => (
            <AvisoCard key={aviso.id} aviso={aviso} />
          ))
        ) : (
          <p>No hay avisos publicados. ¡Crea el primero!</p>
        )}
      </div>
    </div>
  );
};

export default AvisosPage;