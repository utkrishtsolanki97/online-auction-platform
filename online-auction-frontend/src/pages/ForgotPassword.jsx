import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAuthPage,
  initiatePasswordReset,
  otpVerifyPasswordReset,
  passwordReset,
  registerCompleteUser,
} from "../slices/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, errCode } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [iteration, setIteration] = useState(0);
  const handleResetSubmit = () => {
    dispatch(initiatePasswordReset({ email }));
  };
  useEffect(() => {
    if (status === "otpGenerated") {
      setIteration(1);
    }
    if (status === "otpVerifiedResetPassword") {
      setIteration(2);
    }
    if (status === "ResetPasswordsuccessfull") {
      navigate("/login");
    }
  }, [status]);

  useEffect(() => {
  
    return () => {
      dispatch(closeAuthPage())
    }
  }, [])
  

  const handleSubmitOTP = () => {
    dispatch(otpVerifyPasswordReset({ email, otp }));
  };
  const handleResetPassword = () => {
    dispatch(passwordReset({ email, otp, newPassword: password }));
  };
  const handelEmailIDChange = () => {
    setEmail("");
    setIteration(0);
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="forgot-password-container">
      <div className="reset-password-form">
        <h2>Reset Password</h2>
        <div className="input-text">
          <label>
            {iteration === 0
              ? "Please enter your registered email id"
              : "Registered Email ID"}{" "}
          </label>
          <input
            type="email"
            value={email}
            disabled={iteration > 0}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {iteration > 0 && (
            <Link onClick={handelEmailIDChange}>Mispelled Email ID?</Link>
          )}
        </div>
        {iteration === 1 && (
          <div className="input-text">
            <label>Please enter OTP sent to {email} </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
            />
          </div>
        )}
        {iteration === 2 && (
          <>
            <div className="input-text">
              <label>Please enter new Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the new password"
              />
            </div>
            <div className="input-text">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Renter the new password"
              />
            </div>
            {password !== confirmPassword && (
              <Alert variant="danger">Please Enter Same Password </Alert>
            )}
          </>
        )}
        {(!email.includes("@") || !email.includes(".")) && (
          <Alert variant="danger">Please enter valid email id</Alert>
        )}
        {status === "failed" && (
          <Alert variant="danger">
            {error}
            {errCode === 1 && (
              <>
                Please <Link to="/register">Register</Link>
              </>
            )}
          </Alert>
        )}
        {status === "otpVerifyFailed" && (
          <Alert variant="danger">{error}</Alert>
        )}
        <button
          onClick={
            iteration === 0
              ? handleResetSubmit
              : iteration === 1
              ? handleSubmitOTP
              : handleResetPassword
          }
          className={
            !email.includes("@") || !email.includes(".")
              ? "disabled-submit-button"
              : "submit-button"
          }
          disabled={!email.includes("@") || !email.includes(".")}
        >
          {iteration === 0
            ? "Submit"
            : iteration === 1
            ? "Verify OTP"
            : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
