import React from 'react';
import './SchemeDetailModal.css';

const SchemeDetailModal = ({ scheme, onClose, language }) => {
  if (!scheme) {
    return null;
  }

  // Helper to get text in the selected language
  const getText = (en, hi) => (language === 'hi' ? hi : en);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        
        <h2 className="modal-title">{getText(scheme.name_en, scheme.name_hi)}</h2>
        <p className="modal-summary">{getText(scheme.summary_en, scheme.summary_hi)}</p>

        <div className="modal-section">
          <h3>{getText('Key Benefits', 'मुख्य लाभ')}</h3>
          <p>{getText(scheme.benefits_en, scheme.benefits_hi)}</p>
        </div>

        <div className="modal-section">
          <h3>{getText('Who is Eligible?', 'कौन पात्र है?')}</h3>
          <p>{getText(scheme.eligibility_en, scheme.eligibility_hi)}</p>
        </div>

        <div className="modal-section">
          <h3>{getText('Documents Needed', 'आवश्यक दस्तावेज़')}</h3>
          <ul>
            {scheme.documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
        
        <a 
          href={scheme.officialLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="official-link-button"
        >
          {getText('Apply on Official Website', 'आधिकारिक वेबसाइट पर आवेदन करें')}
        </a>
      </div>
    </div>
  );
};

export default SchemeDetailModal;