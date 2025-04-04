import React, { useEffect, useState } from "react";
import "./Register.css";
import countryMobileCodes from "../components/countryCodes";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthPage, registerCompleteUser, registerUser } from "../slices/authSlice";
import Alert from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { status, error, registerdStep1, errCode } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    const obj = {
      name,
      email,
      countryCode,
      mobile,
      address,
      password,
    };
    console.log(obj);
    dispatch(registerUser(obj));
  };
  const handleSubmitOTP = () => {
    const obj = {
        email,
        otp
    }
    dispatch(registerCompleteUser(obj))
  }
  useEffect(() => {
    if (status==="registeredUser") {
        navigate('/login')
    }
  }, [status])

  useEffect(() => {
    
      return () => {
        dispatch(closeAuthPage())
      }
    }, [])
  

  return (
    <div className="register-screen">
      <div className="register-form">
        <h2>Register</h2>
        <div className="input-text">
          <label>Name </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="input-text">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="input-text-mobile">
          <label>Mobile</label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option>Select Country</option>
            {countryMobileCodes.map((country, index) => (
              <option key={index} value={country.code}>
                {country.country}
              </option>
            ))}
          </select>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="text"
            placeholder="Enter your mobile"
          />
        </div>
        <div className="input-text">
          <label>Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter your address"
          />
        </div>
        <div className="input-text">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="input-text">
          <label>Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
        </div>
        {password !== confirmPassword && (
          <Alert variant="danger">Password does not matches</Alert>
        )}
        {errCode == 1 && (
          <Alert variant="danger">
            This Email is already registered. Please{" "}
            <Link to="/login">Login</Link> !
          </Alert>
        )}
        {!registerdStep1 && (
          <button
            disabled={password !== confirmPassword}
            onClick={handleSubmit}
            className={
              password !== confirmPassword || password === ""
                ? "disabled-submit-button"
                : "submit-button"
            }
          >
            Submit
          </button>
        )}
        {registerdStep1 && (
          <>
            <div className="input-text">
              <label>Enter OTP </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                placeholder="Enter the OTP sent to your Email"
              />
            </div>
            <button
              disabled={password !== confirmPassword}
              onClick={handleSubmitOTP}
              className={
                otp === "" ? "disabled-submit-button" : "submit-button"
              }
            >
              Submit OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
