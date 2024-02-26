import React, { useState } from "react";
import loginImage from "/loginIcon.png"; // Import your image
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "../styles/login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email: email, password: password });

    try {
      const res = await axios.post("http://localhost:5050/signin", {
        email: email,
        password: password,
      });
      console.log(res.data);
      window.location.href = `/attendance?email=${res.data.email}&name=${res.data.name}`;
    } catch (error) {
      const stat = error.response.status;
      if ([404, 401, 500].includes(stat)) {
        alert(error.response.data.message);
      } else {
        error("Error in connecting server");
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="left-column">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="email" className="label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email..."
                className="input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter Password..."
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit" className="button">
              Login
            </button>
          </form>
          <div className="signup-link">
            <p>
              Don't have an account?{" "}
              <a href="/Signup" className="signup">
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <div className="right-column">
          <img src={loginImage} alt="Login" className="image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
