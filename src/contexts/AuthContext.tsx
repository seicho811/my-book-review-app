import { useState, createContext, useContext } from "react";
import { login as loginApi, getUserInfo, signUp } from "../utils/api";
import { useNavigate } from "react-router";

type User = {
  name: string;
  iconUrl?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUpAndLogin: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  setUser: (user: User) => void;
  clearAuthData: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const navigate = useNavigate();

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
    navigate("/logout");
  }

  function clearAuthData() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  async function signUpAndLogin(name: string, email: string, password: string) {
    try {
      const token = await signUp({ name, email, password });
      const userInfo = await getUserInfo(token);
      setToken(token);
      setUser(userInfo);
      localStorage.setItem("token", token);
    } catch {
      throw new Error("Sign up failed");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        signUpAndLogin,
        setUser,
        clearAuthData,
      }}
    >
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
