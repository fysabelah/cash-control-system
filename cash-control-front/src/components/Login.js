import React from "react";
import "../styles/Login.css";

export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function sendLoginRequest() {
        const response = fetch('/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: btoa(password)
            })
        })

        console.log(response);

        alert(response);

        /*.then((response) => {
            if (response.ok) {
                console.log(response);
            } else {
                console.log('deu ruim ');
                console.log(response)
                console.log(response)
            }
        })*/
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
                    <button onClick={sendLoginRequest}>Enviar</button>
                </div>
            </form>
        </div>
    );
}