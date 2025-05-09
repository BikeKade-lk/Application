import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const issues = [];
    if (password.length < 8)
      issues.push("Password must be at least 8 characters");
    if (!/[A-Z]/.test(password))
      issues.push("Must include an uppercase letter");
    if (!/[a-z]/.test(password)) issues.push("Must include a lowercase letter");
    if (!/[0-9]/.test(password)) issues.push("Must include a number");
    if (!/[!@#$%^&*]/.test(password))
      issues.push("Must include a special character");
    return issues;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors([]);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, newPassword, confirmPassword } = formData;

    if (!identifier || !newPassword || !confirmPassword) {
      setErrors(["All fields are required."]);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors(["Passwords do not match."]);
      return;
    }

    const validationIssues = validatePassword(newPassword);
    if (validationIssues.length > 0) {
      setErrors(validationIssues);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/user/reset-password",
        {
          identifier,
          newPassword,
        }
      );

      if (response.data.success) {
        setSuccessMessage("Password reset successful. You can now log in.");
        setFormData({ identifier: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setErrors([response.data.message || "Failed to reset password."]);
      }
    } catch (error) {
      console.error("Reset error:", error);
      setErrors(["An error occurred. Please try again."]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box mt={4} p={3} sx={{ boxShadow: 2, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>

          {errors.length > 0 && (
            <Box mb={2}>
              {errors.map((err, idx) => (
                <Alert severity="error" key={idx} sx={{ mb: 1 }}>
                  {err}
                </Alert>
              ))}
            </Box>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
              }
              label="Show Passwords"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
