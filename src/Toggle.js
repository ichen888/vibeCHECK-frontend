// Toggle.js
import React from "react";

function Toggle({ useDummyData, toggleLiveData }) {
  return (
    <div className="toggle-container">
      <button
        onClick={toggleLiveData}
        style={{
          backgroundColor: useDummyData ? "red" : "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {useDummyData ? "Switch to Live Data" : "Switch to Dummy Data"}
      </button>
    </div>
  );
}

export default Toggle;
