import React, { useState } from "react";
import Menubar from "../components/menu/Menubar";
import FormClient from "../components/registerEntities/FormClient";
import FormSupplier from "../components/registerEntities/FormSupplier";
import FormProduct from "../components/registerEntities/FormProduct";

function RegisterEntities() {

    const [showForm, setShowForm] = useState(null);


    return(
        <div id="allRegisterEntities">
            <Menubar />

        <div id="registerEntities">
            <h2>Registro de Entidades</h2>
            <div>
                <button onClick={() => setShowForm('product')}>Registrar Producto</button>
                <button onClick={() => setShowForm('supplier')}>Registrar Proveedor</button>
                <button onClick={() => setShowForm('client')}>Registrar Cliente</button>
            </div>

            {/* Mostrar el formulario correspondiente según el estado */}
            {showForm === 'supplier' && <FormSupplier />}
            {showForm === 'client' && <FormClient />}
            {showForm === 'product' && <FormProduct />}
        </div>
        </div>
    );
}

export default RegisterEntities;