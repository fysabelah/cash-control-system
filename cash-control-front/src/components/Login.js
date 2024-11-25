import React from "react";
import "../styles/Login.css";
import {useNavigate} from "react-router-dom";
import "../styles/Generic.css";
import {toast, ToastContainer} from "react-toastify";
import useApiRequests from "./ApiRequests";

const useAuth = () => {
    const navigate = useNavigate();
    const timeToRemoveNotification = 10000;
    const {requestWithoutAuthentication} = useApiRequests();

    const sendLoginRequest = (username, password) => {
        return requestWithoutAuthentication(`/user/token?username=${username}&password=${btoa(password)}`);
    };

    const createUser = (username, password) => {
        return requestWithoutAuthentication('/user', 'POST', {
            username,
            password,
        });
    };

    const handleResponse = async (response, buttonName, setButtonName) => {
        if (buttonName === "Cadastrar") {
            if (response.ok) {
                toast.success('Usuário cadastrado com sucesso!',
                    {position: "top-right", autoClose: timeToRemoveNotification});
                setButtonName("Entrar");
            }
        } else {
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                navigate('/caixa');
            }
        }
    };

    return {sendLoginRequest, createUser, handleResponse};
};

export default function Login() {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });
    const [buttonName, setButtonName] = React.useState("Entrar");

    const {sendLoginRequest, createUser, handleResponse} = useAuth();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {username, password} = formData;

        let response;

        if (username && password) {
            if (buttonName === "Cadastrar") {
                response = await createUser(username, password);
            } else {
                response = await sendLoginRequest(username, password);
            }

            await handleResponse(response, buttonName, setButtonName);
        }
    };

    const toggleButton = () => {
        setButtonName((prevName) => (prevName === "Entrar" ? "Cadastrar" : "Entrar"));
    };

    return (
        <div className="Login">
            <div>
                <form className="Form" onSubmit={handleSubmit}>
                    <div className="FormItem">
                        <p>Usuário</p>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="FormItem">
                        <p>Senha</p>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="ButtonDiv">
                        <button type="submit">{buttonName}</button>
                    </div>
                </form>
            </div>
            <div>
                <p className="LoginOptionButton" onClick={toggleButton}>
                    {buttonName === "Entrar" ? "Cadastrar" : "Entrar"}
                </p>
            </div>
            <ToastContainer/>
        </div>
    );
}