import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ethereum } from "../../contracts/getContract";
import {
  bsc,
  chainAdd,
  chainCheck,
  chainSet,
  getContract,
} from "../../contracts/funcs";

const gamesArr = [
  {
    id: 1,
    name: "flipper",
    path: "/",
  },
  {
    id: 2,
    name: "lotto",
    path: "/lotto",
  },
];

const Header = ({ account, handleLogOut, walletConnectHandler }) => {
  const [walletActive, setWalletActive] = React.useState(false);
  const [headerActive, setHeaderActive] = React.useState(false);
  const [activeGame, setActiveGame] = React.useState(1);
  const location = useLocation();

  const [chainId, setChainId] = React.useState(ethereum?.chainId);
  const [buttonTxt, setButtonTxt] = React.useState();

  ethereum?.on("chainChanged", (_chainId) => setChainId(_chainId));

  const setWallet = () => {
    setWalletActive(!walletActive);
  };

  React.useEffect(() => {
    gamesArr.map((d) => {
      location.pathname === d.path && setActiveGame(d.id);
    });
  }, [location]);

  React.useEffect(() => {
    async function fresh() {
      if (await walletConnectHandler(false)) {
        setChainId(ethereum.chainId);
      }
    }
    fresh();
  }, []);

  const setHeader = () => {
    setHeaderActive(!headerActive);
  };

  return (
    <header className="header">
      <div
        className={`menu__shadow${
          headerActive || walletActive ? " active" : ""
        }`}
      ></div>
      <div className="container">
        <div className="header__inner">
          {!headerActive ? (
            <div className="header__logo" onClick={setHeader}>
              <img
                className="logo__img"
                src="/assets/img/logo-figure.svg"
                alt="logo"
              />
              <span className="yellow">SMART</span>
              {gamesArr.map((d, id) => (
                <p key={id}>{activeGame === d.id && d.name}</p>
              ))}
            </div>
          ) : (
            <div className="header__logo" onClick={setHeader}>
              <img
                className="logo__img flip"
                src="/assets/img/logo-figure.svg"
                alt="logo"
              />

              {gamesArr.map(
                (d, id) =>
                  activeGame === d.id && (
                    <Link key={id} className="header__logo" to={d.path}>
                      <span className="yellow">SMART</span>
                      {d.name}
                    </Link>
                  )
              )}

              <div className="header__logo--inner active">
                {gamesArr.map(
                  (d, id) =>
                    activeGame !== d.id && (
                      <Link key={id} className="header__logo" to={d.path}>
                        <span className="yellow">SMART</span>
                        {d.name}
                      </Link>
                    )
                )}
              </div>
            </div>
          )}

          <div className="wallet__wrapper">
            <button
              className="button default__button yellow"
              onClick={() => {
                if (account) {
                  console.log('work');
                  setWallet();
                } else {
                  walletConnectHandler();
                }
              }}
            >
              <span className="default__button--wrapper active">
                {account && walletActive
                  ? account?.slice(0, 5) + "..." + account?.slice(-5)
                  : "Connect Wallet"}
                <img
                  className="default__button--img"
                  src="assets/img/logo-figure.svg"
                  alt="Картинка"
                />
              </span>
            </button>

            <div className={`wallet__drop${walletActive ? " active" : ""}`}>
              <div className="wallet__value">{account}</div>

              <div className="wallet__button">Recent Transaction</div>

              <button onClick={() => {
                handleLogOut();
                setActiveGame(false);
                setHeaderActive(false);
              }} className="wallet__button">
                Disconnect
                <img src="assets/img/logout.svg" alt="Выйти" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
