import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import '../utils/Assets/CSS/Header.css'; 
import logo from '../utils/Assets/Images/logo.png';


const Header = () => {
  const [activeLink, setActiveLink] = useState('Home');

  const navigate = useNavigate();

  let userID=localStorage.getItem('userID') || null;
  console.log(userID)
  const handleLinkClick = (link) => {
    setActiveLink(link)
  };

  return (

    userID!==null ? 
    <header className="header">
      <img src={logo} alt="Artify Logo" className="logo" onClick={()=>{navigate('/')}}/>
      <div className="vertical-line"></div>
      <nav className="navigation">
        <ul>
          <li>
            <a 
              href="#home" 
              className={activeLink === 'Home' ? 'active' : ''} 
              onClick={() => handleLinkClick('/')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/subscription" 
              className={activeLink === 'Subscription' ? 'active' : ''} 
              onClick={() => handleLinkClick('/subscription')}
            >
              Subscription
            </a>
          </li>
          <li>
            <a 
              href="/explore" 
              className={activeLink === 'Explore Art' ? 'active' : ''} 
              onClick={() => handleLinkClick('/explore')}
            >
              Explore Art
            </a>
          </li>
          <li>
            <a 
              href="/UploadArt" 
              className={activeLink === 'Upload Art' ? 'active' : ''} 
              onClick={() => handleLinkClick('/UploadArt')}
            >
              Upload Art
            </a>
          </li>
          <li>
            <a 
              href="test-popup" 
              className={activeLink === 'test-popup' ? 'active' : ''} 
              onClick={() => handleLinkClick('test-popup')}
            >
              Test Popup
            </a>
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

    :
    <header className="header">
    <img src={logo} alt="Artify Logo" className="logo" onClick={()=>{navigate('/')}}/>
    <div className="vertical-line"></div>
    <nav className="navigation">
      <ul>
        <li>
          <a 
            href="#home" 
            className={activeLink === 'Home' ? 'active' : ''} 
            onClick={() => handleLinkClick('/')}
          >
            Home
          </a>
        </li>
        <li>
            <a 
              href="/subscription" 
              className={activeLink === 'Subscription' ? 'active' : ''} 
              onClick={() => handleLinkClick('/subscription')}
            >
              Subscription
            </a>
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
