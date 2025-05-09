import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

export default function Signin() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    uname: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        credentials
      );

      if (response.data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.userId,
            username: response.data.username,
            fullName: response.data.fullName,
          })
        );
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleResetPassword = () => {
    navigate("/reset_password");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ flexGrow: 1, display: "flex", alignItems: "center", py: 5 }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign In
          </Typography>

          {error && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Username"
              name="uname"
              value={credentials.uname}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
            <Typography
              variant="body2"
              onClick={handleResetPassword}
              sx={{
                mt: 2,
                color: "primary.main",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Forgot your password? Reset here
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
