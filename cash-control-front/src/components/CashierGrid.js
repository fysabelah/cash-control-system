import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import "../styles/CashierGrid.css";
import {MdFirstPage, MdLastPage} from "react-icons/md";

function CashierGrid() {
    const [cashier, setCashier] = React.useState([]);
    const [page, setPage] = React.useState({
        'page': 0,
        'pageSize': 10,
        'totalPages': 0
    });
    const navigate = useNavigate();
    const [idQuery, setIdQuery] = React.useState('');
    const [descriptionQuery, setDescriptionQuery] = React.useState('');

    const getCashiers = () => {
        let path = `/api/cashier?initialPage=${page.page ? page.page : 0}&pageSize=2`;

        if (idQuery.length > 0 && descriptionQuery.length > 0) {
            path += `&cashierId=${idQuery}&description=${descriptionQuery}`;
        } else if (idQuery.length > 0) {
            path += `&cashierId=${idQuery}`;
        } else if (descriptionQuery.length > 0) {
            path += `&description=${descriptionQuery}`;
        }

        console.log(path);

        fetch(path, {
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

    useEffect(() => {
        const delay = setTimeout(() => {
            getCashiers();
        }, 500);

        return () => clearTimeout(delay);

    }, [idQuery, descriptionQuery, page]);


    const createBodyTable = cashier.map(item => {
        return (
            <tr key={item.id}>
                <td> {item.id}</td>
                <td> {item.description}</td>
                <td> R$ {item.balance.toFixed(2)}</td>
                <td width={10}>
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

    function backPage() {
        /*if (page.page > 0 && page.page <= page.totalPages) {
            setPage({
                'page': page.page - 1,
                'pageSize': 10,
                'totalPages': page.totalPages
            });
        }*/
    }

    function nextPage() {
        /*if (page.page <= page.totalPages) {
            setPage({
                'page': page.page + 1,
                'pageSize': 10,
                'totalPages': page.totalPages
            });
        }*/
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
            {page.page + 1 !== page.totalPages &&
                <div className="CashierGridPagination">
                    <div className="buttonPage" onClick={backPage}><MdFirstPage size={30}/></div>
                    <div className="buttonPage" onClick={nextPage}><MdLastPage size={30}/></div>
                </div>
            }
        </div>
    );
}

export default CashierGrid;