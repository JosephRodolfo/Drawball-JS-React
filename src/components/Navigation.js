import { NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";
import { useAuth } from "./AuthProvider";
import { socket } from "../services/socket";

export const Navigation = () => {
  const { onLogout, token, id } = useAuth();

  const logout = async () => {
    socket.emit("leave", id);
    await startLogout(token);
    onLogout();
  };

  return (
    <nav className="navigation">
        <div className="nav-flex-container">
          <NavLink className="button navlinks" to="/login">
            Login
          </NavLink>
          <NavLink className="button navlinks" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="button navlinks" to="/signup">
            Signup
          </NavLink>
{token && 
        <button className="button signout-non-button" type="button" onClick={logout}>
          Sign Out
        </button>}
        </div>

    </nav>
  );
};
