
import React, { useState } from 'react';
import PopUp from './PopUp';

function Popuptest() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpen = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Show Popup</button>
      {showPopup && (
        <PopUp
          message="Bid Confirmed. Thank You."
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default Popuptest;
