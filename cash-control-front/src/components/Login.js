import React from "react";
import "../styles/Login.css";
import {useNavigate} from 'react-router-dom';


export default function Login({buttonName}) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    const sendLoginRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user/token?username=' + username + "&password=" + btoa(password), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate('/caixa');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Login">
            <form className="LoginForm">
                <div className="LoginInputs">
                    <div>
                        <p>Usuário</p>
                    </div>
                    <div>
                        <input type={"text"} name="usuario" onChange={updateUsername}/>
                    </div>
                </div>
                <div className="LoginInputs">
                    <div>
                        <p>Senha</p>
                    </div>
                    <div>
                        <input name="password" type={"password"} onChange={updatePassword}/>
                    </div>
                </div>
                <div className="ButtonDiv">
                    <button onClick={sendLoginRequest}>{buttonName}</button>
                </div>
            </form>
        </div>
    );
}