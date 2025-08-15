import React, { useState } from 'react';
import './EligibilityChecker.css';

// Define the questions for the checker
const questions = [
  {
    id: 'role',
    text_en: 'Who are you?',
    text_hi: 'आप कौन हैं?',
    options: ['Farmer', 'Student', 'Woman', 'Senior Citizen', 'Business Owner'],
    options_hi: ['किसान', 'छात्र', 'महिला', 'वरिष्ठ नागरिक', 'व्यापारी']
  },
  {
    id: 'income',
    text_en: 'What is your approximate annual family income?',
    text_hi: 'आपकी अनुमानित वार्षिक पारिवारिक आय क्या है?',
    options: ['Less than 1 Lakh', '1 to 2.5 Lakhs', 'More than 2.5 Lakhs'],
    options_hi: ['1 लाख से कम', '1 से 2.5 लाख', '2.5 लाख से अधिक']
  }
];

const EligibilityChecker = ({ schemes, onResults, language }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Last question answered, calculate results
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    // This is the primary filtering logic based on the user's role.
    const recommended = schemes.filter(scheme => {
      if (!finalAnswers.role) return false;

      // *** THIS IS THE CORRECTED PART ***
      // This mapping now exactly matches the categories in your JSON data.
      const roleToCategory = {
          'Farmer': 'Farmer',
          'Student': 'Youth & Students',
          'Woman': 'Women & Children',
          'Senior Citizen': 'Social Security & Pension',
          'Business Owner': 'MSME & Entrepreneurs'
      };

      const expectedCategory = roleToCategory[finalAnswers.role];
      return scheme.category === expectedCategory;
    });

    onResults(recommended); // Pass results back to the parent component
    setShowResults(true);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
    onResults(null); // Signal to the parent to clear recommendations and show the checker again
  };
  
  const getText = (en, hi) => (language === 'hi' ? hi : en);

  // This part renders a confirmation message once the checker is complete.
  // The actual results are displayed by the parent component.
  if (showResults) {
    return (
      <div className="checker-container results-container">
        <h3>{getText('Recommendations For You', 'आपके लिए सुझाव')}</h3>
        <p>{getText('Based on your answers, you may be eligible for the schemes below. Scroll down to see them.', 'आपके उत्तरों के आधार पर, आप नीचे दी गई योजनाओं के लिए पात्र हो सकते हैं। उन्हें देखने के लिए नीचे स्क्रॉल करें।')}</p>
        <button onClick={handleReset} className="reset-button">
          {getText('Start Over', 'फिर से शुरू करें')}
        </button>
      </div>
    );
  }

  // This part renders the questions one by one.
  const currentQuestion = questions[step];

  return (
    <div className="checker-container">
      <h3>{getText(currentQuestion.text_en, currentQuestion.text_hi)}</h3>
      <div className="options-grid">
        {(language === 'hi' ? currentQuestion.options_hi : currentQuestion.options).map((option, index) => (
          <button 
            key={option} 
            className="option-button"
            // The answer sent is the English version, which is used as the key in roleToCategory
            onClick={() => handleAnswer(currentQuestion.id, currentQuestion.options[index])}
          >
            {option}
          </button>
        ))}
      </div>
      {step > 0 && (
         <button onClick={() => setStep(step - 1)} className="back-button small">
            {getText('Back', 'वापस')}
        </button>
      )}
    </div>
  );
};

export default EligibilityChecker;