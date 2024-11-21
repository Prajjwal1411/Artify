import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../utils/Assets/CSS/ProductDetails.css';
import ProductCard from '../Reusables/ProductCard';
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
import defaultAvatar from '../utils/Assets/Images/avatar1.png';



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [creator, setCreator] = useState(null);

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
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

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
                    <span className="time-value">12:</span>
                    <span className="timer-label">Hours</span>
                  </div>
                  <div className="time-segment">
                    <span className="time-value">30:</span>
                    <span className="timer-label">Minutes</span>
                  </div>
                  <div className="time-segment">
                    <span className="time-value">50</span>
                    <span className="timer-label">Seconds</span>
                  </div>
                </div>
              </div>

              <div className="bid-input-box">
                <input
                  type="number"
                  className="bid-input"
                  placeholder="Enter your bid"
                />
                <button className="place-bid-button">Place Bid</button>
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
