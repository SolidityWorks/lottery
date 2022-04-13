import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ethereum} from "../../contracts/getContract";
import {bsc, chainAdd, chainCheck, chainSet, getContract} from "../../contracts/funcs";

const gamesArr = [
	{
		id: 1,
		name: 'flipper',
		path: '/'
	},
	{
		id: 2,
		name: 'lotto',
		path: '/lotto'
	}
]

const Header = ({walletConnectHandler}) => {
	const [headerActive, setHeaderActive] = React.useState(false);
	const [activeGame, setActiveGame] = React.useState(1);
	const location = useLocation();

	const [accAddress, setAccAddress] = React.useState(ethereum?.selectedAddress/*deprecated*/);
	const [chainId, setChainId] = React.useState(ethereum?.chainId);
	const [buttonTxt, setButtonTxt] = React.useState();
	const [contract, setContract] = React.useState();

    ethereum?.on('chainChanged', (_chainId) => setChainId(_chainId));
	ethereum?.on('accountsChanged', (accounts) => setAccAddress(accounts));

	React.useEffect(() => {
		gamesArr.map((d) => {
			location.pathname === d.path && setActiveGame(d.id);
		})
	}, [location]);


	React.useEffect(() => {
		(async () => {
			const [account, contract] = await walletConnectHandler();
			console.log('info', account, contract);
			setAccAddress(account[0]);
			setContract(contract);
		})()

	}
	,[walletConnectHandler])
	
	React.useEffect(() => {
		async function fresh() {
			if(await walletConnectHandler(false)) {
				setChainId(ethereum.chainId)
			}
		}
		fresh()
	}, [accAddress, walletConnectHandler])

	const setHeader = () => {
		setHeaderActive(!headerActive);
	}

	return(
		<header className="header">
			<div className={`menu__shadow${headerActive ? ' active' : ''}`}></div>
		    <div className="container">
		        <div className="header__inner">
		        	{!headerActive
		        	? <div className="header__logo" onClick={setHeader}>
		            	<img className="logo__img" src="/assets/img/logo-figure.svg" alt="logo" />
		                <span className="yellow">SMART</span>{gamesArr.map((d, id) => <p key={id}>{activeGame === d.id && d.name}</p>)}
		            </div>
		        	: <div className="header__logo" onClick={setHeader}>
		            	<img className="logo__img flip" src="/assets/img/logo-figure.svg" alt="logo" />

		            	{gamesArr.map((d, id) => activeGame === d.id && <Link key={id} className="header__logo" to={d.path}>
		                	<span className="yellow">SMART</span>{d.name}
		                </Link>)}

		                <div className="header__logo--inner active">
		                	{gamesArr.map((d, id) => activeGame !== d.id && <Link key={id} className="header__logo" to={d.path}>
		                		<span className="yellow">SMART</span>{d.name}
		                	</Link>)}
		                </div>
		            </div>}

		            <button onClick={accAddress ? null : walletConnectHandler} className="button default__button">
		                <span className="default__button--wrapper">
		                    {accAddress || 'Connect Wallet'}
		                </span>
		            </button>
		        </div>
		    </div>
		</header>
	)
}

export default Header;