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
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    uname: "",
    pno: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(
        formData.confirmPassword === "" ||
          value ===
            (name === "password" ? formData.confirmPassword : formData.password)
      );
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters long");
    if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("At least one number");
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(password))
      errors.push("At least one special character");

    setPasswordErrors(errors);
    setIsPasswordValid(errors.length === 0);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fname.trim()) errors.fname = "First name is required";
    if (!formData.uname.trim()) errors.uname = "Username is required";
    if (!formData.pno.trim()) {
      errors.pno = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.pno)) {
      errors.pno = "Phone number must be 10 digits";
    }
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    if (!formData.confirmPassword.trim())
      errors.confirmPassword = "Confirm password is required";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isPasswordValid) {
      alert("Please fix the password issues before submitting.");
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await axios.post("http://localhost:8080/user/add", userData);
      alert("User added successfully");

      setFormData({
        fname: "",
        lname: "",
        uname: "",
        pno: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      setPasswordErrors([]);
      setIsPasswordValid(false);
      setPasswordsMatch(true);
      setFormErrors({});
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.fname}
              helperText={formErrors.fname}
              required
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Username"
              name="uname"
              value={formData.uname}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.uname}
              helperText={formErrors.uname}
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="pno"
              value={formData.pno}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.pno}
              helperText={formErrors.pno}
              required
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.address}
              helperText={formErrors.address}
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              error={!isPasswordValid || !!formErrors.password}
              helperText={formErrors.password}
              required
            />

            {passwordErrors.length > 0 && (
              <List dense sx={{ pl: 2 }}>
                {passwordErrors.map((err, idx) => (
                  <ListItem key={idx} sx={{ py: 0 }}>
                    <ListItemText
                      primaryTypographyProps={{
                        color: "error",
                        variant: "body2",
                      }}
                      primary={`• ${err}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              error={!passwordsMatch || !!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
              }
              label="Show Passwords"
            />

            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isPasswordValid || !passwordsMatch}
              >
                Submit
              </Button>
            </Box>

            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2,
                cursor: "pointer",
                color: "primary.main",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signin")}
            >
              Do you have an account? Login
            </Typography>
          </form>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
