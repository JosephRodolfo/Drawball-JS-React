import React from "react";
import { startLogin } from "../actions/auth";
import { useAuth } from "./AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { onLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = document.forms[0];

    let user = await startLogin(
      { email: username.value, password: password.value },
      () => {
        const previousLocation = location.state?.from?.pathname || "/dashboard";
        navigate(previousLocation);
      }
    );

    if(!user){
      return;
    }
    onLogin(user);
  };

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Log in</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              aria-label="username"
              className="input-group__item"
              type="text"
              id="username"
              name="username"
              placeholder="email"
              required={true}
            />

            <input
              aria-label="password"
              className="input-group__item"
              id="password"
              type="password"
              name="password"
              placeholder="password"
              required={true}

            />

            <button className="button big-button input-group__item" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
