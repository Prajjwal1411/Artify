import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../utils/Assets/CSS/Header.css';
import logo from '../utils/Assets/Images/logo.png';
import profileIcon from '../utils/Assets/Images/profile-icon.png'; // Import profile icon image
import { getUser } from '../utils/services/userServices';
import { getSubscriptions } from '../utils/services/subscriptionServices';

const Header = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();

  let userID = localStorage.getItem('userID') || null;

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close menu on link click
  };

  const userType= getUser(userID).then((response)=>{
    if(response.success){
      let subscription=getSubscriptions(response.data.subscriptionID);
      console.log(subscription)
    }
  })
  

  const location = useLocation();
  const isActiveLink = (path) => location.pathname === path;

  return (
    <header className="header">
      <img src={logo} alt="Artify Logo" className="logo" onClick={() => navigate('/')} />
      <div className="vertical-line"></div>
      <nav className={`navigation ${isMenuOpen ? 'show' : ''}`}>
        <ul>
          <li>
            <button
              className={isActiveLink('/') ? 'active' : ''}
              onClick={() => navigate('/')}
            >
              Home
            </button>
          </li>
            <>
          <li>
            <button
              className={isActiveLink('/subscription') ? 'active' : ''}
              onClick={() => navigate('/subscription')}
            >
              Subscription
            </button>
          </li>
          <li>
            <button
              className={isActiveLink('/explore') ? 'active' : ''}
              onClick={() => navigate('/explore')}
            >
              Explore Art
            </button>
          </li>
          <li>
            <button
              className={isActiveLink('/UploadArt') ? 'active' : ''}
              onClick={() => navigate('/UploadArt')}
            >
              Upload Art
            </button>
          </li>
            </>

        </ul>
    </nav>
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
      />
    </div>
      {userID !== null ? (
        <>
          <button
            className="login-button"
            onClick={() => {
              localStorage.removeItem("userID");
              navigate('/login');
            }}
          >
            Logout
          </button>
          <button
            className="profile-button"
            onClick={() => navigate('/profile')}
          >
            <img src={profileIcon} alt="Profile" className="profile-icon" />
          </button>
        </>
      ) : (
        <button className="login-button" onClick={() => navigate('/login')}>
          Login
        </button>
      )}
      <button 
        className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
  </header>
  );
};

export default Header;
