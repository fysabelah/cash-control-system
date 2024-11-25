import React from 'react';
import "../styles/Header.css";
import {useNavigate} from "react-router-dom";

const useHeader = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/caixa');
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    return {goToHome, logout};
}

function Header() {

    const {goToHome, logout} = useHeader();

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