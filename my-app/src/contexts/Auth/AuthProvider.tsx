import { useState, useEffect } from "react";
import { useApi } from "../../hooks/UseApi";
import { User } from "../../Types/User";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    async function validateToken() {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) {
          setUser(data.user);
        }
      }
    }
    validateToken();
  }, []);

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    setUser(null);
    setToken("");
    await api.logout();
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
