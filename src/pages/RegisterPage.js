import React from "react";
import FormRegister from "../components/register/FormRegister";
import Menubar from "../components/menu/Menubar";

function RegisterPage() {
    return(
        <div>
            <Menubar />

            <h1>Cree una nueva cuenta</h1>
            <FormRegister/>
        </div>
        )
}

export default RegisterPage;