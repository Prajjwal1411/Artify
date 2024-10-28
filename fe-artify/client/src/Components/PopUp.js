// PopUp.js

import React, { useEffect } from 'react';
import '../utils/Assets/CSS/PopUp.css';

const PopUp = ({ message, onClose, duration = 5000 }) => {
    useEffect(() => {
        // popup will close after 5 seconds
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }, [onClose, duration]);
    
      return (
        <div className="popup-container">
      <div className="popup-content">
        <span className="popup-icon">&#9989;</span>
        <span className="popup-message">{message}</span>
        <span className="close-btn" onClick={onClose}>&times;</span>
      </div>
    </div>
      );
};

export default PopUp;
