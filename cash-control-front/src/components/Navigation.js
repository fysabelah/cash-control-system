import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./Home";
import Cashier from "./Cashier";
import FlowCash from "./FlowCash";

function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" exact/>
                <Route element={<Cashier/>} path="*"/>
                <Route element={<Cashier/>} path="/caixa"/>
                <Route element={<FlowCash/>} path="/caixa/:id" exact/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;