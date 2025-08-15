import React from 'react';
import './SchemeCard.css';

const SchemeCard = ({ scheme, language, onViewDetails, onCreateChecklist, onApply }) => {
  // DESTRUCTURED PROPS: All properties are now pulled from the 'scheme' object.
  // This prevents the "not defined" error and makes the code cleaner.
  const {
    name_en, name_hi,
    summary_en, summary_hi,
    benefits_en, benefits_hi,
    category,
    documents,
    officialLink
  } = scheme;

  // Now we can use the variables directly without the 'scheme.' prefix
  const name = language === 'hi' ? name_hi : name_en;
  const summary = language === 'hi' ? summary_hi : summary_en;
  const benefit = language === 'hi' ? benefits_hi : benefits_en;

  return (
    <div className="scheme-card-new">
      <div className="card-header">
        <span className="card-category-tag">{category}</span>
      </div>

      <h3 className="card-title">{name}</h3>
      <p className="card-summary">{summary}</p>
      
      <div className="card-section">
        <span className="section-title">Eligibility</span>
        {/* Using benefit here which correctly points to benefits_en or benefits_hi */}
        <p className="section-content">{benefit}</p>
      </div>

      <div className="card-section">
        <span className="section-title">Documents Required</span>
        <div className="docs-tags">
          {documents.slice(0, 3).map(doc => <span key={doc} className="doc-tag">{doc}</span>)}
          {documents.length > 3 && <span className="doc-tag more-tag">+{documents.length - 3} more</span>}
        </div>
      </div>
      
      <div className="card-actions">
        <button className="action-btn btn-details" onClick={() => onViewDetails(scheme)}>View Details</button>
        <button className="action-btn btn-checklist" onClick={() => onCreateChecklist(scheme)}>Create Checklist</button>
        {/* Pass the officialLink directly */}
        <button className="action-btn btn-apply" onClick={() => onApply(officialLink)}>Apply Now</button>
      </div>
    </div>
  );
};

export default SchemeCard;