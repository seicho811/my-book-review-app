import { useState, createContext, useContext } from "react";
import { login as loginApi, getUserInfo } from "../utils/api";

type User = {
  name: string;
  iconUrl?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  async function login(email: string, password: string) {
    try {
      const token = await loginApi(email, password);
      const userInfo = await getUserInfo(token);
      setToken(token);
      setUser(userInfo);
      localStorage.setItem("token", token);
    } catch {
      throw new Error(`Login failed`);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
