"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  country: {
    countryName: string;
  };
  email: string;
  avatarUrl?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const login = (newToken: string, userData: User) => {
    // Set token in cookies with expiry (e.g., 7 days)
    Cookies.set("token", newToken, { expires: 7 });
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    setUser(null);
    router.push("/sign-in");
  };

  useEffect(() => {
    const fetchUserData = async (authToken: string) => {
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          logout();
          return;
        }

        const data = await response.json();
        if (data.data) {
          setUser(data.data);
        } else {
          console.error("Invalid user data format:", data);
          logout();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    // Check token from cookies on initial load
    const storedToken = Cookies.get("token");
    if (storedToken && !user) {
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
