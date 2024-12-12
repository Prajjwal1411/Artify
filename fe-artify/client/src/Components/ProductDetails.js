import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../utils/Assets/CSS/ProductDetails.css';
import ProductCard from '../Reusables/ProductCard';
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
import defaultAvatar from '../utils/Assets/Images/avatar1.png';
import bidPopupImage from '../utils/Assets/Images/bidpopup.png';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [creator, setCreator] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // Time remaining in milliseconds
  const [bidAmount, setBidAmount] = useState(''); // Bid amount input
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.product);
          setCreator({
            username: data.product.creatorName,
            avatar: data.product.creatorProfilePic,
          });

          const productAddedDate = new Date(data.product.productAddedOn);
          const endTime = new Date(productAddedDate.getTime() + 168 * 60 * 60 * 1000); // 168 hours later
          setTimeLeft(Math.max(endTime - Date.now(), 0)); // Calculate the time left in milliseconds
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Timer logic for calculating remaining time
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0)); // Decrease by 1 second (1000 ms)

      if (timeLeft <= 1000) {
        clearInterval(interval); // Clear the interval when the time is up
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [timeLeft]);

  const getRemainingTime = (timeLeft) => {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s left`;
  };

  const handleBidSubmit = () => {
    if (parseFloat(bidAmount) <= product.startingBid) {
      alert('Bid amount must be greater than the starting bid!');
      return;
    }

    // Show the popup
    setShowPopup(true);

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-page-container">
      <Header />
      <div className="product-page-main">
        {/* Product Image Section */}
        <div className="product-image-container">
          <img
            src={product.productImage}
            alt={product.productName}
            className="product-details-image"
          />
        </div>

        {/* Product Details Section */}
        <div className="product-details-page">
          <div className="product-details-content">
            <div className="product-main-content">
              <h2 className="product-details-title">{product.productName}</h2>
              <p className="product-details-creation-date">
                Created on: {new Date(product.productAddedOn).toLocaleDateString()}
              </p>
              <p className="product-details-created-by">
                Created by: <span className="product-details-creator-name">
                  {creator?.username || 'Unknown Creator'}
                </span>
              </p>

              {/* Creator Profile */}
              <div className="product-details-creator-info">
                <img
                  src={creator?.avatar || defaultAvatar}
                  alt="Creator Profile"
                  className="product-details-creator-pic"
                />
                <span className="product-details-creator-name-text">
                  {creator?.username || 'Unknown'}
                </span>
              </div>

              {/* Starting Bid */}
              <h3 className="product-details-starting-bid-title">
                Starting Bid
                <p className="product-details-starting-bid">{product.startingBid} USD</p>
              </h3>

              {/* Description */}
              <h3 className="product-details-description-title">Description</h3>
              <p className="product-details-description">{product.description}</p>

              {/* Full-Size Image Link */}
              <h3 className="product-details-fullsize-title">Details</h3>
              <a
                href={product.productImage}
                target="_blank"
                rel="noopener noreferrer"
                className="product-details-fullsize-link"
              >
                View Full Image
              </a>

              {/* Tags */}
              <h3 className="product-details-tags-title">Tags</h3>
              <div className="product-details-tags-container">
                {product.tags?.map((tag, index) => (
                  <button key={index} className="product-details-tag-button">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Aside Section */}
            <aside className="product-details-aside">
              <div className="auction-timer-box">
                <h3>Auction Ends in</h3>
                <div className="auction-timer">
                  <div className="time-segment">
                    <span className="time-value">{getRemainingTime(timeLeft)}</span>
                    <span className="timer-label">Time Left</span>
                  </div>
                </div>
              </div>

              {/* Bid Input Section */}
              <div className="bid-input-box">
                <input
                  type="number"
                  className="bid-input"
                  placeholder="Enter your bid"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <button className="place-bid-button" onClick={handleBidSubmit}>
                  Place Bid
                </button>

                {/* Bid Popup Image */}
                {showPopup && (
                  <div className="bid-popup">
                    <img src={bidPopupImage} alt="Bid Popup" className="bid-popup-image" />
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Explore More Artwork Section */}
          <div className="explore-more-container">
            <h2 className="product-details-explore-title">
              Explore More Artwork
              <button className="product-details-view-more-button">→ View More</button>
            </h2>

            <div className="product-card-grid">
              {[...Array(3)].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
