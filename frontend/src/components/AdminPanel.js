import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa el estilo de Quill

function AdminPanel({ onClose }) {
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEntry = { title, preview, content };
    
    try {
      // Aquí haces el post al servidor para crear la nueva entrada
      await axios.post('http://localhost:3000/api/v1/blog', newEntry);
      alert('Entrada creada exitosamente');
      onClose();  // Cierra el panel después de crear la entrada
    } catch (error) {
      console.error('Error creando la entrada', error);
      alert('Hubo un error al crear la entrada');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Crear nueva entrada</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input 
            id="title" 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="preview">Vista Previa</label>
          <input 
            id="preview" 
            type="text" 
            value={preview} 
            onChange={(e) => setPreview(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="content">Contenido</label>
          <ReactQuill 
            value={content} 
            onChange={setContent} // Actualiza el contenido al cambiar
            required 
          />
        </div>
        <button type="submit">Crear Entrada</button>
        <button type="button" onClick={onClose}>Cerrar</button>
      </form>
    </div>
  );
}

export default AdminPanel;
