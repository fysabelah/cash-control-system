import React from 'react';
import Login from "./Login";
import "../styles/Home.css";

function Home() {
    const [loginComponentButtonName, setLoginComponentButtonName] = React.useState("Entrar");
    const [homeButtonName, setHomeButtonName] = React.useState("Cadastrar");

    function updateButtonNames() {
        const aux = loginComponentButtonName;
        setLoginComponentButtonName(homeButtonName);
        setHomeButtonName(aux);
    }

    return (
        <div className="Home">
            <div>
                <Login buttonName={loginComponentButtonName}/>
            </div>
            <div>
                <p onClick={updateButtonNames}>{homeButtonName}</p>
            </div>
        </div>
    )

}

export default Home;