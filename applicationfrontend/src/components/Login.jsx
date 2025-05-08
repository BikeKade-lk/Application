import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    uname: "",
    password: ""
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Make a request to the backend for login validation
      const response = await axios.post("http://localhost:8080/user/login", credentials);
      // The backend returns a boolean directly, not an object with success property
      if (response.data === true) {
        navigate("/admin");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
    </div>
  );
}