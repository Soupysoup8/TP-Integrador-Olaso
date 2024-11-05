import React, { useState } from "react";

function FormLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dni, setDni] = useState("")
    const [error, setError] = useState("")
  
    const handleAuth = async (e) => {
      e.preventDefault();
      
      if (!dni ||!email || !password) {
        setError('Por favor ingrese su dni, correo y contraseña.');
        return;
      }

    }

    return(
        <div>
            <form>
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
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}

export default FormLogin;