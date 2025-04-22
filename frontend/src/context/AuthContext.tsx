import { User } from "@/models/User";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (
    id: number,
    username: string,
    role: number,
    userCode: string,
    token: string
  ) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (
    id: number,
    username: string,
    role: number,
    userCode: string,
    token: string
  ) => {
    const userObj = {
      id: id,
      username: username,
      userCode: userCode,
      role: role,
    };
    setUser(userObj!);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userObj));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => {
    return !!user && !!token;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
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
