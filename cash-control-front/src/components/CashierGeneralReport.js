import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CashierGeneralReport(
    {
        cashierId,
        balance = {
            in: 0,
            out: 0,
            total: 0
        },
        balanceWithFilter = {
            in: 0,
            out: 0,
            total: 0
        }
    }
) {
    const [name, setName] = useState('');
    const [initialBalance, setInitialBalance] = useState(0);
    const navigate = useNavigate();
    const genericError = 'Ocorreu um erro!';
    const timeRemoveNotification = 10000;

    const getCashier = async (cashierId) => {
        const response = await fetch(`/api/cashier/${cashierId}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            method: 'GET'
        });

        if (response.status === 401 || response.status === 403) {
            return navigate('/');
        }

        if (!response.ok) {
            return navigate('/caixa');
        }

        return await response.json();
    }

    useEffect(() => {
        getCashier(cashierId)
            .then(data => {
                setInitialBalance(data.balance);
                setName(data.description);
            });
    }, [cashierId]);

    const report = (title, inflow, outflow, total) => (
        <div className="FlowCashInfo">
            <div>
                <h3>{title}</h3>
            </div>
            <div className="ReportItem">
                <div>
                    Entrada
                </div>
                <div>
                    R$ {inflow}
                </div>
            </div>
            <div className="ReportItem">
                <div>
                    Saída
                </div>
                <div>
                    R$ {outflow}
                </div>
            </div>
            <div className="ReportItem">
                <div>
                    Total
                </div>
                <div style={{color: total < 0 ? 'red' : 'black'}}>
                    R$ {total}
                </div>
            </div>
        </div>
    )

    const updateCashierInformation = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/cashier/${cashierId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    balance: initialBalance,
                    description: name,
                }),
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 401 || response.status === 403) {
                navigate("/");
            }

            const data = await response.json();

            if (!response.ok) {
                const message = data && data.message ? data.message : genericError;

                toast.error(message, {position: "top-right", autoClose: timeRemoveNotification});
            } else {
                toast.success('Caixa atualizado com sucesso!', {
                    position: "top-right",
                    autoClose: timeRemoveNotification
                });

                window.location.reload();
            }

        } catch (error) {
            console.error(error);
            toast.error(genericError, {position: "top-right", autoClose: timeRemoveNotification});
        }
    }

    return (
        <div className="CashFlowHeader">
            <div className="FlowCashInfo">
                <div><h3>Caixa</h3></div>
                <div className="ReportItem">
                    <div>Descrição</div>
                    <div>
                        <input value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div className="ReportItem">
                    <div>
                        Saldo Inicial
                    </div>
                    <div>
                        <input value={typeof (initialBalance) === 'number' ? initialBalance.toFixed(2) : initialBalance}
                               onChange={(e) => setInitialBalance(e.target.value)}/>
                    </div>
                </div>
                <div className="ReportItem">
                    <button onClick={updateCashierInformation}>Atualizar</button>
                </div>
            </div>
            <ToastContainer/>
            {report('Movimento Geral', balance.in, balance.out, balance.total)}
            {report('Movimento com Filtro', balanceWithFilter.in, balanceWithFilter.out, balanceWithFilter.total)}
        </div>
    );
}

export default CashierGeneralReport;