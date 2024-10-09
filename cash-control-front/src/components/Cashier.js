import React from 'react';
import CashierGrid from "./CashierGrid";
import Header from "./Header";
import "../styles/PageWithTable.css";

function Cashier() {
    return (
        <div className="PageWithTable">
            <div className="PageTableHeader">
                <Header/>
            </div>
            <div className="Table">
                <CashierGrid/>
            </div>
        </div>
    );
}

export default Cashier;