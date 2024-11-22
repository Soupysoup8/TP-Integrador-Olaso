import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dni, setDni] = useState("");
    const navigate = useNavigate();
  
    const handleAuth = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3001/api/tpOlaso/v0/auth/login', {dni, email, password});
                if (response.status === 200 || response.status === 201) {
                    alert('Login exitoso!');
            
                    // Guarda el token y el rol en localStorage
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('userRole', response.data.rol);
            
                    console.log('Stored userRole:', localStorage.getItem('userRole')); // Agregado para depuración
            
                    navigate('/');
                  } else {
                    console.log('Error al iniciar sesión.');
                  }
                } catch (error) {
                  console.log('Error:', error); // Agregado para depuración
                }
    };
    

    return(
        <div id="divFormLogin">
            <form onSubmit={handleAuth} id="formLogin">
            <h1>Ingrese sus datos</h1>

            <div className="loginContainer">
                <label>DNI</label>
                <input 
                    id="dni"
                    type="text"
                    aria-label="Ingrese su DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                />

                <label>Email</label>
                <input 
                    id="email"
                    type="email"
                    aria-label="Ingrese su email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Contraseña</label>
                <input 
                    id="password"
                    type="password"
                    aria-label="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                </div>

                <div className="buttonContainer">

                <Link to='/register'>
                    <button type='button'>Registrarse</button>
                </Link>

                <Link to='/home'>
                    <button type='submit'>Guardar</button>
                </Link>
                
                </div>
            </form>
        </div>
    )
}

export default FormLogin;