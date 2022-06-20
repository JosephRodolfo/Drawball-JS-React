import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext(null);
export const useAuth = () => {

  return React.useContext(AuthContext);
};



const AuthProvider = ({ children }) => {


  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);


  const handleLogin = (user) => {
    setToken(user.token);
    setId(user.user._id)
  };

  const handleLogout = () => {
    setToken(null);
    setId(null)
  };

  const handleCreateUser = (user) =>{
    setToken(user.token)
    setId(user.user._id)

  }

  const value = {
    id,
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onCreateUser: handleCreateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> 

};

export default AuthProvider;
