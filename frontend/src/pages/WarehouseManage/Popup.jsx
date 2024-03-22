// Popup.jsx
import React from "react";

function Popup({ item, onClose }) {
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Expiry Notification</h2>
                <h2>{` ${item.name} is near its expiry date!`}</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Popup;
