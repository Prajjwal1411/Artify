import React, { useState, useEffect } from 'react';
import '../utils/Assets/CSS/ProductPage.css'; 
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
import ItemCard from '../Reusables/ItemCard';
import FeaturedArtwork from '../Reusables/FeaturedArtwork';
import { getProducts } from '../utils/services/productServices';
import { getUser } from '../utils/services/userServices';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const currentTime = new Date();

        const productsWithSellers = await Promise.all(
          products.map(async (product) => {
            if (product.sellerID) {
              try {
                const userResponse = await getUser(product.sellerID);
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
         // Filter out expired products
      const validProducts = productsWithSellers.filter((product) => {
      const productAddedDate = new Date(product.productAddedOn);
      const endTime = new Date(productAddedDate.getTime() + 168 * 60 * 60 * 1000); // 96 hours later
      return currentTime < endTime; // Only include products where time has not expired
     });
        setProducts(productsWithSellers);
        setFilteredProducts(productsWithSellers); // Initial display
        setProducts(validProducts);
        setFilteredProducts(validProducts); 
      } catch (err) {
        setError('An error occurred while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search functionality
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    const searchedProducts = products.filter(
      (product) =>
        product.productName && product.productName.toLowerCase().includes(query)
    );
    setFilteredProducts(searchedProducts);
  };

  // Handle sort functionality
  const handleSortChange = (event) => {
    const value = event.target.value;
    let sortedProducts = [...filteredProducts];

    if (value === 'name-asc') {
      sortedProducts.sort((a, b) => (a.productName || '').localeCompare(b.productName || ''));
    } else if (value === 'name-desc') {
      sortedProducts.sort((a, b) => (b.productName || '').localeCompare(a.productName || ''));
    }

    setFilteredProducts(sortedProducts);
  };

  // Handle filter by category
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const filteredByCategory = products.filter(
      (product) =>
        !category || (product.categoryID && product.categoryID === category)
    );
    setFilteredProducts(filteredByCategory);
  };

  // Get newest products
  const getNewestProducts = () => {
    return products
      .slice()
      .sort((a, b) => new Date(b.productAddedOn) - new Date(a.productAddedOn))
      .slice(0, 4);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-page">
      <Header />
      <section className="main-banner">
        <h1 className="heading">Browse The Marketplace</h1>
        <p className="browse-para">Browse through more than 100+ artworks on the Marketplace.</p>
        <input
          type="text"
          className="main-search"
          placeholder="Search your favourite type of art"
          onChange={handleSearchChange}
        />
        <select onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </section>

      <section className="explore-categories">
        <h2 className="subheadings">Explore Artworks</h2>
        <select onChange={handleCategoryChange}>
          <option value="">Filter by Category</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
        </select>
        <div className="category-grid">
          <ItemCard products={filteredProducts} />
        </div>
      </section>

      <section className="featured-artwork">
        <h2 className="subheadings">Featured Artwork</h2>
        <div className="artwork-grid">
          <FeaturedArtwork
            image="default-image.jpg"
            title="Artwork Title"
            onClick={() => console.log('Card Clicked')}
          />
        </div>
      </section>

      <section className="trending-collection">
        <h2 className="subheadings">Trending Collection</h2>
        <div className="category-grid">
          <ItemCard products={getNewestProducts()} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductPage;
