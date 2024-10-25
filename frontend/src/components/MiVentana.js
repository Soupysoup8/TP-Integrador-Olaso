import React from 'react';
import { useNavigate } from 'react-router-dom';

function MiVentana({ isVisible, onClose }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole")

    navigate("/login")
  }

  return (
    <div id="miVentana" className={`ventana ${isVisible ? '' : 'hidden'}`} style={{ width: '100px' }}>
      <h1>Windows 98</h1>
      <button id="configUser">Edit User Settings</button>
      <button id="logOut" onClick={handleLogout}>Log Out</button>
      <button onClick={onClose}>Close Window</button> {/* Botón para cerrar la ventana */}
    </div>
  );
}

export default MiVentana;