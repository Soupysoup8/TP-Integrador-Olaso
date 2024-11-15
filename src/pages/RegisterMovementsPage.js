import React from "react";
import Menubar from "../components/menu/Menubar";
import FormStockMovement from "../components/registerMovements/FormStockMovements";


function RegisterMovementsPage() {
    return(
        <div>
            <Menubar />
            <FormStockMovement />
        </div>
    )
}

export default RegisterMovementsPage;