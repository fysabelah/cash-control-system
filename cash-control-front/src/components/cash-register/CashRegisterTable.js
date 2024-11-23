import React from "react";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export default function CashRegisterTable({cashierData, onClickDelete}) {

    const navigate = useNavigate();

    const mapTableItems = cashierData.map(item => {
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
                            <button onClick={() => onClickDelete(item.id)} name="Excluir"><FaTrashAlt size={15}/>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>DESCRIÇÃO</th>
                <th>SALDO INICIAL</th>
                <th>AÇÕES</th>
            </tr>
            </thead>
            <tbody>{mapTableItems}</tbody>
        </table>
    );
}