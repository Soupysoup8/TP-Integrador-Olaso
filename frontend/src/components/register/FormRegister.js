
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function FormRegister() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, surname, dni: Number(dni), email, password}),
            })

            if (response.ok) {
                alert('Registro exitoso!');
                navigate('/');
            }
            else {
                const errorData = await response.json();
                alert(`Error en el registro: ${errorData.message}`);
                console.log('')
            }
        } catch(error) {
            console.error('Error:', error);
            alert('Hubo un problema con el registro.')
        }

    }

    return(
        <div id="divFormRegister" className="formRegister">
            <form onSubmit={handleRegister}>
            <h1>Cree una nueva cuenta</h1>

            <div className="loginContainer">
                <label>Nombres</label>
                <input
                    id="Name"
                    type='text'
                    aria-label="Ingrese su nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>

                <label>Apellidos</label>
                <input
                    id="Surname"
                    type='text'
                    aria-label="Ingrese su apellido"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}/>

                <label>DNI</label>
                <input
                    id="Dni"
                    type="text"
                    aria-label="Ingrese su DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}/>

                <label>Email</label>
                <input
                    id="Email"
                    type='email'
                    aria-label="Ingrese su email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                <label>Contraseña</label>
                <input
                    id="Password"
                    type='password'
                    aria-label="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

            </div>

            <div class="buttonContainer">
                <Link to='/'>
                    <button type='button'>Iniciar Sesion</button>
                </Link>

                <Link to='/home'>
                    <button type="submit">Guardar</button>
                </Link>

            </div>
            </form>

            
        </div>
    )
}

export default FormRegister;