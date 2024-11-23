import React from 'react';
import CashRegisterGrid from "./CashRegisterGrid";
import Header from "../Header";
import "../../styles/PageWithTable.css";

function CashRegister() {
    return (
        <div className="PageWithTable">
            <div className="PageTableHeader">
                <Header/>
            </div>
            <div className="Table">
                <CashRegisterGrid/>
            </div>
        </div>
    );
}

export default CashRegister;