import { useState } from "react";
import reactLogo from "./assets/react.svg";
import {Routes, Route} from 'react-router-dom'
import DefaultLayout from "./layout/Default";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import {api} from './util/api'
import Home from "./pages/user/Home";
import Balance from "./pages/user/Balance";
import Deposit from "./pages/user/Deposit";
import Send from "./pages/user/Send";
import Transfer from "./pages/user/Transfer";

import User from './util/User'


// initialze store
export const store = new User()

function App() {


	return <div className="App">
        <Routes >
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="/account" element={<AppLayout  />} >
                <Route  path="/account" element={<Home />} />
                <Route  path="/account/balance" element={<Balance  />} />
                <Route  path="/account/deposit" element={<Deposit />} />
                <Route  path="/account/send" element={<Send />} />
                <Route  path="/account/transfer" element={<Transfer />} />
            </Route>

        </Routes>

    </div>;
}

export default App;
