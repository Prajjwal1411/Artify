import React from 'react';
import '../utils/Assets/CSS/ItemCard.css';
import ProductData from '../utils/Data/ProductData';

const ItemCard = () => {
  return (
    <div className="item-card-wrapper">
      {ProductData.map((product) => (
        <div className="item-card" key={product.productName}>
          <img src={product.productImage} alt={product.productName} className="item-image" />
          <div className="item-details">
            <h3 className="item-title">{product.productName}</h3>
            <div className="author-info">
              <img src={product.creatorImage} alt={product.creatorName} className="author-avatar" />
              <p className="author-name">{product.creatorName}</p>
            </div>
            <div className="pricing-info">
              <div>
                <p style={{ color: '#009C3F' }}>{product.price}</p>
              </div>
              <div>
                <p className="item-quantity">Quantity : 
                {product.quantity}</p>
              </div>
            </div>
            <section className="bottomsec">
            <div className="time-remaining">1h 50m 2s left</div> 
            <button className="bid-button">Submit Bid</button>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemCard;
