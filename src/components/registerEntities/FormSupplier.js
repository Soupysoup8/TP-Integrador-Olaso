import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function FormSupplier() {

    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
  
    const handleSupplierForm = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, sector, address, contact, email})
                });
            if (response.status === 200 || response.status === 201) {
              alert('Proveedor registrado exitosamente!');
              navigate('/registerEntities');
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
        <div id='FormSupplier' className="formSupplier">
            <form onSubmit={handleSupplierForm}>
                <label>Nombre</label>
                <input 
                    id="nameSupplier"
                    type="text"
                    aria-label="Ingrese el nombre/empresa del proveedor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Sector</label>
                <select
                    id="sectorSupplier"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                >
                    <option value="">Seleccione un sector</option>
                    <option value="agricultura">Agricultura</option>
                    <option value="maquinaria">Maquinaria</option>
                </select>

                <label>Dirección</label>
                <input 
                    id="addressSupplier"
                    type="text"
                    aria-label="Ingrese la direccion del proveedor"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label>Contacto</label>
                <input 
                    id="contactSupplier"
                    type="text"
                    aria-label="Ingrese el contacto del proveedor"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />

                <label>Email</label>
                <input 
                    id="emailSupplier"
                    type="email"
                    aria-label="Ingrese el email del proveedor"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}

export default FormSupplier;