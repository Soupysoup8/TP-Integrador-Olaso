import React, { useState } from 'react';
import keyWinAlt from '../styles/img/key_win_alt-2.png';
import { Link, useNavigate } from 'react-router-dom';

function RegisterWindow() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password }),
      });
  
      if (response.ok) {
        alert('Registro exitoso!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(`Error en el registro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con el registro.');
    }  
  };

  return (
    <div className="container-window">
      <div className="window" style={{ width: '90%', maxWidth: '670px', height: "250px" }}>
        <div className="title-bar">
          <div className="title-bar-text">Welcome to Windows</div>
        </div>
        <div className="window-contents">
          <div className="keys-img2">
            <img src={keyWinAlt} alt="Keys" style={{ height: '130px' }} />
          </div>

          <form onSubmit={handleRegister}>
            <div className='fields-register'>
              <div className="register">
                <h1>Type your username, mail, and password to register.</h1>
              </div>

              <div className="field-row-register-username">
                <label htmlFor="Username">Username </label>
                <input
                  id="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="field-row-register-email">
                <label htmlFor="Mail">Mail: </label>
                <input
                  id="Mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field-row-register-password">
                <label htmlFor="Password">Password: </label>
                <input
                  id="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="button-register">
                <button type="submit">OK</button>
                <Link to="/login">
                  <button type="button">Log In</button>
                </Link>
              </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterWindow;