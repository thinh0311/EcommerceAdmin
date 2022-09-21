import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Login from "../../views/auth/Login";
import "./layout.css";
import Switch from "../Switch";
import TopNav from "../topnav/TopNav";
const Layout = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    //setToken(localStorage.removeItem("token"));
  }, []);

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    // <div>
    //   {!token ? (
    //     <Login />
    //   ) : (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="layout__content">
          <TopNav />
          <div className="layout__content-main">
            <Switch />
          </div>
        </div>
      </div>
    </BrowserRouter>
    //   )}
    // </div>
  );
};

export default Layout;
