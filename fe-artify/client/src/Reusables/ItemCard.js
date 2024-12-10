import React from 'react';
import { Link } from 'react-router-dom';
import '../utils/Assets/CSS/ItemCard.css';

const ItemCard = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  // Function to calculate the remaining time
  const getRemainingTime = (addedTime) => {
    const productAddedDate = new Date(addedTime); // parse productAddedOn time
    const endTime = new Date(productAddedDate.getTime() + 168 * 60 * 60 * 1000); // 168 hours later
    const currentTime = new Date();
    const timeDiff = endTime - currentTime; // remaining time in milliseconds

    if (timeDiff <= 0) return 'Time is up';

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s left`;
  };

  return (
    <div className="item-card-wrapper">
      {products.map((product) => (
        <Link to={`/productdetails/${product._id}`} className="item-card" key={product._id}>
          <img
            src={product.productImage}
            alt={product.productName}
            className="item-image"
          />
          <div className="item-details">
            <h3 className="item-title">{product.productName}</h3>
            <div className="author-info">
              {product.sellerDetails ? (
                <>
                  <img
                    src={product.sellerDetails.profilePicture || '/default-avatar.png'}
                    alt={product.sellerDetails.firstName}
                    className="author-avatar"
                  />
                  <p className="author-name">
                    {product.sellerDetails.firstName} {product.sellerDetails.lastName}
                  </p>
                </>
              ) : (
                <>
                  <img
                    src="/default-avatar.png"
                    alt="Unknown Seller"
                    className="author-avatar"
                  />
                  <p className="author-name">Unknown Seller</p>
                </>
              )}
            </div>
            <div className="pricing-info">
              <p style={{ color: '#009C3F' }}>Starting Bid: {product.startingBid}</p>
              {product.highestBid && (
                <p style={{ color: '#FF0000' }}>Highest Bid: {product.highestBid}</p>
              )}
            </div>
            <section className="bottomsec">
              <div className="time-remaining">{getRemainingTime(product.productAddedOn)}</div>
              <button className="bid-button">Submit Bid</button>
            </section>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemCard;
