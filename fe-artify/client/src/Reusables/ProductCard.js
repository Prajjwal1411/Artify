import React from 'react';
import '../utils/Assets/CSS/ProductCard.css';
import ProductData from '../utils/Data/ProductData';

const ProductCard = () => {
  return (
    <div className="product-card-container">
      {ProductData.map((product) => (
        <div className="product-card" key={product.productName}>
          <img src={product.productImage} alt={product.productName} className="product-image" />
          <div className="product-details">
            <h3 className="product-name">{product.productName}</h3>
            <div className="creator-info">
              <img src={product.creatorImage} alt={product.creatorName} className="creator-image" />
              <p className="creator-name">{product.creatorName}</p>
            </div>
            <div className="price-bid-container">
              <div>
                <p className="product-price">Price</p>
                <p style={{ color: '#00AC4F' }}>{product.price}</p>
              </div>
              <div>
                <p className="product-highest-bid">Highest Bid</p>
                <p style={{ color: '#FAD000' }}>{product.highestBid}</p>
              </div>
            </div>
            <button className="product-button">Place Bid</button> { /* !!! If place bid button element is needed !!!*/}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductCard;
