import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../utils/Assets/CSS/Header.css';
import logo from '../utils/Assets/Images/logo.png';

const Header = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const navigate = useNavigate();


  let userID=localStorage.getItem('userID') || null;
  const handleLinkClick = (link) => {
    setActiveLink(link)
  };

  const location = useLocation();

  const isActiveLink = (path) => location.pathname === path;


  return (

    userID!==null ? 
    <header className="header">
      <img src={logo} alt="Artify Logo" className="logo" onClick={() => navigate('/')} />
      <div className="vertical-line"></div>
      <nav className="navigation">
        <ul>
          <li>
            <button
              className={isActiveLink('/') ? 'active' : ''}
              onClick={() => navigate('/')}
            >
              Home
            </button>
          </li>
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
          <li>
            <button
              className={isActiveLink('/test-popup') ? 'active' : ''}
              onClick={() => navigate('/test-popup')}
            >
              Test Popup
            </button>
          </li>
        </ul>
      </nav>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
        />
      </div>
      <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>
    </header>

    :
    <header className="header">
    <img src={logo} alt="Artify Logo" className="logo" onClick={()=>{navigate('/')}}/>
    <div className="vertical-line"></div>
    <nav className="navigation">
    <ul>
          <li>
            <button
              className={isActiveLink('/') ? 'active' : ''}
              onClick={() => navigate('/')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={isActiveLink('/subscription') ? 'active' : ''}
              onClick={() => navigate('/subscription')}
            >
              Subscription
            </button>
          </li>
        </ul>
    </nav>
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
      />
    </div>
    <button className="login-button" onClick={()=>{navigate('/login')}}>Login</button>
  </header>
  );
};

export default Header;
