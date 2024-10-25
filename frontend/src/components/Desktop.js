// src/components/Desktop.js
import React, { useState } from 'react';

import Container from './Container';
import AppIcon from './AppIcon';
import TaskBar from './TaskBar';
import MiVentana from './MiVentana';

function Desktop() {
  const [isContainerVisible, setContainerVisible] = useState(false);
  const [isMiVentanaVisible, setMiVentanaVisible] = useState(false);

  const handleOpenContainer = () => {
    setContainerVisible(true);
  };

  const handleCloseContainer = () => {
    setContainerVisible(false);
  };

  const handleToggleMiVentana = () => {
    setMiVentanaVisible(!isMiVentanaVisible);
  };

  const handleCloseMiVentana = () => {
    setMiVentanaVisible(false);
  };

  return (
    <div>
      <AppIcon onClick={handleOpenContainer} />
      {isContainerVisible && (
        <Container onClose={handleCloseContainer} />
      )}
      <TaskBar onToggleMiVentana={handleToggleMiVentana} />
      <MiVentana isVisible={isMiVentanaVisible} onClose={handleCloseMiVentana} />
    </div>
  );
}

export default Desktop;