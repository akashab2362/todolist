import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../store/userSlice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useAlert } from "react-alert";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginsubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: email, password: password }));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/task");
    }
  }, [dispatch, alert, navigate, error, isAuthenticated]);

  return (
    <div className="login-container">
      <div className="left">
        <div className="topLeft">
          <p>
            <Link to="/">
              Task<span>Master</span>
            </Link>
          </p>
        </div>
        <div className="bottomLeft">
          <form onSubmit={loginsubmit}>
            <h1>Log in</h1>
            <div className="input-field">
              <label htmlFor="email">Enter Email:</label>
              <input
                type="email"
                value={email}
                id="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-field">
              <label htmlFor="pass">Enter Password:</label>
              <input
                type="password"
                id="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="submit-form">
              <input type="submit" value="Login" />
              <p>
                <Link to={"/auth/forgot"}>forgot password?</Link>
              </p>
            </div>
            <p>
              Don't have a account?<Link to={"/auth/register"}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Login;
