import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import "../styles/CashierGrid.css";
import {MdFirstPage, MdLastPage} from "react-icons/md";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/ModalConfirmation.css";

function CashierGrid() {
    const [cashier, setCashier] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();
    const [idQuery, setIdQuery] = useState('');
    const [descriptionQuery, setDescriptionQuery] = useState('');
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [cashierIdToDelete, setCashierIdToDelete] = React.useState('');
    const genericErrorMessage = 'Ocorreu um erro!';
    const timeRemoveNotification = 10000;
    const [showModalCreate, setShowModalCreate] = React.useState(false);
    const [cashierCreateDescription, setCashierCreateDescription] = React.useState('');
    const [cashierCreateValue, setCashierCreateValue] = React.useState(0);

    const getCashiers = async () => {
        let path = `/api/cashier?initialPage=${currentPage ? currentPage : 0}`;

        if (idQuery.length > 0 && descriptionQuery.length > 0) {
            path += `&cashierId=${idQuery}&description=${descriptionQuery}`;
        } else if (idQuery.length > 0) {
            path += `&cashierId=${idQuery}`;
        } else if (descriptionQuery.length > 0) {
            path += `&description=${descriptionQuery}`;
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
            setCashier(data ? data.data : []);
            const page = data ? data.pagination : {'page': 0, 'totalPages': 0};
            setCurrentPage(page.page);
            setTotalPage(page.totalPages);
        }
    }

    useEffect(() => {
        getCashiers();
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            getCashiers();
        }, 500);

        return () => clearTimeout(delay);

    }, [idQuery, descriptionQuery, currentPage]);

    function deleteCashier(cashierId) {
        setShowModalDelete(true);
        setCashierIdToDelete(cashierId);
    }

    const createBodyTable = cashier.map(item => {
        return (
            <tr key={item.id} style={{padding: "5px"}}>
                <td> {item.id}</td>
                <td> {item.description}</td>
                <td> R$ {item.balance.toFixed(2)}</td>
                <td width={10}>
                    <div className="buttonTable">
                        <div>
                            <button onClick={() => {
                                navigate(`/caixa/${item.id}`)
                            }}><FaEdit size={15}/></button>
                        </div>
                        <div>
                            <button onClick={() => deleteCashier(item.id)} name="Excluir"><FaTrashAlt size={15}/>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    });

    function updateCashierCreateName(event) {
        setCashierCreateDescription(event.target.value);
    }

    function updateCashierCreateDescription(event) {
        setCashierCreateValue(event.target.value);
    }

    const insertCashier = async () => {
        if (cashierCreateValue < 0 || cashierCreateDescription.length === 0) {
            toast.warn('Todos os campos são obrigatórios!', {position: "top-right", autoClose: timeRemoveNotification});
        } else {
            setShowModalCreate(false);

            try {
                const response = await fetch(`/api/cashier`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        description: cashierCreateDescription,
                        balance: cashierCreateValue,
                    })
                });

                if (response.status === 401 || response.status === 403) {
                    return navigate("/");
                }

                if (!response.ok) {
                    const data = await response.json();

                    const message = data && data.message ? data.message : genericErrorMessage;

                    toast.error(message, {position: "top-right", autoClose: timeRemoveNotification});
                } else {
                    toast.success('Caixa cadastrado com sucesso!', {
                        position: "top-right",
                        autoClose: timeRemoveNotification
                    });
                }

                getCashiers();
            } catch (error) {
                toast.error(genericErrorMessage, {position: "top-right", autoClose: timeRemoveNotification});
            }
        }
    };

    const createCashierModal = () => (
        <div className="Modal">
            <form className="Form">
                <div className="FormItem">
                    <div>
                        <p>Descrição</p>
                    </div>
                    <div>
                        <input required type={"text"} name="descrição" onChange={updateCashierCreateName}/>
                    </div>
                </div>
                <div className="FormItem">
                    <div>
                        <p>Saldo inicial</p>
                    </div>
                    <div>
                        <input required onChange={updateCashierCreateDescription} name="saldo inicial" type="number"
                               step="0.01"
                               min="0.01"/>
                    </div>
                </div>
                <div className="FormButtons">
                    <div>
                        <button onClick={() => setShowModalCreate(false)}>Cancelar</button>
                    </div>
                    <div>
                        <button onClick={() => insertCashier()} className="Green">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    );

    function updateIdQuery(event) {
        setIdQuery(event.target.value);
    }

    function updateDescriptionQuery(event) {
        setDescriptionQuery(event.target.value);
    }

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

    const executeDeleteCashier = async (id) => {
        setShowModalDelete(false);

        try {
            const response = await fetch(`/api/cashier/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (response.status === 401 || response.status === 403) {
                return navigate("/");
            }

            if (!response.ok) {
                const data = await response.json();

                const message = data && data.message ? data.message : genericErrorMessage;

                toast.error(message, {position: "top-right", autoClose: timeRemoveNotification});
            } else {
                toast.success('Caixa deletado com sucesso!', {
                    position: "top-right",
                    autoClose: timeRemoveNotification
                });
            }

            getCashiers();
        } catch (error) {
            toast.error(genericErrorMessage, {position: "top-right", autoClose: timeRemoveNotification});
        }
    };

    const confirmDeleteCashier = () => (
        <div className="Modal">
            <div className="ModalConfirmation__body">
                <div>
                    <h3>Deseja deletar o caixa {cashierIdToDelete}?</h3>
                </div>
                <div className="ModalConfirmation__button">
                    <div>
                        <button onClick={() => setShowModalDelete(false)}>Cancelar</button>
                    </div>
                    <div>
                        <button className="buttonConfirmationGreen"
                                onClick={() => executeDeleteCashier(cashierIdToDelete)}>Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="CashierGrid">
            <div className="CashierGridTitle">
                <h4>Caixas</h4>
            </div>
            <div className="CashierFilters">
                <div>
                    <input type="number" placeholder="Identificador" onChange={updateIdQuery}/>
                </div>
                <div>
                    <input type="text" placeholder="Descrição" onChange={updateDescriptionQuery}/>
                </div>
                <div>
                    <button onClick={() => setShowModalCreate(true)}>Cadastrar</button>
                </div>
            </div>
            <div className="CashierTable">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>DESCRIÇÃO</th>
                        <th>SALDO INICIAL</th>
                        <th>AÇÕES</th>
                    </tr>
                    </thead>
                    <tbody>{createBodyTable}</tbody>
                </table>
            </div>
            <div className="CashierGridPagination">
                <div className="buttonPage" onClick={backPage}><MdFirstPage size={30}/></div>
                <div className="buttonPage" onClick={nextPage}><MdLastPage size={30}/></div>
            </div>
            <ToastContainer/>
            {showModalDelete && confirmDeleteCashier()}
            {showModalCreate && createCashierModal()}
        </div>

    );
}

export default CashierGrid;