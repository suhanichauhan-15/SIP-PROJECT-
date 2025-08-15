import React from 'react';
import './Header.css';
// import Logo from '../assets/logo.png'; // Assuming you have a logo image

const Header = ({ language, toggleLanguage }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          {/* <img src={Logo} alt="Jan Sahayak Logo" className="logo-img" /> */}
          <span className="logo-text">Jan Sahayak</span>
        </div>
        <nav className="main-nav">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#eligibility" className="nav-link">Eligibility Check</a>
          <a href="#about" className="nav-link">About</a>
        </nav>
        <div className="language-toggle">
          <span>English</span>
          <label className="switch">
            <input type="checkbox" checked={language === 'hi'} onChange={toggleLanguage} />
            <span className="slider round"></span>
          </label>
          <span>हिन्दी</span>
        </div>
      </div>
    </header>
  );
};

export default Header;