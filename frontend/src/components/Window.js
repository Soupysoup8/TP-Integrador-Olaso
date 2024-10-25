import React, { useEffect, useState } from 'react';
import close from "../styles/98.css/icon/close.svg";
import mini from "../styles/98.css/icon/minimize.svg";
import MainBlog from './blogPages/MainBlog';
import AdminPanel from './AdminPanel';

function Window({ onClose, userRole }) {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
  };

  const handleBack = () => {
    setSelectedEntry(null);
  };

  const handleOpenAdminPanel = () => {
    const userRole = localStorage.getItem('userRole'); // Esto debería ser una cadena

    if (userRole === 'admin') {
      setShowAdminPanel(true);
    } else {
      alert("No tienes acceso al panel de administración.");
    }
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
  };

  useEffect(() => {
    const movableWindow = document.getElementById('movableWindow');
    const otherWindow = document.getElementById('otherWindow');

    const updateSize = () => {
      if (movableWindow && otherWindow) {
        otherWindow.style.width = `calc(${movableWindow.offsetWidth}px - 25px)`;
        otherWindow.style.height = `calc(${movableWindow.offsetHeight}px - 105px)`;
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  return (
    <div className="window" id="movableWindow">
      <div className="title-bar" id="dragHandle">
        <div className="title-bar-text">Blog</div>
        <div className="title-bar-controls">
          <button type="button" id="Minimize">
            <img src={mini} alt="Minimize" />
          </button>
          <button type="button" id="Close" onClick={onClose}>
            <img src={close} alt="Close" />
          </button>
        </div>
      </div>
      <div className="navegador">
        <button 
          className="button-search-bar" 
          onClick={handleOpenAdminPanel} 
          disabled={!isAdmin} // Desactiva el botón si no es admin
        >
          Admin
        </button>
        <button className="button-search-bar" onClick={handleBack}>Back</button>
        <input id="search-bar" type="text" placeholder="https://" />
        <button className="button-search-bar">Search</button>
        <button className="button-search-bar">Other</button>
      </div>
      <div className="window window-borders-blog" id="otherWindow">
        {showAdminPanel ? (
          <AdminPanel onClose={handleCloseAdminPanel} />
        ) : (
          <MainBlog 
            onEntrySelect={handleEntrySelect} 
            onBack={handleBack} 
            selectedEntry={selectedEntry} 
          />
        )}
      </div>
    </div>
  );
}

export default Window;