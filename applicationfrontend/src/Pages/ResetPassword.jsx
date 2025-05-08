import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "", // username or email
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
        setTimeout(() => navigate("/signin"), 2000); // redirect after delay
      } else {
        setErrors([response.data.message || "Failed to reset password."]);
      }
    } catch (error) {
      console.error("Reset error:", error);
      setErrors(["An error occurred. Please try again."]);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Reset Password</h2>
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username or Email:</label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            Show Passwords
          </label>
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
