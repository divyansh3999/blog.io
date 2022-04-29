import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./containers/Login";
import { store } from "./redux/store";


function PrivateRoutes() {
  const user = store.getState();
  const token = user.login.loginInfo;
  const isLoggedin = user.isLoggedin.loginInfo;
  if (token && isLoggedin == true) {
    return <Outlet />;
  } else {
    return <Login />;
  }
}

export default PrivateRoutes;
