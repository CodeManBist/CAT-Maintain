import React, { useState, useContext } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Auth.module.css";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMe } = useContext(AuthContext); // ✅ use fetchMe
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      // ✅ MOST IMPORTANT
      await fetchMe(); // ✅ fetch user again using token

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      const message = 
        err.response?.data?.message || "Login failed. Check email/password";

      toast.error(message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} className={styles.form}>
        <input
          className={styles.input}
          value={email}
          type="email"
          placeholder="Enter Email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          value={password}
          type="password"
          placeholder="Enter Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} type="submit">
          Login
        </button>
      </form>

      <p className={styles.text}>
        Don’t have an account?
        <Link className={styles.link} to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
