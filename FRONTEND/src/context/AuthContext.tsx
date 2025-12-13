import React, { createContext, useContext, useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const decodeUser = (token: string) => {
    try {
      return jwtDecode<User>(token);
    } catch {
      return null;
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setUser(decodeUser(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(decodeUser(token));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
