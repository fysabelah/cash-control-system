import React from "react";

export default function Login() {
    return (
        <div className="Login">
            <form className="LoginForm">
                <div>
                    <div>
                        <p>Usuário</p>
                    </div>
                    <div>
                        <input type={"text"}/>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Senha</p>
                    </div>
                    <div>
                        <input type={"password"}/>
                    </div>
                </div>
                <div>
                    <button>Enviar</button>
                </div>
            </form>
        </div>
    );
}