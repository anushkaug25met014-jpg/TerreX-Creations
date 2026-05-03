import { createContext, useContext, useState, ReactNode } from "react";

type Role = "Admin" | "Industry" | "Buyer" | "Manufacturer";

interface AuthState {
  isAuthenticated: boolean;
  role: Role | null;
  email: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: Role) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_EMAIL = "admin@terrex.com";
const ADMIN_PASSWORD = "admin123";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = sessionStorage.getItem("terrex_auth");
    return stored ? JSON.parse(stored) : { isAuthenticated: false, role: null, email: null };
  });

  const login = (email: string, password: string, role: Role): boolean => {
    if (role === "Admin") {
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) return false;
    }
    const state: AuthState = { isAuthenticated: true, role, email };
    setAuth(state);
    sessionStorage.setItem("terrex_auth", JSON.stringify(state));
    return true;
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, role: null, email: null });
    sessionStorage.removeItem("terrex_auth");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
