import React, {useEffect, useState} from "react";
import Header from "../Header";
import "../../styles/FlowCash.css"
import useApiRequests from "../ApiRequests";
import {useNavigate, useParams} from "react-router-dom";
import CashFlowReport from "./CashFlowReport";
import CashRegisterDetailsFilters from "./CashRegisterDetailsFilters";

export default function CashRegisterDetails() {
    const {requestWithAuthentication} = useApiRequests();
    const {id} = useParams();
    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        cashRegisterId: '',
        month: '',
        year: ''
    });

    const types = {
        E: 'Entrada',
        S: 'Saída'
    };

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
    };

    const getCashFlow = () => {

    };

    useEffect(() => {
        if (Number.isNaN(id) || Number(id) < 0) {
            navigate("/caixa");
        } else {
            setFilter(prev => ({
                ...prev,
                cashRegisterId: id
            }));
        }
    }, [id, navigate]);

    useEffect(() => {
        console.log(filter);
    }, [filter, filter.cashRegisterId]);

    return (
        <div className="FlowCash">
            <div className="FlowCashHeader">
                <Header/>
            </div>
            <CashFlowReport
                cashRegisterId={id}
                filters={{
                    month: filter.month === 'EMPTY' ? '' : filter.month,
                    year: filter.year,
                }}
            />
            <div className="CashFlowBody">
                <div><h3>Fluxo de Caixa</h3></div>
                <CashRegisterDetailsFilters
                    updateFilters={setFilter}
                    filters={{filter}}
                    months={months}
                />
            </div>
        </div>
    );
}