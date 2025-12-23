import React from "react";
import "../static/Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="logo">API TESTER</div>
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loader;
