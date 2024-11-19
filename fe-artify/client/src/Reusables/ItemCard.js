import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../utils/Assets/CSS/ItemCard.css';
import { getProducts } from '../utils/services/productServices';
import { getUser } from '../utils/services/userServices';

const ItemCard = () => {
  const [products, setProducts] = useState([]); // State to store products with seller details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products and their seller details
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await getProducts();
        if (!productResponse.data.success) {
          throw new Error('Failed to fetch products.');
        }

        const products = productResponse.data.data;

        // Fetch seller details for each product
        const productsWithSellers = await Promise.all(
          products.map(async (product) => {
            if (product.sellerID) {
              try {
                const userResponse = await getUser( product.sellerID);
                if (userResponse.data.success) {
                  return {
                    ...product,
                    sellerDetails: userResponse.data.data, // Add seller details to the product
                  };
                }
              } catch (err) {
                console.error(`Failed to fetch seller for product ${product._id}`, err);
              }
            }
            return { ...product, sellerDetails: null }; // Default if no seller
          })
        );

        setProducts(productsWithSellers);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('An error occurred while fetching products.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  // Show a loader or error message while data is being fetched
  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render products
  return (
    <div className="item-card-wrapper">
      {products.map((product) => (
        <div className="item-card" key={product._id}>
          <img
            src={product.productImage}
            alt={product.productName}
            className="item-image"
          />
          <div className="item-details">
            <h3 className="item-title">{product.productName}</h3>
            <div className="author-info">
              {/* Display seller information */}
              {product.sellerDetails ? (
                <>
                  <img
                    src={product.sellerDetails.profilePicture || '/default-avatar.png'}
                    alt={product.sellerDetails.firstName}
                    className="author-avatar"
                  />
                  <p className="author-name">{product.sellerDetails.firstName + " " + product.sellerDetails.lastName}</p>
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
              <div>
                <p style={{ color: '#009C3F' }}>
                  Starting Bid: {product.startingBid}
                </p>
                {product.highestBid && (
                  <p style={{ color: '#FF0000' }}>
                    Highest Bid: {product.highestBid}
                  </p>
                )}
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
