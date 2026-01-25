import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Auth.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("technician");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      await axiosInstance.post("/auth/register", {
        name,
        username,
        email,
        password,
        role,
      });

      toast.success("Registered successfully ✅ Please login");
      navigate("/login");
    } catch (err) {
      toast.error("Register failed ❌");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>

      <form onSubmit={handleRegister} className={styles.form}>
        <input
          className={styles.input}
          value={name}
          placeholder="Enter Name..."
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.input}
          value={username}
          placeholder="Enter Username..."
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <select
          className={styles.input}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="technician">Technician</option>
        </select>

        <button className={styles.button} type="submit">
          Register
        </button>
      </form>

      <p className={styles.text}>
        Already have an account?
        <Link className={styles.link} to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
