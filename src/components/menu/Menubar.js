import React from "react";
import { NavLink } from "react-router-dom";

function Menubar() {
    return(
        <div id='sideMenuBar' className='menuBar'>
            <ul>
                <li>
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Inicio
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/registerEntities"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Registro de Entidades
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/registerMovements"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Registro de Movimientos
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/allMovements"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Movimientos
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/inventory"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Inventario
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Menubar;
