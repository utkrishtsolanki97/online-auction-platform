import React, { useEffect } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Logout, userProfile } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, status, profileDetails } = useSelector(
    (state) => state.auth
  );
  // const {name}

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    profileDetails.email.length === 0 && dispatch(userProfile(user.user.id));
  }, []);
  useEffect(() => {
    if (!user) {
        navigate("/");
      }
  }, [user])
  

  const handleLogoutSubmit = () => {
    dispatch(Logout())
  }

  return (
    <div className="profile-screen">
      <div className="profile-form">
        <h2>Profile</h2>
        {user && <><div className="input-text">
          <label>Name </label>
          <input
            value={profileDetails?.name}
            type="text"
            placeholder="Enter your name"
            disabled
          />
        </div>
        <div className="input-text">
          <label>Email</label>
          <input
            value={profileDetails?.email}
            type="text"
            placeholder="Enter your email"
            disabled
          />
        </div>
        <div className="input-text-mobile">
          <label>Mobile</label>
          <input type="text" value={profileDetails?.country_code}
            disabled />
          <input
            value={profileDetails?.mobile}
            type="text"
            placeholder="Enter your mobile"
            disabled
          />
        </div>
        <div className="input-text">
          <label>Address</label>
          <input
            value={profileDetails?.address}
            type="text"
            placeholder="Enter your address"
            disabled
          />
        </div></>}
        <button
          onClick={handleLogoutSubmit}
          className="submit-button"
        >
          Logout
        </button>
        {/* <div className="input-text">
          <label>Password</label>
          <input
            value={password}
            type="password"
            placeholder="Enter your password"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
