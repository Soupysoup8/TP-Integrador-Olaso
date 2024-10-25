// src/components/TaskBar.js
import React, { useState, useEffect } from 'react';
import logo from '../styles/img/pngwing.com.png';

function TaskBar({ onToggleMiVentana }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours % 12 || 12; // Convert 24h to 12h format
      const ampm = hours >= 12 ? 'PM' : 'AM';
      setTime(`${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`);
    };

    const intervalId = setInterval(updateClock, 500);
    updateClock(); // Initial call to set the time immediately

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="taskBar">
      <button id="mostrarVentana" onClick={onToggleMiVentana}>
        <img src={logo} style={{ height: '20px' }} alt="Start" />
        Start
      </button>
      <div className="reloj">{time}</div>
    </div>
  );
}

export default TaskBar;
