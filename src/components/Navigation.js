import { NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";
import { useAuth } from "./AuthProvider";

export const Navigation = () => {
  const { onLogout, token } = useAuth();

  const logout = async () => {
    startLogout(token, onLogout);
  };

  return (
    <nav className="navigation">
      <NavLink className='navlinks' to="/login">Login</NavLink>
      <NavLink className='navlinks'to="/dashboard">Dashboard</NavLink>
      <NavLink className='navlinks' to="/signup">Signup</NavLink>
      {token && (
        <button className="signout-non-button" type="button" onClick={logout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};
