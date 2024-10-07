import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./Home";
import Cashier from "./Cashier";

function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" exact/>
                <Route element={<Cashier/>} path="*"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;