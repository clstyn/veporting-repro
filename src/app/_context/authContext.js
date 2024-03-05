import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.access_token);
    setToken(userData.access_token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
