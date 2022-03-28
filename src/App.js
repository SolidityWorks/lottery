import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import './App.css';

import Layout from './Components/Layout/Layout.jsx';

import Flipper from './pages/flipper/Flipper.jsx';
import Lotto from './pages/lotto/Lotto.jsx';

const App = () => {
    return(
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Lotto />} />
                <Route path='flipper' element={<Flipper />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Route>
        </Routes>
    )
}

export default App;