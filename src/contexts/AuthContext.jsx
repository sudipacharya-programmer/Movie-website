import React, { createContext, useContext, useState } from "react";

const USERS_KEY = "movie-demo-users";
const SESSION_KEY = "movie-demo-session";

export const AuthContext = createContext(null);

const readStorage = (key, fallback) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage(SESSION_KEY, null));

  const login = (email, password) => {
    const users = readStorage(USERS_KEY, []);
    const matchingUser = users.find(
      (candidate) =>
        candidate.email === email.trim().toLowerCase() &&
        candidate.password === password,
    );

    if (!matchingUser) {
      return "Invalid email or password.";
    }

    const sessionUser = {
      name: matchingUser.name,
      email: matchingUser.email,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return null;
  };

  const register = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readStorage(USERS_KEY, []);

    if (users.some((candidate) => candidate.email === normalizedEmail)) {
      return "An account with this email already exists.";
    }

    const newUser = { name: name.trim(), email: normalizedEmail, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ name: newUser.name, email: newUser.email }),
    );
    setUser({ name: newUser.name, email: newUser.email });
    return null;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
