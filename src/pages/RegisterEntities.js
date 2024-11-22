import React, { useState } from "react";
import Menubar from "../components/menu/Menubar";
import FormClient from "../components/registerEntities/FormClient";
import FormSupplier from "../components/registerEntities/FormSupplier";
import FormProduct from "../components/registerEntities/FormProduct";

function RegisterEntities() {

    const [showForm, setShowForm] = useState(null);


    return(
        <div id="registerEntities">
            <Menubar />

            <h2>Registro de Entidades</h2>
            <div>
                <button onClick={() => setShowForm('supplier')}>Registrar Proveedor</button>
                <button onClick={() => setShowForm('client')}>Registrar Cliente</button>
                <button onClick={() => setShowForm('product')}>Registrar Producto</button>
            </div>

            {/* Mostrar el formulario correspondiente según el estado */}
            {showForm === 'supplier' && <FormSupplier />}
            {showForm === 'client' && <FormClient />}
            {showForm === 'product' && <FormProduct />}
        </div>
    );
}

export default RegisterEntities;