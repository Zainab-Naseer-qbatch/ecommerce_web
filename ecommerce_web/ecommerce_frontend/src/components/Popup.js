import React from "react";
import "../style/popup.css";
export const Popup = ({ message, updatePopup }) => {
  console.log("in popup: ", message);
  const close = () => {
    updatePopup(false);
    console.log("clicked");
  };
  return (
    <div className="popup">
      <button className="text-center" id="close" onClick={close}>
        &times;
      </button>
      <p className="text-center">{message}</p>
    </div>
  );
};
