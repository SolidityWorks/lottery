import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header.jsx";

const Layout = ({ account,handleLogOut, walletConnectHandler }) => {
  return (
    <>
      <Header account={account} handleLogOut={handleLogOut} walletConnectHandler={walletConnectHandler} />

      <Outlet />
    </>
  );
};

export default Layout;
