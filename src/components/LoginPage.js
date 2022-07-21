import React from "react";
import { startLogin, refreshLogin } from "../actions/auth";
import { useAuth } from "./AuthProvider";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loader from "../assets/images/loader.gif";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { onLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  //on component mount, checks if there's a cookie and if valid, 
// logs user in and redirects to dashboard This will eventually be a hook so I don't
//repeat it in the LoginPage component.
  useEffect(() => {
    refreshLogin().then((user)=>{

    if (!user) {
      setLoading(false);
      return;
    } else {
      setLoading(false);
      onLogin(user);

      navigate('/dashboard');
    }
  })
  }, [navigate, onLogin]);


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { username, password } = document.forms[0];

    let user = await startLogin(
      { username: username.value, password: password.value },
      () => {
        const previousLocation = location.state?.from?.pathname || "/dashboard";
        navigate(previousLocation);
      }
    );

    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(false);
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
              placeholder="username"
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

            {loading ? (
              <div className="loader-container">
                <img className="signup-loader" src={loader} />{" "}
              </div>
            ) : (
              <button className="button big-button" type="submit">
                Log in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
