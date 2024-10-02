import React, { useContext, useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import api from "../constant/api";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Login = () => {

  const {auth} = useContext(GlobalContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userInfo = {
    email: email,
    password: password
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/token/", userInfo);
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        navigate(from, { replace: true });
        auth()
        setPassword("");   // Resetting password
        setEmail("");      // Resetting email
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.detail || "An error occurred");
    }
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="welcome">
          Welcome Back to <span className="lycen">Lycentric</span>
        </h3>
        <p className="detail">Please provide your login details correctly</p>

        {error && <p className="error">{error}</p>}

        <div className="formDiv">
          <label>Email</label>
          <input
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formDiv">
          <label>Password</label>
          <input
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="forgot">Forgot Password?</p>
        <button className="login">Login</button>
        <div>
          <p className="signupText">
            Don't have an account yet? Please click{" "}
            <Link to="/signup">
              <span className="link">here</span>
            </Link>{" "}
            to signup
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
