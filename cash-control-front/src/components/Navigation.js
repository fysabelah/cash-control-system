import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Cashier from "./Cashier";
import FlowCash from "./FlowCash";
import Login from "./Login";

function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Cashier/>} path="/" exact/>
                <Route element={<Cashier/>} path="*"/>
                <Route element={<Cashier/>} path="/caixa"/>
                <Route element={<FlowCash/>} path="/caixa/:id" exact/>
                <Route element={<Login/>} path="/login"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;