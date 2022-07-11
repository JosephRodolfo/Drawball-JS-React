import React from "react";
import { useAuth } from "./AuthProvider";
import { startCreateUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { startCreateShip } from "../actions/ship";

const SignupPage = () => {
  const navigate = useNavigate();
  const { token, onCreateUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = document.forms[0];

    const user = await startCreateUser(
      { username: username.value, password: password.value },
      () => {
        navigate("/dashboard");
      }
    );
    if(!user){
      return;
    }
    onCreateUser(user);
    // const ship = await startCreateShip(user.token);
    await startCreateShip(user.token);
  };





  return (

  <div className="signup-page">
   {token ? (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1>Error!</h1>
        <p className="description">Sorry, but you're already logged in!</p>
        </div>
    </div>
  ) : (
    <div className="box-layout">
        <div className="box-layout__box">

        <h1 className="box-layout__title">Create your account!</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="input-group__item"
              name="username"
              placeholder="username"
              required={true}
            />
            <input
              type="password"
              className="input-group__item"
              name="password"
              placeholder="password"
              required={true}
            />

            <button className="button big-button" type="submit">
              Submit
            </button>
          </div>
        </form>
        </div>
      </div>
  )}
</div>)
};

export default SignupPage;
