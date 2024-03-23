// Popup.jsx
import React from "react";

function Popup({ item, onClose }) {
    return (
        <div className="popup-inner" style={{ fontSize: "16px" }}>
            <h5>Expiry Notification</h5>
            <h5>{` ${item.name} is near its expiry date!`}</h5>
            <button style={{ color: "white" }} onClick={onClose}>Close</button>
        </div>
    );
}

export default Popup;
