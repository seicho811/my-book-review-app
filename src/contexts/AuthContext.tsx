import { useState, createContext, useContext, useEffect } from "react";
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
  // Restore user info on mount if token exists
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Try to restore user from localStorage first
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUser({ name: storedUserName });
      } else {
        // If user info is not in localStorage, fetch it from the API
        getUserInfo(storedToken)
          .then((userInfo) => {
            setUser(userInfo);
            localStorage.setItem("userName", userInfo.name);
          })
          .catch(() => {
            // If fetching user info fails, clear auth data
            setToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
          });
      }
    }
  }, []);

  const navigate = useNavigate();

  async function login(email: string, password: string) {
    try {
      const token = await loginApi(email, password);
      const userInfo = await getUserInfo(token);
      setToken(token);
      setUser(userInfo);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userInfo));
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
    localStorage.removeItem("userName");
  }

  async function signUpAndLogin(name: string, email: string, password: string) {
    try {
      const token = await signUp({ name, email, password });
      const userInfo = await getUserInfo(token);
      setToken(token);
      setUser(userInfo);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userInfo));
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
