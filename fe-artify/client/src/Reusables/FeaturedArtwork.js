import React from 'react';
import '../utils/Assets/CSS/FeaturedArtwork.css';
import ProductData from '../utils/Data/ProductData';
import sample1 from '../utils/Assets/Images/sample1.jpeg';
import sample2 from '../utils/Assets/Images/sample2.jpeg';
import sample3 from '../utils/Assets/Images/sample3.jpeg';


const FeaturedArtwork = () => {
  return (
    <div className="featured-artwork-container">
      {ProductData.map((product, index) => (
        <div className="featured-artwork-card" key={index}>
          <div className="featured-main-image">
            <img src={product.productImage} alt={product.productName} />
          </div>
          <div className="featured-side-images">
            <img src={sample1} alt="Sample 1" className="side-image" />
            <img src={sample2} alt="Sample 2" className="side-image" />
            <img src={sample3} alt="Sample 3" className="side-image" />
          </div>
          <div className="featured-details">
            <h3 className="artwork-title">{product.productName}</h3>
            <div className="creator-info">
              <img src={product.creatorImage} alt={product.creatorName} className="creator-avatar" />
              <p className="creator-name">by {product.creatorName}</p>
            </div>
            <div className="total-items">Total 4 Items</div> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedArtwork;
