import React, { useState, useEffect } from 'react';

// Import all the necessary components
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import SchemeCard from '../components/SchemeCard';
import SchemeDetailModal from '../components/SchemeDetailModal';
import './HomePage.css'; // Main CSS for the page layout

const HomePage = ({ schemes, language }) => {
  // State for the modal
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showChecklistFor, setShowChecklistFor] = useState(null);

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // State to hold the schemes that are actually displayed on the page
  const [displayedSchemes, setDisplayedSchemes] = useState(schemes);

  // This `useEffect` hook runs whenever the main schemes, search term, or category changes.
  // It calculates the new list of schemes to display.
  useEffect(() => {
    let filtered = schemes;

    // 1. Filter by Category
    if (selectedCategory && selectedCategory !== 'All') {
      // Find the correct category name (e.g., "Senior Citizen" maps to "Social Security")
      // This mapping logic can be improved later if needed
      const categoryToFilter = selectedCategory === 'Women' ? 'Women & Children' : selectedCategory;
      filtered = filtered.filter(scheme => scheme.category === categoryToFilter);
    }

    // 2. Filter by Search Term
    if (searchTerm) {
      filtered = filtered.filter(scheme =>
        (scheme.name_en && scheme.name_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (scheme.name_hi && scheme.name_hi.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setDisplayedSchemes(filtered);
  }, [searchTerm, selectedCategory, schemes]);


  // --- Handlers for the Scheme Cards ---
  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setShowChecklistFor(null); // Make sure modal opens in detail view
  };

  const handleCreateChecklist = (scheme) => {
    setSelectedScheme(scheme);
    setShowChecklistFor(scheme); // Tell modal to open in checklist view
  };

  const handleApplyNow = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseModal = () => {
    setSelectedScheme(null);
    setShowChecklistFor(null);
  };

  // --- Handlers for Filtering ---
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // You can scroll to the schemes section when a category is clicked
    document.getElementById('all-schemes').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Note: The search term state would be passed to and updated by HeroSection

  return (
    <div className="homepage-container">
      {/* Pass search handlers to HeroSection */}
      <HeroSection 
        language={language}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      {/* Pass category selection handler */}
      <CategorySection 
        language={language}
        onCategorySelect={handleCategorySelect}
      />
      
      {/* This is the main section for displaying scheme cards */}
      <section className="all-schemes-section" id="all-schemes">
        <div className="section-container">
          <h2>
            {selectedCategory === 'All' ? 'All Available Schemes' : `Schemes for ${selectedCategory}`}
          </h2>
          <p className="section-subtitle">
            {displayedSchemes.length} {displayedSchemes.length === 1 ? 'scheme' : 'schemes'} found
          </p>
          <div className="schemes-grid">
            {displayedSchemes.length > 0 ? (
              displayedSchemes.map(scheme => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  language={language}
                  onViewDetails={handleViewDetails}
                  onCreateChecklist={handleCreateChecklist}
                  onApply={handleApplyNow}
                />
              ))
            ) : (
              <p className="no-schemes-found">No schemes found matching your criteria.</p>
            )}
          </div>
        </div>
      </section>

      {/* The modal logic remains the same */}
      <SchemeDetailModal 
        scheme={selectedScheme}
        startInChecklistMode={!!showChecklistFor}
        onClose={handleCloseModal}
        language={language}
      />
    </div>
  );
};

export default HomePage;