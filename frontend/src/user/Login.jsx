import React, { useContext, useState } from "react";
import style from "../css/Login.module.css";
import { Link } from "react-router-dom";
import api from "../constant/api";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import logo from "../assets/newlogo.jpg";
import {jwtDecode} from "jwt-decode"; // Correct import

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
        const access = response.data.access;
        const refresh = response.data.refresh
        const decodedToken = jwtDecode(access); // Decode the access token
        const isAdmin = decodedToken.is_admin; // Extract `is_admin` claim

        // Store tokens
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        // Navigate based on user role
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate(from || "/", { replace: true });
        }

        // Trigger global auth and reset state
        auth();
        setPassword("");
        setEmail("");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false); // Reset loading state
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
