import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../utils/Assets/CSS/ReusableCard.css';

const ReusableCard = ({ index, subscription }) => {
  const navigate = useNavigate();

  // Define card background based on the index
  const cardClass = (index === 0) ? 'platinum-card' :
                    (index === 1) ? 'gold-card' :
                    (index === 2) ? 'silver-card' : '';

  const handlePlanSelect = () => {
    // Navigate to PaymentPage and pass subscription details
    navigate('/payments', { state: { subscription } });
  };

  return (
    <div className={`subscription-card ${cardClass}`}>
      {index === 0 && <div className="popular-choice-banner">Popular Plan</div>}
      <h2>{subscription.subscriptionType}</h2>
      <h3 className="price">${subscription.subscriptionPrice} / month</h3>
      <hr className="divider" />
      <h4 className='highlight'>Highlighted Features</h4>
      <ul className="feature">
        {subscription.features && subscription.features.length > 0 ? (
          subscription.features.map((feature, index) => <li key={index}>{feature}</li>)
        ) : (
          <li>No features available</li>
        )}
      </ul>
      <button className="select-plan-btn" onClick={handlePlanSelect}>Select Plan</button>
    </div>
  );
};

export default ReusableCard;
