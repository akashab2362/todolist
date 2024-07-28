import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { register, clearError } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/vite.svg");
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/task");
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
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
          <form onSubmit={registerSubmit} encType="multipart/form-data">
            <h1>Sign Up</h1>
            <div className="input-field">
              <label htmlFor="name">Enter name:</label>
              <input
                type="text"
                value={name}
                required
                onChange={registerDataChange}
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Enter Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={registerDataChange}
                placeholder="Email"
              />
            </div>

            <div className="input-field">
              <label htmlFor="pass">Enter Password:</label>
              <input
                type="password"
                id="pass"
                name="password"
                value={password}
                onChange={registerDataChange}
                placeholder="Password"
              />
            </div>

            <div id="registerImage" className="image-cont">
              <img
                src={avatarPreview}
                className="avatarPreview"
                alt="Avatar Preview"
              />
              <input
                type="file"
                name="avatar"
                accept="iamge/*"
                onChange={registerDataChange}
              />
            </div>

            <div className="submit-form">
              <input type="submit" value="Sign Up" />
            </div>
            <p>
              Already have a account?<Link to={"/auth/login"}>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Register;
