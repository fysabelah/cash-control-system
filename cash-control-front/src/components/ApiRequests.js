import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';

const useApiRequests = () => {
    const navigate = useNavigate();
    const genericErrorMessage = 'Ocorreu um erro!';
    const timeRemoveNotification = 10000;

    const requestWithAuthentication = (url, method = 'GET', body = null) => {
        return request(url, method, body, true);
    };

    const requestWithoutAuthentication = (url, method = 'GET', body = null) => {
        return request(url, method, body, false);
    };

    const getHeaders = (isAuthenticated = false) => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (isAuthenticated) {
            const token = localStorage.getItem('token');

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return headers;
    };

    const request = async (url, method = 'GET', body = null, isAuthenticated) => {
        const headers = getHeaders(isAuthenticated);
        const requestBody = body ? JSON.stringify(body) : null;

        try {
            const response = await fetch('/api' + url, {method, headers, body: requestBody});

            if (response.status === 401 || response.status === 403) {
                navigate('/login');

                return;
            }

            if (!response.ok) {
                const data = await response.json();

                toast.error(data.message || genericErrorMessage, {
                    position: "top-right",
                    autoClose: timeRemoveNotification
                });
            }

            return response;
        } catch (error) {
            toast.error(error.message || genericErrorMessage, {
                position: "top-right",
                autoClose: timeRemoveNotification
            });
        }
    }

    return {requestWithAuthentication, requestWithoutAuthentication};
}

export default useApiRequests;