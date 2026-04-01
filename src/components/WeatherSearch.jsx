import React, { useState } from 'react';

/**
 * WeatherSearch Component
 * Handles city input and search submission
 */
export default function WeatherSearch({ onSearch, isLoading }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    onSearch(city.trim());
    setCity('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <label className="search-label">Enter city:</label>
        <div className="search-input-group">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="London"
            className="search-input"
            disabled={isLoading}
            aria-label="City search input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading}
            aria-label="Search button"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
