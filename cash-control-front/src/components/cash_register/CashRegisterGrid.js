import React, {useEffect, useState} from 'react';
import "../../styles/CashierGrid.css";
import {MdFirstPage, MdLastPage} from "react-icons/md";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/ModalConfirmation.css";
import ModalDelete from "../generic_components/ModalDelete";
import CashRegisterModalCreate from "./CashRegisterModalCreate";
import CashRegisterTable from "./CashRegisterTable";
import useApiRequests from "../ApiRequests";

function CashRegisterGrid() {
    const [cashier, setCashier] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [cashierIdToDelete, setCashierIdToDelete] = useState(null);
    const timeRemoveNotification = 10000;
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [dataQuery, setDataQuery] = useState({
        id: "",
        description: ""
    });
    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPage: 0
    })
    const {requestWithAuthentication} = useApiRequests();

    const handleChangeQueryParams = (event) => {
        const {name, value} = event.target;

        setDataQuery((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    };

    const getCashiers = async () => {
        let url = `/cashier?initialPage=${pagination.currentPage}`;

        if (dataQuery.id.length > 0 && dataQuery.description.length > 0) {
            url += `&cashierId=${dataQuery.id}&description=${dataQuery.description}`;
        } else if (dataQuery.id.length > 0) {
            url += `&cashierId=${dataQuery.id}`;
        } else if (dataQuery.description.length > 0) {
            url += `&description=${dataQuery.description}`;
        }

        const response = await requestWithAuthentication(url);
        const data = await response.json();

        if (response.ok) {
            setCashier(data.data);
            setPagination({
                currentPage: data.pagination.page,
                totalPage: data.pagination.totalPages
            });
        }
    }

    const debouncedDataQuery = useDebounce(dataQuery, 500);
    const debouncedCurrentPage = useDebounce(pagination.currentPage, 500);

    useEffect(() => {
        getCashiers();
    }, [debouncedDataQuery, debouncedCurrentPage]);

    function openModalDelete(cashierId) {
        setShowModalDelete(true);
        setCashierIdToDelete(cashierId);
    }

    const insertCashier = async (formData) => {
        requestWithAuthentication('/cashier', 'POST', {
            description: formData.description,
            balance: formData.balance,
        }).then(response => {
            if (response.ok) {
                toast.success('Caixa cadastrado com sucesso!', {
                    position: "top-right",
                    autoClose: timeRemoveNotification
                });

                setShowModalCreate(false);

                getCashiers();
            }
        });
    };

    function backPage() {
        if (pagination.currentPage > 0) {
            setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
            }));
        }
    }

    function nextPage() {
        if (pagination.currentPage + 1 < pagination.totalPage) {
            setPagination(prev => ({
                ...prev,
                currentPage: prev.currentPage + 1
            }));
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

        requestWithAuthentication(`/cashier/${cashierIdToDelete}`, 'DELETE')
            .then(response => {
                if (response.ok) {
                    setShowModalDelete(false);

                    toast.success('Caixa deletado com sucesso!', {
                        position: "top-right",
                        autoClose: timeRemoveNotification
                    });

                    getCashiers();
                }
            });
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
                <CashRegisterTable
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
                <CashRegisterModalCreate
                    onCancel={handleModalCreateState}
                    onConfirm={insertCashier}
                />}
        </div>
    );
}

export default CashRegisterGrid;