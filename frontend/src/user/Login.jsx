import React, { useContext, useState } from "react";
import style from "../css/Login.module.css";
import { Link } from "react-router-dom";
import api from "../constant/api";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import logo from '../assets/newlogo.jpg'

const Login = () => {
  const { auth } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userInfo = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    try {
      const response = await api.post("api/token/", userInfo);
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        navigate(from || "/", { replace: true });
        auth();
        setPassword("");   // Resetting password
        setEmail("");      // Resetting email
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.plogodiv}>
          <img className={style.plogo} src={logo} alt="logo" />
        </div>
        <h3 className={style.welcome}>
          Welcome Back to <span className={style.lycen}>Lycentric</span>
        </h3>
        <p className={style.detail}>
          Please provide your login details correctly
        </p>

        {error && <p className={style.error}>{error}</p>}

        <div className={style.formDiv}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={style.formDiv}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/verifyemail">
          <p className={style.forgot}>Forgot Password?</p>
        </Link>
        <div>
          <button
            className={style.login}
            disabled={!email || !password || loading}
          >
            {loading ? "Loading ..." : "Login"}
          </button>
        </div>
        <div>
          <p className={style.signupText}>
            Don't have an account yet? Please click{" "}
            <Link to="/signup">
              <span className={style.link}>here</span>
            </Link>{" "}
            to signup
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
