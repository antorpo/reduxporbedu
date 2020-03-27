import React from "react";
import {Link} from "react-router-dom"

function Menu(props){
    return(
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/">Usuarios</Link>
            <Link to="/tareas">Tareas</Link>
        </nav>
    );
}

export default Menu;