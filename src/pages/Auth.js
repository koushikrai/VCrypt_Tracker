import React, { useState } from "react";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../components/Auth/api";
import "../components/Auth/styles.css"; // Make sure this import points to the correct CSS file

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      toast.error("Please fill out both fields");
      return;
    }

    try {
      if (isLogin) {
        const response = await login(username, password);
        toast.success(response);

        if (response === "Login successful") {
          navigate("/dashboard");
        }
      } else {
        const response = await signup(username, password);
        toast.success(response);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-toggle">
      <div className="auth-card">
        <Typography variant="h5" className="auth-title">
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
