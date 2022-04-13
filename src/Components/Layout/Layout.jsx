import React from 'react';
import {Outlet} from 'react-router-dom';

import Header from '../Header/Header.jsx';

const Layout = ({walletConnectHandler}) => {
	return(
		<>
			<Header walletConnectHandler={walletConnectHandler} />

			<Outlet />
		</>
	)
}

export default Layout;