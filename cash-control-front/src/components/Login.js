import React from "react";
import "../styles/Login.css";
import {useNavigate} from 'react-router-dom';
import "../styles/Generic.css"


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

    const sendLoginRequest = async () => {
        return await fetch('/api/user/token?username=' + username + "&password=" + btoa(password), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    const createUser = async () => {
        return await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: btoa(password)
            })
        });
    }

    const sendRequest = async (event) => {
        event.preventDefault();
        try {
            let response;

            if (username && password) {
                if (buttonName === 'Cadastrar') {
                    response = await createUser();
                } else {
                    response = await sendLoginRequest();
                }

                if (buttonName === 'Cadastrar') {
                    if (response.ok) {
                        alert('Usuário cadastrado com sucesso!');
                        window.location.reload();
                    } else {
                        const data = await response.json();
                        alert(data.message);
                    }
                } else {
                    const data = await response.json();

                    if (response.ok) {
                        localStorage.setItem("token", data.token);
                        navigate('/caixa');
                    } else {
                        alert(data.message);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Login">
            <form className="Form">
                <div className="FormItem">
                    <div>
                        <p>Usuário</p>
                    </div>
                    <div>
                        <input type={"text"} name="usuario" onChange={updateUsername}/>
                    </div>
                </div>
                <div className="FormItem">
                    <div>
                        <p>Senha</p>
                    </div>
                    <div>
                        <input name="password" type={"password"} onChange={updatePassword}/>
                    </div>
                </div>
                <div className="ButtonDiv">
                    <button onClick={sendRequest}>{buttonName}</button>
                </div>
            </form>
        </div>
    );
}