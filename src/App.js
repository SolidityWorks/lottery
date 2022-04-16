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
    const [isExited, setIsExited] = React.useState(localStorage.getItem('exited'));

    const imitateLogIn = () => {
        localStorage.removeItem('exited');
        setIsExited(null);
    }

    const imitateLogOut = () => {
        setActiveAccount(false);
        localStorage.setItem('exited', true);
    }

    ethereum?.on("accountsChanged", (accounts) => setActiveAccount(accounts[0]));
    
    const walletConnectHandler = async (force = true) => {
        if (ethereum) {
            /** get acc from metamask */
            if (isExited === true) {
                setActiveAccount(null);
                return false;
            }
            const method = force ? 'eth_requestAccounts' : 'eth_accounts'
            try {
                const accounts = await ethereum.request({ 'method': method, params: [{ eth_accounts: {} }] });
                if (!chainCheck() && force) {
                    await chainSet()
                }
                setActiveAccount(accounts[0]);
                    // const contract = await getContract();
                    // console.log('contract if ', await contract.allGames());
                    return Boolean(accounts);

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
            <Route path='/' element={<Layout imitateLogIn={imitateLogIn} isExited={isExited} account={activeAccount} handleLogOut={imitateLogOut} walletConnectHandler={walletConnectHandler} />}>
                <Route index element={<Lotto account={activeAccount} walletConnectHandler={walletConnectHandler} />} />
                <Route path='flipper' element={<Flipper />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Route>
        </Routes>
    )
}

export default App;