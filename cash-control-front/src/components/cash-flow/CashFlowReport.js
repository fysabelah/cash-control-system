import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApiRequests from "../ApiRequests";


function CashFlowReport(
    {
        cashRegisterId,
        filters = {
            month: '',
            year: ''
        }
    }
) {
    const timeRemoveNotification = 10000;

    const {requestWithAuthentication} = useApiRequests();

    const [cashBalance, setCashBalance] = useState({
        in: 0,
        out: 0,
        total: 0
    });

    const [cashBalanceWithFilters, setCashBalanceWithFilters] = useState({
        in: 0,
        out: 0,
        total: 0
    });

    const [cashRegister, setCashRegister] = useState({
        balance: 0,
        description: ''
    })

    const getCashRegisterInformation = async () => {
        const response = await requestWithAuthentication(`/cashier/${cashRegisterId}`);

        if (response.ok) {
            const data = await response.json();

            setCashRegister({
                balance: data.balance,
                description: data.description,
            });
        }
    };

    const handleChangeCashierRegister = (e) => {
        const {name, value} = e.target;
        setCashRegister((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getGeneralReport = async () => {
        const url = `/cashflow/resumed/${cashRegisterId}`;

        const response = await requestWithAuthentication(url);

        if (response.ok) {
            const data = await response.json();

            setCashBalance({
                in: data.cashInflow,
                out: data.cashOutflow,
                total: data.balanceGeneral
            });
        }
    };

    const getReportWithFilters = async () => {
        let url = `/cashflow/resumed/${cashRegisterId}`;

        if (filters.month.length > 0) {
            url += `?month=${filters.month}`;
        }

        if (filters.year.length > 0) {
            url += url.includes("month") ? url += "&" : "?";

            url += `year=${filters.year}`;
        }

        const response = await requestWithAuthentication(url);

        if (response.ok) {
            const data = await response.json();

            setCashBalanceWithFilters({
                in: data.cashInflow,
                out: data.cashOutflow,
                total: data.balanceGeneral
            });
        }

    };

    useEffect(() => {
        getCashRegisterInformation();
        getGeneralReport();
    }, [cashRegisterId]);

    useEffect(() => {
        getReportWithFilters();
    }, [cashRegisterId, filters]);

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

    const updateCashRegisterInformation = async (event) => {
        event.preventDefault();

        requestWithAuthentication(`/cashier/${cashRegisterId}`,
            'PUT',
            cashRegister
        ).then(response => {
            if (response.ok) {
                toast.success('Caixa atualizado com sucesso!', {
                    position: "top-right",
                    autoClose: timeRemoveNotification
                });

                getGeneralReport();
                getReportWithFilters();
            }
        });
    }

    return (
        <div className="CashFlowHeader">
            <div className="FlowCashInfo">
                <div><h3>Caixa</h3></div>
                <div className="ReportItem">
                    <div>Descrição</div>
                    <div>
                        <input name="description"
                               value={cashRegister.description}
                               onChange={handleChangeCashierRegister}
                               required
                        />
                    </div>
                </div>
                <div className="ReportItem">
                    <div>
                        Saldo Inicial
                    </div>
                    <div>
                        <input
                            value={typeof (cashRegister.balance) === 'number' ? cashRegister.balance.toFixed(2) : cashRegister.balance}
                            required
                            name="balance"
                            onChange={handleChangeCashierRegister}
                        />
                    </div>
                </div>
                <div className="ReportItem">
                    <button onClick={updateCashRegisterInformation}>Atualizar</button>
                </div>
            </div>
            <ToastContainer/>
            {report('Movimento Geral', cashBalance.in, cashBalance.out, cashBalance.total)}
            {report('Movimento com Filtro', cashBalanceWithFilters.in, cashBalanceWithFilters.out, cashBalanceWithFilters.total)}
        </div>
    );
}

export default CashFlowReport;