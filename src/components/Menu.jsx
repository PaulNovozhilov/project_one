import React from "react";
import {NavLink} from "react-router-dom";

export function Menu(){
    return(
        <nav className="nav">
            <NavLink className="nav-link active" aria-current="page" to="/">Главная</NavLink>
            <NavLink className="nav-link" to="/addPost">Добавить пост</NavLink>
        </nav>
    )
}