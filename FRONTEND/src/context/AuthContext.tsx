// import React, { createContext, useContext, useEffect, useState } from "react";
// // import jwtDecode from "jwt-decode";
// import { jwtDecode } from "jwt-decode";
// import { loginUser, registerUser } from "../api/auth";

// interface User {
//   id: string;
//   role?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (data: { username: string; password: string }) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const decodeUser = (token: string) => {
//     try {
//       return jwtDecode<User>(token);
//     } catch {
//       return null;
//     }
//   };

//   // const login = async (data: { username: string; password: string }) => {
//   //   // simulate backend call or token
//   //   const token = "fake-jwt-token";
//   //   console.log("login called with", data);
//   //   localStorage.setItem("token", token);
//   //   setUser(decodeUser(token));
//   // };

//   const login = async (data: Credentials) => {
//     try {
//       const res = await loginUser(data);
//       const token = res.data.token;

//       localStorage.setItem("token", token);
//       setUser(decodeUser(token));
//     } catch {
//       throw new Error("Invalid credentials");
//     }
//   };

//   // 📝 REGISTER
//   const register = async (data: Credentials) => {
//     try {
//       await registerUser(data);
//     } catch {
//       throw new Error("Registration failed");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser(decodeUser(token));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };

import React, { createContext, useContext, useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "../api/auth";

interface User {
  id: string;
  role?: string;
}

interface Credentials {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: Credentials) => Promise<void>;
  register: (data: Credentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const decodeUser = (token: string): User | null => {
    try {
      return jwtDecode<User>(token);
    } catch {
      return null;
    }
  };

  // 🔐 LOGIN
  const login = async (data: Credentials) => {
    try {
      const res = await loginUser(data);
      const token = res.data.token;

      localStorage.setItem("token", token);
      setUser(decodeUser(token));
    } catch {
      throw new Error("Invalid credentials");
    }
  };

  // 📝 REGISTER
  const register = async (data: Credentials) => {
    try {
      await registerUser(data);
    } catch {
      throw new Error("Registration failed");
    }
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
        register,
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
