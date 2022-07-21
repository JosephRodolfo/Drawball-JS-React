import React from "react";
import { useAuth } from "./AuthProvider";
import { refreshLogin, startCreateUser, startLogin } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { startCreateShip, updateShip } from "../actions/ship";
import { useState, useEffect } from "react";
import loader from "../assets/images/loader.gif";
import { getChunk } from "../actions/chunk";

const SignupPage = () => {
  const navigate = useNavigate();
  const { token, onCreateUser, onLogin } = useAuth();
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

    const user = await startCreateUser({
      username: username.value,
      password: password.value,
    });
    if (!user) {
      setLoading(false);

      return;
    }
    setLoading(false);
    onCreateUser(user);
    const ship = await startCreateShip(user.token);
    const chunk = await getChunk(user.token, { chunkX: 0, chunkY: 0 });
    await updateShip(user.token, ship._id, {
      currentChunk: chunk,
      chunkX: 0,
      chunkY: 0,
      position: { x: 520, y: 520 },
    });

    navigate("/dashboard");
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
                {loading ? (
                  <div className="loader-container">
                    <img className="signup-loader" src={loader} />{" "}
                  </div>
                ) : (
                  <button className="button big-button" type="submit">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
