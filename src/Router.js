import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import './index.css';
import Main from './Pages/Main';
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Screener from "./Pages/Screener"
import Crypto from "./Pages/Crypto";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="stockscreener" element={<Screener/>}/>
                <Route path="crypto" element={<Crypto/>}/>
            </Routes>
        </BrowserRouter>
    )

}
