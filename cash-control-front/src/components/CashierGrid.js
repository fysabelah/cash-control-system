import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import "../styles/CashierGrid.css";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";

function CashierGrid() {
    const [cashier, setCashier] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const navigate = useNavigate();
    const [idQuery, setIdQuery] = React.useState('');
    const [descriptionQuery, setDescriptionQuery] = React.useState('');

    const getCashiers = () => {
        fetch('/api/cashier', {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(response => {
            if (response.status === 401 || response.status === 403) {
                navigate('/');
            } else if (response.ok) {
                return response.json()
            } else {
                alert(response.json().message);
            }
        }).then(data => {
            setCashier(data ? data.data : []);
            setPage(data ? data.pagination : {});
        });
    }

    useEffect(() => {
        getCashiers();
    }, []);

    const createBodyTable = cashier.map(item => {
        return (
            <tr key={item.id}>
                <td> {item.id}</td>
                <td> {item.description}</td>
                <td> R$ {item.balance.toFixed(2)}</td>
                <td>
                    <div className="buttonTable">
                        <div>
                            <button><FaEdit size={15}/></button>
                        </div>
                        <div>
                            <button name="Excluir"><FaTrashAlt size={15}/></button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    });

    function updateIdQuery(event) {
        setIdQuery(event.target.value);
    }

    function updateDescriptionQuery(event) {
        setDescriptionQuery(event.target.value);
    }

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
                    <button>Cadastrar</button>
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
                <div className="buttonPage"><MdFirstPage size={30} /></div>
                <div className="buttonPage"><MdLastPage size={30} /></div>
            </div>
        </div>
    );
}

export default CashierGrid;