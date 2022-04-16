import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header.jsx";

const Layout = ({ isExited, imitateLogIn, account, handleLogOut, walletConnectHandler }) => {
  return (
    <>
      <Header
        account={account}
        handleLogIn={imitateLogIn}
        isExited={isExited}
        handleLogOut={handleLogOut}
        walletConnectHandler={walletConnectHandler}
      />

      <Outlet />
    </>
  );
};

export default Layout;
