import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext(null);
export const useAuth = () => {

  return React.useContext(AuthContext);
};



const AuthProvider = ({ children }) => {


  const [token, setToken] = useState(null);

  const handleLogin = (user) => {
    setToken(user.token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const handleCreateUser = (user) =>{
    setToken(user.token)
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onCreateUser: handleCreateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> 

};

export default AuthProvider;
