import React, { useState } from 'react';
import EntryList from '../EntryList';
import EntryContent from '../EntryContent';
import AdminPanel from '../AdminPanel';

function MainBlog({ onBack, onEntrySelect, selectedEntry, isAdmin }) {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleShowAdminPanel = () => {
    if (isAdmin) {
      setShowAdminPanel(true);
    } else {
      alert("No tienes acceso al panel de administración.");
    }
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
  };

  return (
    <div className='blog'>
      <div className='blog-presentacion'>
        <h1>Bienvenido!</h1>
        {isAdmin && (
          <button onClick={handleShowAdminPanel}>Abrir Panel de Admin</button> // Solo visible para admins
        )}
      </div>
      {showAdminPanel ? (
        <AdminPanel onClose={handleCloseAdminPanel}/> // Muestra el panel de admin
      ) : selectedEntry ? (
        <EntryContent 
          title={selectedEntry.title} 
          preview={selectedEntry.preview} 
          content={selectedEntry.content}
          onBack={onBack}
        />
      ) : (
        <EntryList onEntrySelect={onEntrySelect} />
      )}
    </div>
  );
}

export default MainBlog;
