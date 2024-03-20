import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenFromCookie = getCookie("token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setCookie("token", userData.access_token, 1);
    setToken(userData.access_token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    deleteCookie("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  const deleteCookie = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
