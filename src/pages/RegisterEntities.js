import React from "react";
import Menubar from "../components/menu/Menubar";
import FormClient from "../components/registerEntities/FormClient";
import FormSupplier from "../components/registerEntities/FormSupplier";
import FormProduct from "../components/registerEntities/FormProduct";

function RegisterEntities() {
    return(
        <div>
            <Menubar />
            <FormClient />
            <FormSupplier />
            <FormProduct />;
        </div>
    )
}

export default RegisterEntities;