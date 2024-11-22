import React from "react";
import Menubar from "../components/menu/Menubar";
import FormStockMovement from "../components/registerMovements/FormStockMovements";


function RegisterMovementsPage() {
    return(
        <div id="registerMovementsPage">
            <Menubar />
            <h2>Registro de Movimiento de Stock</h2>
            <FormStockMovement />
        </div>
    )
}

export default RegisterMovementsPage;