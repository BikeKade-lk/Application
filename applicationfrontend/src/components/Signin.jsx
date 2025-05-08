import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData; // exclude confirmPassword
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
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  return (
    <div>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>First Name:</td>
              <td>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>User Name:</td>
              <td>
                <input
                  type="text"
                  name="uname"
                  value={formData.uname}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>
                <input
                  type="text"
                  name="pno"
                  value={formData.pno}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Confirm Password:</td>
              <td>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />{" "}
                  Show Passwords
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
        <p onClick={() => navigate("/login")}>Do you have an account? Login</p>
      </form>
    </div>
  );
}
