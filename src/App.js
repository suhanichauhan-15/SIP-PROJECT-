import React, { useState, useEffect } from 'react';
import { fetchAllSchemes } from './services/api';

// Correct: Importing default exports without curly braces {}
import Header from './components/Header';
import HomePage from './pages/HomePage';

import './App.css';

function App() {
  const [schemes, setSchemes] = useState([]);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSchemes = async () => {
      try {
        setLoading(true);
        const data = await fetchAllSchemes();
        setSchemes(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch schemes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSchemes();
  }, []);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'hi' : 'en'));
  };

  return (
    <div className="App">
      <Header language={language} toggleLanguage={toggleLanguage} />
      <main>
        {loading && <p className="loading-message">Loading schemes...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <HomePage schemes={schemes} language={language} />
        )}
      </main>
    </div>
  );
}

export default App;