import React from "react";
import { useAuth } from "./AuthProvider";
import { startCreateUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const { token, onCreateUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = document.forms[0];

    startCreateUser(
      { email: email.value, password: password.value},
      onCreateUser,
      () => {
        navigate("/dashboard");
      }
    );
  };

  return token ? (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1>Error!</h1>
        <p className="description">
          Sorry, but you're already logged in!
        </p>
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
              className=".input-group__item text-input"
              name="email"
              placeholder="email"
            />
            <input
              type="password"
              className=".input-group__item text-input"
              name="password"
              placeholder="password"
            />

            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
