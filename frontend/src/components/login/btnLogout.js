import React from 'react';
import { useNavigate } from 'react-router-dom';

function BtnLogOut() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/");
  };

  return (
    <div>
      <button id="logOut" onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default BtnLogOut;