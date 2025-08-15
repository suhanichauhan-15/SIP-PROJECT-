import React from 'react';
import './HeroSection.css';
// import StatIcon1 from '../assets/icons/schemes.svg';
// import StatIcon2 from '../assets/icons/citizens.svg';
// import StatIcon3 from '../assets/icons/success.svg';

const HeroSection = ({ language }) => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1>{language === 'hi' ? 'सरकारी लाभों के लिए आपका गाइड' : 'Your Guide to Government Benefits'}</h1>
        <p>{language === 'hi' ? 'अपने लिए योग्य सरकारी योजनाओं की खोज करें। सरल, स्वच्छ और सभी के लिए सुलभ।' : 'Discover government schemes you\'re eligible for. Simple, clean, and accessible for everyone.'}</p>
        
        <div className="hero-search-container">
          <input type="text" placeholder={language === 'hi' ? 'योजना खोजें (उदा. किसान, शिक्षा)' : 'Search for schemes (e.g., \'farmer\', \'education\', \'health\')'} />
          <button>{language === 'hi' ? 'खोजें' : 'Search Schemes'}</button>
        </div>

        <button className="eligibility-check-btn">{language === 'hi' ? 'मेरी पात्रता जांचें' : 'Check My Eligibility'}</button>

        
          
          
      
      </div>
    </section>
  );
};

export default HeroSection;