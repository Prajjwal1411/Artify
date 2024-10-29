import React from 'react';
import '../utils/Assets/CSS/HomePage.css';
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
import liveauction from '../utils/Assets/Images/liveauction.png';
import auction from '../utils/Assets/Images/auction.png';
import variety from '../utils/Assets/Images/variety.png';
import sneakpeeksvg from '../utils/Assets/Images/sneakpeek.svg';

function HomePage() {
  return (
    <div className="homepage-container">
      <Header />

      <section className="intro-section">
        <div className="intro-text">
          <h1 className="intro-heading">
            Discover Digital<br />
            Art & Collect<br />
            Artwork
          </h1>
          <p className="intro-subtext">
            Artwork marketplace: Collect, buy, and bid on art from more<br />
            than 35k artists.
          </p>
          <div className="button-container">
            <button className="get-started-button">Get Started</button>
          </div>

          <div className="statistics-section">
            <div className="statistic-item">
              <span className="statistic-number">250k+</span> <br />
              <span className="statistic-title">Artworks</span>
            </div>
            <div className="statistic-item">
              <span className="statistic-number">15k+</span> <br />
              <span className="statistic-title">Auctions</span>
            </div>
            <div className="statistic-item">
              <span className="statistic-number">35k+</span> <br />
              <span className="statistic-title">Artists</span>
            </div>
          </div>
        </div>

        <div className="intro-image">
          <img src={liveauction} alt="liveauctionimage" />
        </div>
      </section>

      <div className="join-a-world">
  <h2 className="join-heading">Join a world of <br /> Artwork Trading!</h2>
  <div className="right-content">
    <div className="item">
      <h3 className="fast-bidding">
        <img src={auction} alt="auction" className="icon-image" /> Fast Bidding
      </h3>
      <p className="additional-info">Lightning Fast Bidding and Totally safe payments <br /> and easy to use service.</p>
    </div>
    <div className="item">
      <h3 className="variety-artpieces">
        <img src={variety} alt="variety" className="icon-image" /> Variety of Art-Pieces
      </h3>
      <p className="additional-info">Find one of the best pieces of artworks by <br /> talented artists using our services.</p>
    </div>
  </div>
</div>

<div className="sneak-peek-into-our-world">
        <h2 className="sneak-peek-heading">Sneak Peek into our world!</h2>
        <img src={sneakpeeksvg} alt="Sneak Peek SVG" className="sneak-peek-svg" />
      </div>

      <div className="join-top-creators">
  <div>
    <h2 className="creators-heading">Join Our Top Creators Today!</h2>
    <p className="creators-paragraph">
      Unlock your creative potential and join our top creators today — inspire, connect, and make your mark in the art community!
    </p>
  </div>
  <button className="join-today-button">🚀 Join Today</button>
</div>

<div className="artist-card-section">
  <img 
    src={require('../utils/Assets/Images/ArtistCardGrid.svg').default} 
    alt="Artist Card Grid" 
    className="artist-card-image" 
  />
</div>
<div className="create-bid-section">
  <img 
    src={require('../utils/Assets/Images/CreateSetBid.svg').default} 
    alt="create-set-bid-artworks" 
    className="bid-svg" 
  />

  <div className="bid-content">
    <h2 className="bid-heading">Create and set a bid <br /> for your ART.</h2>
    <p className="bid-paragraph">
      Creating and setting a bid for your art allows you to showcase your artwork and invite potential buyers to place offers. Set a minimum bid price that reflects the value of your work while considering market demand. Define clear bidding terms, such as the duration and any reserve price, to ensure transparency.
    </p>
    <button className="sign-up-button">Sign Up Now</button>
  </div>
</div>

<div className="how-it-works-section">
  <h2 className="how-it-works-heading">How it works?</h2>
  <img 
    src={require('../utils/Assets/Images/HowItWorksCardGrid.svg').default} 
    alt="How It Works Card Grid" 
    className="how-it-works-svg" 
  />
</div>


      <Footer />
    </div>
  );
}

export default HomePage;
