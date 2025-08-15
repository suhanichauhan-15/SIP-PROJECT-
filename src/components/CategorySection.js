import React from 'react';
import './CategorySection.css';

// In a real project, you would import SVG files like this:
// import FarmerIcon from '../assets/icons/farmer.svg';

// --- UPDATED CATEGORIES ARRAY ---
// Each object now has:
// 1. name_en/name_hi: For display purposes.
// 2. filterKey: The exact category name from your JSON data, used for filtering.
const categories = [
  { name_en: 'Farmers', name_hi: 'किसान', desc_en: 'Agricultural support', desc_hi: 'कृषि सहायता', filterKey: 'Farmer', icon: '🧑‍🌾' },
  { name_en: 'Students', name_hi: 'छात्र', desc_en: 'Education & scholarships', desc_hi: 'शिक्षा और छात्रवृत्ति', filterKey: 'Youth & Students', icon: '🎓' },
  { name_en: 'Health', name_hi: 'स्वास्थ्य', desc_en: 'Healthcare & assistance', desc_hi: 'स्वास्थ्य सेवा और सहायता', filterKey: 'Health', icon: '❤️' },
  { name_en: 'Housing', name_hi: 'आवास', desc_en: 'Home and shelter programs', desc_hi: 'घर और आश्रय कार्यक्रम', filterKey: 'Housing', icon: '🏠' },
  { name_en: 'Women', name_hi: 'महिला', desc_en: 'Empowerment schemes', desc_hi: 'महिला सशक्तिकरण योजनाएं', filterKey: 'Women & Children', icon: '👩' },
  { name_en: 'Senior Citizen', name_hi: 'वरिष्ठ नागरिक', desc_en: 'Care and pension', desc_hi: 'देखभाल और पेंशन', filterKey: 'Social Security & Pension', icon: '👴' },
  { name_en: 'Business', name_hi: 'व्यापार', desc_en: 'Entrepreneurship & loans', desc_hi: 'उद्यमिता और ऋण', filterKey: 'MSME & Entrepreneurs', icon: '💼' }
];

// The component now also accepts 'currentCategory' to highlight the active button
const CategorySection = ({ onCategorySelect, language, currentCategory }) => {
  
  // Helper function to handle language switching
  const getText = (en, hi) => (language === 'hi' ? hi : en);

  return (
    <section className="category-section" id="categories">
      <div className="section-container">
        <h2>{getText('Browse by Category', 'श्रेणी के अनुसार ब्राउज़ करें')}</h2>
        <p className="section-subtitle">{getText('Find schemes tailored to your needs', 'अपनी आवश्यकताओं के अनुरूप योजनाएं खोजें')}</p>
        <div className="category-grid">

          {/* --- ADDED "ALL SCHEMES" BUTTON --- */}
          {/* This gives users a way to clear the filter and see everything. */}
          <div 
            key="all-schemes" 
            className={`category-card ${currentCategory === 'All' ? 'active' : ''}`}
            onClick={() => onCategorySelect('All')}
          >
            <div className="category-icon">🌐</div>
            <h3>{getText('All Schemes', 'सभी योजनाएं')}</h3>
            <p>{getText('View all available schemes', 'सभी उपलब्ध योजनाएं देखें')}</p>
          </div>

          {categories.map(category => (
            <div 
              key={category.filterKey} 
              // Applies an 'active' class for styling the selected category
              className={`category-card ${currentCategory === category.filterKey ? 'active' : ''}`}
              
              // --- CRUCIAL CHANGE HERE ---
              // It now passes the correct 'filterKey' to the parent component
              onClick={() => onCategorySelect(category.filterKey)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{getText(category.name_en, category.name_hi)}</h3>
              <p>{getText(category.desc_en, category.desc_hi)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default CategorySection;