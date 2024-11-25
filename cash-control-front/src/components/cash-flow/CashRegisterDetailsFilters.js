import React from "react";
import {toast} from "react-toastify";

export default function CashRegisterDetailsFilters({updateFilters, months, filters}) {

    const handleChangeFilters = (name, value) => {
        updateFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMonthChange = (e) => {
        let value = e.target.value;

        handleChangeFilters('month', value === "EMPTY" ? '' : value);
    }

    const handleYearChange = (e) => {
        const value = e.target.value;

        if (value < 1000 || value > 9999) {
            toast.error('Ano deve possuir 4 dígitos!',
                {position: "top-right", autoClose: 5500});
        } else {
            handleChangeFilters('year', value);
        }
    }

    return (
        <div className="CashFlowFilters">
            <div className="CashFilterItem">
                <div>
                    Mês
                </div>
                <div>
                    <select id={filters.month}
                            onChange={handleMonthChange}
                            value={filters.month}
                            name="month"
                    >
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
                    <input type="number"
                           name="year"
                           value={filters.year}
                           onChange={handleYearChange}/>
                </div>
            </div>
        </div>
    );
}