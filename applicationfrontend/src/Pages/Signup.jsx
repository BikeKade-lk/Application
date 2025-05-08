import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

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
    <div className="signin-container">
      <h1>Signin</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          First Name:
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
          {formErrors.fname && <p className="error-text">{formErrors.fname}</p>}
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            required
          />
          {formErrors.uname && <p className="error-text">{formErrors.uname}</p>}
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            name="pno"
            value={formData.pno}
            onChange={handleChange}
          />
          {formErrors.pno && <p className="error-text">{formErrors.pno}</p>}
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {formErrors.address && (
            <p className="error-text">{formErrors.address}</p>
          )}
        </label>

        <label>
          Password:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={!isPasswordValid ? "invalid-input" : ""}
          />
          {formErrors.password && (
            <p className="error-text">{formErrors.password}</p>
          )}
        </label>

        {formData.password && passwordErrors.length > 0 && (
          <ul className="password-errors">
            {passwordErrors.map((error, idx) => (
              <li key={idx} className="error-text">
                {error}
              </li>
            ))}
          </ul>
        )}

        <label>
          Confirm Password:
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={!passwordsMatch ? "invalid-input" : ""}
          />
          {formErrors.confirmPassword && (
            <p className="error-text">{formErrors.confirmPassword}</p>
          )}
        </label>

        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />{" "}
          Show Passwords
        </label>

        <button type="submit" disabled={!isPasswordValid || !passwordsMatch}>
          Submit
        </button>

        <p onClick={() => navigate("/signin")} className="login-link">
          Do you have an account? Login
        </p>

        <div className="password-requirements">
          <h3>Password Requirements:</h3>
          <ul>
            <li className={formData.password.length >= 8 ? "met" : ""}>
              At least 8 characters long
            </li>
            <li className={/[A-Z]/.test(formData.password) ? "met" : ""}>
              At least one uppercase letter
            </li>
            <li className={/[a-z]/.test(formData.password) ? "met" : ""}>
              At least one lowercase letter
            </li>
            <li className={/[0-9]/.test(formData.password) ? "met" : ""}>
              At least one number
            </li>
            <li
              className={
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)
                  ? "met"
                  : ""
              }
            >
              At least one special character
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
