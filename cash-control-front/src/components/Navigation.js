import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CashRegister from "./cash_register/CashRegister";
import FlowCash from "./FlowCash";
import Login from "./Login";

function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<CashRegister/>} path="/" exact/>
                <Route element={<CashRegister/>} path="*"/>
                <Route element={<CashRegister/>} path="/caixa"/>
                <Route element={<FlowCash/>} path="/caixa/:id" exact/>
                <Route element={<Login/>} path="/login"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;