import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function FormLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dni, setDni] = useState("");
    const navigate = useNavigate();
  
    const handleAuth = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({dni: Number(dni), email, password})
                });
            if (response.status === 200 || response.status === 201) {
              alert('Login exitoso!');
              navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Error en el registro: ${errorData.message}`);
                console.log('')
            }
          } catch (error) {
            console.log('Error:', error);
            alert('Hubo un problema con el registro.')
            }
        };

    return(
        <div>
            <form onSubmit={handleAuth}>
                <label>DNI</label>
                <input 
                    id="dni"
                    type="number"
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
                <Link to='/home'>
                    <button type='button'>Guardar</button>
                </Link>

                <Link to='/register'>
                    <button type='button'>Registrarse</button>
                </Link>
            </form>
        </div>
    )
}

export default FormLogin;