import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    navigate("/reset_password"); // You should have a route for this
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <tbody>
          <tr>
            <td>User Name:</td>
            <td>
              <input
                type="text"
                name="uname"
                value={credentials.uname}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={handleSubmit}>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        onClick={handleResetPassword}
        style={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
          marginTop: "10px",
        }}
      >
        Forgot your password? Reset here
      </p>
    </div>
  );
}
