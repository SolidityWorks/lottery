import React from 'react';
import { ethereum } from './contracts/getContract';
import { Routes, Route, Navigate } from 'react-router-dom';
import { chainCheck, chainSet, getContract } from "./contracts/funcs";

import './App.css';

import Layout from './Components/Layout/Layout.jsx';

import Flipper from './pages/flipper/Flipper.jsx';
import Lotto from './pages/lotto/Lotto.jsx';

const App = () => {
    const [activeAccount, setActiveAccount] = React.useState(null);
    const imitateLogOut = () => {
        setActiveAccount(false);
    }
    const walletConnectHandler = async (force = true) => {
        if (ethereum) {
            /** get acc from metamask */
            const method = force ? 'eth_requestAccounts' : 'eth_accounts'
            try {
                const accounts = await ethereum.request({ 'method': method, params: [{eth_accounts: {}}]});
                if (!chainCheck() && force) {
                    console.log('INSIDE WALLET CONNECT HANDLER');
                    await chainSet()
                }
                setActiveAccount(accounts[0]);
                const contract = await getContract();
                return Boolean(accounts);
                // setAccAddress(accounts[0]);
                // setContract(await getContract())
                // return Boolean(accounts)
            } catch (e) {
                console.log(e)
            }
        }
        else {
            alert('You need install MetaMask')
        }
    }
    return (
        <Routes>
            <Route path='/' element={<Layout account={activeAccount} handleLogOut={imitateLogOut} walletConnectHandler={walletConnectHandler} />}>
                <Route index element={<Lotto account={activeAccount} walletConnectHandler={walletConnectHandler} />} />
                <Route path='flipper' element={<Flipper />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Route>
        </Routes>
    )
}

export default App;