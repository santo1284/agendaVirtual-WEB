import React, { useState, useEffect } from 'react';
import ComposeMailModal from '../components/ComposeMailModal';
import { db } from '../firebase/config';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import './Correos.css';

// Componente para un item de la lista de correos
const CorreoListItem = ({ correo }) => (
  <div className="correo-list-item">
    <div className="correo-sender">{correo.from || "Remitente Desconocido"}</div>
    <div className="correo-subject">{correo.subject}</div>
    <div className="correo-date">{new Date(correo.timestamp?.toDate()).toLocaleString()}</div>
  </div>
);


const CorreosPage = () => {
  const [activeTab, setActiveTab] = useState('nuevos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correos, setCorreos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulación del usuario actual
  const currentUserEmail = "rector123@colegio.com";

  useEffect(() => {
    setIsLoading(true);
    const correosCollection = collection(db, 'correos');

    // Creamos la consulta dependiendo de la pestaña activa
    const q = activeTab === 'nuevos'
      ? query(correosCollection, where("to", "==", currentUserEmail))
      : query(correosCollection, where("from", "==", currentUserEmail));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mailList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCorreos(mailList);
      setIsLoading(false);
    }, (error) => {
      console.error("Error al obtener los correos: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [activeTab, currentUserEmail]);

  const handleSendMail = async (mailData) => {
    try {
      await addDoc(collection(db, 'correos'), {
        ...mailData,
        from: currentUserEmail,
        timestamp: new Date(),
        read: false,
      });
      console.log("Correo enviado con éxito.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al enviar el correo: ", error);
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="correos-page">
      {isModalOpen && (
        <ComposeMailModal
          onClose={() => setIsModalOpen(false)}
          onSend={handleSendMail}
        />
      )}

      <div className="correos-header">
        <h1>Bandeja de Correo</h1>
        <button onClick={() => setIsModalOpen(true)} className="compose-btn">Enviar Correo</button>
      </div>

      <div className="correos-tabs">
        <button
          className={`tab-btn ${activeTab === 'nuevos' ? 'active' : ''}`}
          onClick={() => setActiveTab('nuevos')}
        >
          Correos Nuevos
        </button>
        <button
          className={`tab-btn ${activeTab === 'enviados' ? 'active' : ''}`}
          onClick={() => setActiveTab('enviados')}
        >
          Correos Enviados
        </button>
      </div>

      <div className="correos-list-container">
        {isLoading ? (
          <p>Cargando correos...</p>
        ) : correos.length > 0 ? (
          correos.map(correo => <CorreoListItem key={correo.id} correo={correo} />)
        ) : (
          <p>No hay correos en esta bandeja.</p>
        )}
      </div>
    </div>
  );
};

export default CorreosPage;