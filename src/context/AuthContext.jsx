import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@planmyhospitality.com";
const ADMIN_PASSWORD = "pmh@admin2026";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("pmh_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (email, password) => {
    // Admin check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { role: "admin", email, name: "Admin" };
      setUser(adminUser);
      localStorage.setItem("pmh_user", JSON.stringify(adminUser));
      return { success: true, role: "admin" };
    }

    // Consumer check
    const consumers = JSON.parse(localStorage.getItem("pmh_consumers") || "[]");
    const found = consumers.find((c) => c.email === email && c.password === password);
    if (found) {
      const consumerUser = { role: "consumer", email: found.email, name: found.name };
      setUser(consumerUser);
      localStorage.setItem("pmh_user", JSON.stringify(consumerUser));
      return { success: true, role: "consumer" };
    }

    return { success: false, message: "Invalid email or password." };
  };

  const register = (name, email, password) => {
    const consumers = JSON.parse(localStorage.getItem("pmh_consumers") || "[]");
    const exists = consumers.find((c) => c.email === email);
    if (exists) return { success: false, message: "Email already registered." };

    const newUser = { name, email, password };
    consumers.push(newUser);
    localStorage.setItem("pmh_consumers", JSON.stringify(consumers));

    const consumerUser = { role: "consumer", email, name };
    setUser(consumerUser);
    localStorage.setItem("pmh_user", JSON.stringify(consumerUser));
    return { success: true, role: "consumer" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pmh_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);