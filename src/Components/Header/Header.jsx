import React from 'react';
import {Link, useLocation} from 'react-router-dom';

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

const Header = () => {
	const [headerActive, setHeaderActive] = React.useState(false);
	const [walletActive, setWalletActive] = React.useState(false);
	const [activeGame, setActiveGame] = React.useState(1);
	const location = useLocation();

	React.useEffect(() => {
		gamesArr.map((d) => {
			location.pathname === d.path && setActiveGame(d.id);
		})
	}, [location]);

	const setHeader = () => {
		setHeaderActive(!headerActive);
	}

	const setWallet = () => {
		setWalletActive(!walletActive);
	}

	return(
		<header className="header">
			<div className={`menu__shadow${headerActive || walletActive ? ' active' : ''}`}></div>
		    <div className="container">
		        <div className="header__inner">
		        	{!headerActive
		        	? <div className="header__logo" onClick={setHeader}>
		            	<img className="logo__img" src="/assets/img/logo-figure.svg" alt="picture" />
		                <span className="yellow">SMART</span>{gamesArr.map((d, id) => <p key={id}>{activeGame === d.id && d.name}</p>)}
		            </div>
		        	: <div className="header__logo" onClick={setHeader}>
		            	<img className="logo__img flip" src="/assets/img/logo-figure.svg" alt="picture" />

		            	{gamesArr.map((d, id) => activeGame === d.id && <Link key={id} className="header__logo" to={d.path}>
		                	<span className="yellow">SMART</span>{d.name}
		                </Link>)}

		                <div className="header__logo--inner active">
		                	{gamesArr.map((d, id) => activeGame !== d.id && <Link key={id} className="header__logo" to={d.path}>
		                		<span className="yellow">SMART</span>{d.name}
		                	</Link>)}
		                </div>
		            </div>}

		            {/*<button className="button default__button">
		                <span className="default__button--wrapper">
		                    Connect wallet
		                </span>
		            </button>*/}

		            <div className="wallet__wrapper">
		            	<button className="button default__button yellow" onClick={setWallet}>
		            		<span className="default__button--wrapper active">
		            			0x531D...0223234

		            			<img className="default__button--img" src="assets/img/logo-figure.svg" alt="Картинка" />
		            		</span>
		            	</button>

		            	<div className={`wallet__drop${walletActive ? ' active' : ''}`}>
		            		<div className="wallet__value">
		            			0xFDbBeB3A646264eBfcFB5F65647147F0aDce0223
		            		</div>

		            		<div className="wallet__link">
		            			Recent Transaction
		            		</div>

		            		<div className="wallet__link">
		            			Disconnect

		            			<img src="assets/img/logout.svg" alt="Выйти" />
		            		</div>
		            	</div>
		            </div>
		        </div>
		    </div>
		</header>
	)
}

export default Header;