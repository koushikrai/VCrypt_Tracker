// src/pages/Auth.js
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { toast } from "react-toastify";
import { login, signup } from "../components/Auth/api"; // Make sure the import paths are correct

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission (login/signup)
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
      } else {
        const response = await signup(username, password);
        toast.success(response);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ marginTop: 2 }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <Button
            fullWidth
            sx={{ marginTop: 1 }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Auth;
