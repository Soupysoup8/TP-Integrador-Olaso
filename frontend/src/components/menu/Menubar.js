import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../styles/Logo.svg'; // Asegúrate de poner la ruta correcta
import BtnLogOut from "../login/btnLogout";

function Menubar() {
    const userRole = localStorage.getItem('userRole'); // Obtener el rol del usuario

    return (
        <div id='sideMenuBar' className='menuBar'>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>

            <div className="menu">
                <ul>
                    {/* Pestañas visibles para todos los roles */}
                    <li>
                        <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
                            Inicio
                        </NavLink>
                    </li>
                    
                    {userRole === 'admin' && (
                        <>
                            {/* Pestañas solo para el rol admin */}
                            <li>
                                <NavLink to="/registerEntities" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Registro de Entidades
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/registerMovements" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Registro de Movimientos
                                </NavLink>
                            </li>
                        </>
                    )}
                    
                    {/* Pestañas accesibles tanto para admin como para user */}
                    {(userRole === 'admin' || userRole === 'user') && (
                        <>
                            <li>
                                <NavLink to="/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Inventario
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/allMovements" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Movimientos
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <BtnLogOut />
        </div>
    );
}

export default Menubar;
