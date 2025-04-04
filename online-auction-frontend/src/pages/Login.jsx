import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/authSlice";
import Alert from "../components/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);


  const handleSubmit = () => {
    dispatch(loginUser({ email, password }));
  };
  useEffect(() => {
    if (status === "succeeded") navigate("/");
  }, [status]);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {status === "failed" && <Alert variant="danger">{error}</Alert>}
        <div className="input-text">
          <label>Email : </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-text">
          <label>Password : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="submit-button"
        >
          Submit
        </button>
        <span>Forgot your password? <Link to="/forgotPassword">Reset Password</Link></span>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
