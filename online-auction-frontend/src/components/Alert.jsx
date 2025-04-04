import React from "react";
import "./Alert.css";

const Alert = ({ variant, children }) => {
    const variantClass = {
        success: "success-alert alert",
        danger: "danger-alert alert",
        warning: "warning-alert alert",
        info: "info-alert alert",
      }[variant];
    
  return (
      <div className={variantClass}>{children}</div>

  );
};

export default Alert;
