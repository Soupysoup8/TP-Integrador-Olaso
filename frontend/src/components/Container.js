/*
Componente que es un containter para la ventana,
esto fue hecho con la unica funcion de que se 
mueva la ventana principal.
*/
import React, { useEffect } from 'react';
import Window from './Window';

function Container({ onClose }) {

  /* useEffect  */

  useEffect(() => {
    const draggableElement = document.getElementById('movableWindow');
    const dragHandle = document.getElementById('dragHandle');
    let offsetX, offsetY;

    const onMouseDown = (e) => {
      offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
      offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      draggableElement.style.left = `${x}px`;
      draggableElement.style.top = `${y}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (dragHandle) {
      dragHandle.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      if (dragHandle) {
        dragHandle.removeEventListener('mousedown', onMouseDown);
      }
    };
  }, []);

  return (
    <div className="container-website" id="container">
      <Window onClose={onClose} />
    </div>
  );
}

export default Container;
