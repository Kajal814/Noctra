
import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/auth/me");
        setUser(response.data.user || response.data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    const response = await API.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);
    setUser(response.data.user);

    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
      setUser(response.data.user);
    }

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
