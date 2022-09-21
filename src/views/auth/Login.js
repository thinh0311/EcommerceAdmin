import "../../styles/login.css";
import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import accountApi from "../../api/accountApi";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const submit = async () => {
    const result = await accountApi.getAcccount(username, pwd);
    if (result.passWord === pwd) {
      setToken(result.maNV);
      localStorage.setItem("token", result.maNV);
    } else localStorage.removeItem("token");
  };

  return (
    <div className="website">
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>
        <form>
          <div className="imgcontainer">
            <img
              src={require("../../assets/images/user.png")}
              alt="Avatar"
              className="avatar"
            />
          </div>

          <div className="container-input">
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <Input
              type="text"
              placeholder="Nhập username"
              className="form-input"
              name="uname"
              required
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <label htmlFor="uname">
              <b>Password</b>
            </label>
            <Input
              type="password"
              placeholder="Nhập password"
              className="form-input"
              name="uname"
              required
              onChange={(event) => {
                setPwd(event.target.value);
              }}
            />

            <Button
              style={{ backgroundColor: "green", color: "white" }}
              title="Đăng nhập"
              onClick={(event) => submit()}
            >
              Đăng nhập
            </Button>
            <label>
              <input type="checkbox" onChange={() => {}} name="remember" />{" "}
              Remember me
            </label>
          </div>
          <a href="a">Quên mật khẩu</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
