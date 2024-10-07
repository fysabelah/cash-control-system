import React from 'react';
import "../styles/Header.css";
import {useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate('/');
    }

    function goToHome() {
        navigate('/caixa');
    }

    return (
        <header className="Header">
            <div className="HeaderDiv">
                <div className="HeaderItem">
                    <h3 onClick={goToHome}>Sistema de Controle de Caixa</h3>
                </div>
                <div>
                    <p onClick={logout}>Sair</p>
                </div>
            </div>
        </header>
    );
}

export default Header;