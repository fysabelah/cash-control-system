import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Header from "./Header";
import CashierGeneralReport from "./CashierGeneralReport";
import "../styles/FlowCash.css";
import {toast} from "react-toastify";
import {MdFirstPage, MdLastPage} from "react-icons/md";

function FlowCash() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = React.useState('');
    const [selectedYear, setSelectedYear] = React.useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [flows, setFlows] = React.useState([]);
    const [description, setDescription] = React.useState('');
    const [value, setValue] = React.useState(0);
    const [type, setType] = React.useState('E');
    const [balance, setBalance] = React.useState({
        in: 0,
        out: 0,
        total: 0
    });
    const [balanceWithFilter, setBalanceWithFilter] = React.useState({
        in: 0,
        out: 0,
        total: 0
    });
    const types = {
        E: 'Entrada',
        S: 'Saída'
    }

    const genericErrorMessage = 'Ocorreu um erro!';
    const timeRemoveNotification = 10000;
    const [showModalCreateFlow, setShowModalCreateFlow] = React.useState(false);
    const months = {
        EMPTY: '',
        JANUARY: 'Janeiro',
        FEBRUARY: 'Fevereiro',
        MARCH: 'Março',
        APRIL: 'Abril',
        MAY: 'Maio',
        JUNE: 'Junho',
        JULY: 'Julho',
        AUGUST: 'Agosto',
        SEPTEMBER: 'Setembro',
        OCTOBER: 'Outubro',
        NOVEMBER: 'Novembro',
        DECEMBER: 'Dezembro'
    }

    const getCashFlow = async () => {
        let path = `/api/cashflow?initialPage=${currentPage ? currentPage : 0}&cashierId=${id}`;

        if (selectedMonth.length > 0 && selectedMonth !== 'EMPTY' && selectedYear.length > 0) {
            path += `&year=${selectedYear}&month=${selectedMonth}`;
        } else if (selectedYear.length > 0) {
            path += `&year=${selectedYear}`;
        } else if (selectedMonth.length > 0 && selectedMonth !== 'EMPTY') {
            path += `&month=${selectedMonth}`;
        }

        const response = await fetch(path, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        if (response.status === 401 || response.status === 403) {
            return navigate('/');
        }

        const data = await response.json();

        if (!response.ok) {
            const message = data && data.message ? data.message : genericErrorMessage;

            toast.error(message, {position: "top-right", autoClose: timeRemoveNotification});
        } else {
            const pagination = data.cashFlow.pagination;

            setFlows(data.cashFlow.data);
            setCurrentPage(pagination.page);
            setTotalPage(pagination.totalPages);

            const balanceGeneral = data.cashFlowWithGeneral;
            setBalance({
                in: balanceGeneral.cashInflow,
                out: balanceGeneral.cashOutflow,
                total: balanceGeneral.balanceGeneral,
            });

            const balanceFilters = data.cashFlowWithFilters;
            setBalanceWithFilter(
                {
                    in: balanceFilters.cashInflow,
                    out: balanceFilters.cashOutflow,
                    total: balanceFilters.balanceGeneral,
                }
            );
        }
    }

    useEffect(() => {
        if (isNaN(id) || Number(id) <= 0) {
            navigate("/caixa");
        } else {
            const delay = setTimeout(() => {
                getCashFlow();
            }, 500);

            return () => clearTimeout(delay);
        }
    }, [id, navigate, selectedMonth, selectedYear, currentPage]);

    function backPage() {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage + 1 < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const insertFlow = async (event) => {
        event.preventDefault();
        console.log({
            description: description,
            value: value,
            type: type,
            cashierId: id
        });


        const response = await fetch('/api/cashflow', {
            method: 'POST',
            body: JSON.stringify({
                description: description,
                value: value,
                type: type,
                cashierId: id
            }),
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401 || response.status === 403) {
            return navigate('/');
        }

        if (!response.ok) {
            const data = await response.json();

            const message = data && data.message ? data.message : genericErrorMessage;

            toast.error(message, {position: "top-right", autoClose: timeRemoveNotification});
        } else {
            toast.success('Movimento cadastrado com sucesso!', {
                position: "top-right",
                autoClose: timeRemoveNotification
            });
            setShowModalCreateFlow(false);
            setDescription('');
            setValue(0);
            setType('E');
            getCashFlow();
        }
    }

    const createFlow = () => (
        <div className="Modal">
            <form className="Form">
                <div className="FormItem">
                    <div>
                        <p>Descrição</p>
                    </div>
                    <div>
                        <input required value={description} type={"text"} name="descrição"
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="FormItem">
                    <div>
                        <p>Saldo inicial</p>
                    </div>
                    <div>
                        <input required value={value} onChange={(e) => setValue(e.target.value)} name="valor"
                               type="number"
                               step="0.01"
                               min="0.01"/>
                    </div>
                </div>
                <div className="FormItem">
                    <div>
                        <p>Tipo</p>
                    </div>
                    <div>
                        <select id={type} onChange={(e) => setType(e.target.value)}
                                value={type}>
                            {Object.keys(types).map((key) => (
                                <option key={key} value={key}>
                                    {types[key]}
                                </option>
                            ))}

                        </select>
                    </div>
                </div>
                <div className="FormButtons">
                    <div>
                        <button onClick={() => setShowModalCreateFlow(false)}>Cancelar</button>
                    </div>
                    <div>
                        <button onClick={insertFlow} className="Green">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    );

    const createBodyTable = flows.map(item => {
        return (
            <tr key={item.id}>
                <td> {item.id}</td>
                <td> {item.description}</td>
                <td> {item.type === 'E' ? 'Entrada' : 'Saída'}</td>
                <td> R$ {item.value.toFixed(2)}</td>
            </tr>
        );
    });

    return (
        <div className="FlowCash">
            <div className="FlowCashHeader">
                <Header/>
            </div>
            <CashierGeneralReport
                cashierId={id}
                balance={{
                    in: balance.in,
                    out: balance.out,
                    total: balance.total
                }}
                balanceWithFilter={{
                    in: balanceWithFilter.in,
                    out: balanceWithFilter.out,
                    total: balanceWithFilter.total
                }}
            />
            <div className="CashFlowBody">
                <div><h3>Fluxo de Caixa</h3></div>
                <div className="CashFlowTableHeader">
                    <div className="CashFlowFilters">
                        <div className="CashFilterItem">
                            <div>
                                Mês
                            </div>
                            <div>
                                <select id={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
                                        value={selectedMonth}>
                                    {Object.keys(months).map((key) => (
                                        <option key={key} value={key}>
                                            {months[key]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="CashFilterItem">
                            <div>Ano</div>
                            <div>
                                <input type="number" onChange={(e) => setSelectedYear(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={(event) => setShowModalCreateFlow(true)}>Inserir Movimento</button>
                    </div>
                </div>
                <div className="CashFlowTable">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DESCRIÇÃO</th>
                            <th>TIPO</th>
                            <th>VALOR</th>
                        </tr>
                        </thead>
                        <tbody>{createBodyTable}</tbody>
                    </table>
                </div>
                <div className="CashierGridPagination">
                    <div className="buttonPage" onClick={backPage}><MdFirstPage size={30}/></div>
                    <div className="buttonPage" onClick={nextPage}><MdLastPage size={30}/></div>
                </div>
            </div>
            {showModalCreateFlow && createFlow()}
        </div>
    );
}

export default FlowCash;