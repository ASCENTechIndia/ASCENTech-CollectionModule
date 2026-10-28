import { createContext, useCallback, useContext, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [companyUser, setCompanyUser] = useState(() => {
    const savedCompanyUser = localStorage.getItem("companyUser");
    return savedCompanyUser ? JSON.parse(savedCompanyUser) : null;
  });
  const [agencyUser, setAgencyUser] = useState(() => {
    const savedAgencyUser = localStorage.getItem("agencyUser");
    return savedAgencyUser ? JSON.parse(savedAgencyUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  const [companyToken, setCompanyToken] = useState(() => {
    return localStorage.getItem("companyToken");
  });
  const [agencyToken, setAgencyToken] = useState(() => {
    return localStorage.getItem("agencyToken");
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check fixed frontend auth token
  const isAuthTokenValid = () => {
    const storedAuthToken = localStorage.getItem("auth_token");

    return storedAuthToken && AUTH_TOKEN && storedAuthToken === AUTH_TOKEN;
  };

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      const nextToken = response?.token;
      const userData = response?.user || {};

      if (!response?.success || !nextToken) {
        throw new Error(response?.message || "Authentication failed");
      }

      const mappedUser = {
        ...userData,
        name: userData.userName || userData.name || userData.fullName || "",
        id: userData.userId || userData.id,
        email: userData.email || "",
      };

      // Save user
      setUser(mappedUser);
      localStorage.setItem("user", JSON.stringify(mappedUser));

      // Save API token if your backend needs it
      setToken(nextToken);
      localStorage.setItem("token", nextToken);

      // Save fixed frontend auth token
      localStorage.setItem("auth_token", AUTH_TOKEN);

      return mappedUser;
    } catch (apiError) {
      const message =
        apiError.message || "Login failed. Please check your credentials.";

      setError(message);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  const companyLogin = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.companyLogin(credentials);

      const nextToken = response?.token;
      const userData = response?.user || {};

      if (!response?.success || !nextToken) {
        throw new Error(response?.message || "Authentication failed");
      }

      // Save user
      setCompanyUser(userData);
      localStorage.setItem("companyUser", JSON.stringify(userData));

      // Save API token if your backend needs it
      setCompanyToken(nextToken);
      localStorage.setItem("companyToken", nextToken);

      // Save fixed frontend auth token
      localStorage.setItem("auth_token", AUTH_TOKEN);

      return userData;
    } catch (apiError) {
      const message =
        apiError.message || "Login failed. Please check your credentials.";

      setError(message);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  const agencyLogin = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.agencyLogin(credentials);

      const nextToken = response?.token;
      const userData = response?.user || {};

      if (!response?.success || !nextToken) {
        throw new Error(response?.message || "Authentication failed");
      }

      // Save user
      setAgencyUser(userData);
      localStorage.setItem("agencyUser", JSON.stringify(userData));

      // Save API token if your backend needs it
      setAgencyToken(nextToken);
      localStorage.setItem("agencyToken", nextToken);

      // Save fixed frontend auth token
      localStorage.setItem("auth_token", AUTH_TOKEN);

      return userData;
    } catch (apiError) {
      const message =
        apiError.message || "Login failed. Please check your credentials.";

      setError(message);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (apiError) {
      console.error("Logout API error:", apiError);
    }

    setUser(null);
    setToken(null);

    setCompanyUser(null);
    setCompanyToken(null);

    setAgencyUser(null);
    setAgencyToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("auth_token");

    localStorage.removeItem("companyUser");
    localStorage.removeItem("companyToken");

    localStorage.removeItem("agencyUser");
    localStorage.removeItem("agencyToken");
  }, []);

  const value = {
    user,
    companyUser,
    agencyUser,
    token,
    companyToken,
    agencyToken,
    loading,
    error,
    login,
    companyLogin,
    agencyLogin,
    logout,

    // User or companyUser or agencyUser exists AND fixed auth token is valid
    isAuthenticated:
      (!!user || !!companyUser || !!agencyUser) && isAuthTokenValid(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
