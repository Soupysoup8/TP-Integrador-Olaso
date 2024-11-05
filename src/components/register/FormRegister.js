
import React from "react";

function FormRegister() {
    return(
        <div>
            <form>
                <label>Nombres</label>
                <input id="name"></input>

                <label>Apellidos</label>
                <input id="surname"></input>

                <label>DNI</label>
                <input id="dni"></input>

                <label>Email</label>
                <input id="email"></input>

                <label>Contraseña</label>
                <input id="password"></input>

                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}

export default FormRegister;