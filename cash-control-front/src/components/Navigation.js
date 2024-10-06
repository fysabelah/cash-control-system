import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./Home";

function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" exact/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;