import React, { useState } from 'react';
import keysImg from '../styles/img/keys-4.png'; // Asegúrate de que la ruta sea correcta
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function WindowComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor ingrese ambos, correo y contraseña.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', { email, password });
      if (response.status === 200 || response.status === 201) {
        alert('Login exitoso!');

        // Guarda el token y el rol en localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userRole', response.data.rol);

        console.log('Stored userRole:', localStorage.getItem('userRole')); // Agregado para depuración

        navigate('/');
      } else {
        setError('Error al iniciar sesión.');
      }
    } catch (error) {
      console.log('Error:', error); // Agregado para depuración
      setError(error.response?.data?.message || 'Error en la solicitud');
    }
  };
  

  return (
    <div className="container-window">
      <div className="window" style={{width: '90%', maxWidth: '670px', height: "250px" }}>
        <div className="title-bar">
          <div className="title-bar-text">
            Welcome Back to Windows
          </div>
        </div>
        <div className="window-content">

          <form onSubmit={handleAuth}>
            <div className="keys-img">
              <img src={keysImg} alt="Keys" style={{ height: '130px' }} />
            </div>

            <div className='fields'>
            <div className="logIn">
              <h1>Type your mail and password to log in.</h1>
            </div>
            <div className="field-row-login-email">
              <label htmlFor="Mail">Mail: </label>
              <input 
                id="Mail" 
                type="email" 
                aria-label="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field-row-login-password">
              <label htmlFor="Password">Password: </label>
              <input 
                id="Password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="field-row-login-guest">
              <Link to="/">Log in as a guest</Link>
            </div>

            </div>
            
            <div className="button">
              <button type="submit">OK</button>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default WindowComponent;