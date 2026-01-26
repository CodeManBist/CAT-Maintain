import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    const toastId = toast.loading("Loading user...");

    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data);
      toast.update(toastId, {
        render: "Welcome back ✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err) {
      setUser(null);
      toast.update(toastId, {
        render: "Session expired. Please login ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
