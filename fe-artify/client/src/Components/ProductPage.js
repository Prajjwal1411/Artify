import React from 'react';
import '../utils/Assets/CSS/ProductPage.css'; 
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
import ProductCard from '../Reusables/ProductCard';
import ItemCard from '../Reusables/ItemCard';
import FeaturedArtwork from '../Reusables/FeaturedArtwork';


const ProductPage = () => {
  return (
    <div className="product-page">
      <Header/>
      <section className="main-banner">
        <h1 className='heading'>Browse The Marketplace</h1>
        <p className='browse-para'>Browse through more than 100+ artworks on the Marketplace.</p>
        <input type="text" className="main-search" placeholder="Search your favourite type of art" />
      </section>

      <section className="featured-artwork">
      <h2 className='subheadings'>Featured Artwork</h2>
        <div className="artwork-grid">
        <FeaturedArtwork 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
        </div>
      </section>

      <section className="explore-categories">
        <h2 className='subheadings'>Explore Artworks</h2>
        <div className="category-grid">
        <ItemCard 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
          <ItemCard 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
            <ItemCard 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
          <ItemCard 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
          
        </div>
        <button className="more-artworks-btn">More Artworks</button>
      </section>

      <section className="trending-collection">
      <h2 className='subheadings'>Trending Collection</h2>
      <p className='browse-para'>Checkout our weekly updated trending collection.</p>
        <div className="collection-grid">
        <ItemCard 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
          <ItemCard 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
            <ItemCard 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
          <ItemCard 
            image="default-image.jpg" 
            title="Artwork Title"   
            onClick={() => console.log("Card Clicked")}
          />
          
        </div>
        <button className="more-collections-btn">More Collections</button>
      </section>

      <Footer/>
    </div>
  );
};

export default ProductPage;
