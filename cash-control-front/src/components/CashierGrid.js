import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../styles/CashierGrid.css";
import {MdFirstPage, MdLastPage} from "react-icons/md";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/ModalConfirmation.css";
import ModalDelete from "./generic_components/ModalDelete";
import ModalCreateCashier from "./cashier_items/ModalCreateCashier";
import TableCashier from "./cashier_items/TableCashier";

function CashierGrid() {
    const [cashier, setCashier] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [cashierIdToDelete, setCashierIdToDelete] = React.useState(null);
    const genericErrorMessage = 'Ocorreu um erro!';
    const timeRemoveNotification = 10000;
    const [showModalCreate, setShowModalCreate] = React.useState(false);
    const [dataQuery, setDataQuery] = React.useState({
        id: "",
        description: ""
    });

    const handleChangeQueryParams = (event) => {
        const {name, value} = event.target;

        setDataQuery((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const getCashiers = async () => {
        let path = `/api/cashier?initialPage=${currentPage ? currentPage : 0}`;

        if (dataQuery.id.length > 0 && dataQuery.description.length > 0) {
            path += `&cashierId=${dataQuery.id}&description=${dataQuery.description}`;
        } else if (dataQuery.id.length > 0) {
            path += `&cashierId=${dataQuery.id}`;
        } else if (dataQuery.description.length > 0) {
            path += `&description=${dataQuery.description}`;
        }

        const response = await fetch(path, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        if (response.status === 401 || response.status === 403) {
            return navigate('/login');
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
        const delay = setTimeout(() => {
            getCashiers();
        }, 500);

        return () => clearTimeout(delay);

    }, [dataQuery, currentPage]);

    function openModalDelete(cashierId) {
        setShowModalDelete(true);
        setCashierIdToDelete(cashierId);
    }

    const insertCashier = async (formData) => {
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
                    description: formData.description,
                    balance: formData.balance,
                })
            });

            if (response.status === 401 || response.status === 403) {
                return navigate("/login");
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

                await getCashiers();
            }
        } catch (error) {
            toast.error(genericErrorMessage, {position: "top-right", autoClose: timeRemoveNotification});
        }
    };

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

    const handleModalDeleteState = () => {
        setShowModalDelete(false);
    }

    const handleModalCreateState = () => {
        setShowModalCreate(false);
    }

    const executeDeleteCashier = async () => {
        if (cashierIdToDelete == null) return;

        setShowModalDelete(false);

        try {
            const response = await fetch(`/api/cashier/${cashierIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (response.status === 401 || response.status === 403) {
                return navigate("/login");
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

                await getCashiers();
            }
        } catch (error) {
            toast.error(genericErrorMessage, {position: "top-right", autoClose: timeRemoveNotification});
        }
    };

    return (
        <div className="CashierGrid">
            <div className="CashierGridTitle">
                <h4>Caixas</h4>
            </div>
            <div className="CashierFilters">
                <div>
                    <input type="number"
                           placeholder="Identificador"
                           name="id"
                           value={dataQuery.id}
                           onChange={handleChangeQueryParams}/>
                </div>
                <div>
                    <input type="text"
                           placeholder="Descrição"
                           name="description"
                           value={dataQuery.description}
                           onChange={handleChangeQueryParams}/>
                </div>
                <div>
                    <button onClick={() => setShowModalCreate(true)}>Cadastrar</button>
                </div>
            </div>
            <div className="CashierTable">
                <TableCashier
                    cashierData={cashier}
                    onClickDelete={openModalDelete}
                />
            </div>
            <div className="CashierGridPagination">
                <div className="buttonPage" onClick={backPage}><MdFirstPage size={30}/></div>
                <div className="buttonPage" onClick={nextPage}><MdLastPage size={30}/></div>
            </div>
            <ToastContainer/>
            {showModalDelete &&
                <ModalDelete description={`o caixa ${cashierIdToDelete}`}
                             onConfirm={executeDeleteCashier}
                             onCancel={handleModalDeleteState}
                />}
            {showModalCreate &&
                <ModalCreateCashier
                    onCancel={handleModalCreateState}
                    onConfirm={insertCashier}
                />}
        </div>
    );
}

export default CashierGrid;