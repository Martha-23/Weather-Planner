import React, { useState, useEffect } from 'react';
import WeatherSearch from './components/WeatherSearch';
import CurrentWeather from './components/CurrentWeather';
import WeatherChart from './components/WeatherChart';
import ForecastTable from './components/ForecastTable';
import InsightGenerator from './components/InsightGenerator';
import { fetchWeather, processForecast, getCurrentWeather } from './utils/weatherApi';
import { generateInsights } from './utils/insightGenerator';
import './styles/App.css';

/**
 * Main App Component
 * Orchestrates all weather app functionality
 */
export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    setIsLoading(true);
    setError('');
    setCurrentWeather(null);
    setForecastData(null);
    setInsights([]);

    try {
      // Fetch weather data
      const data = await fetchWeather(city);
      
      // Get current weather (pass city name for Open-Meteo format)
      const current = getCurrentWeather(data, data.city.name);
      setCurrentWeather(current);
      
      // Process forecast data
      const forecast = processForecast(data);
      setForecastData(forecast);
      
      // Generate insights
      const { insights: generatedInsights } = generateInsights(forecast, current);
      setInsights(generatedInsights);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load London on component mount
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="app-container">
      <h2 className="weather-planner-title">Weather Planner</h2>

      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🌤️</span>
            Weather Trend Planner
          </h1>
          <p className="app-subtitle">Plan your outdoor activities based on weather forecasts</p>
        </div>
      </header>

      <main className="app-main">
        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="error-container">
            <div className="error-box">
              <span className="error-icon">❌</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading weather data...</p>
            </div>
          </div>
        )}

        {!isLoading && currentWeather && (
          <div className="weather-content">
            <CurrentWeather weather={currentWeather} />
            
            {forecastData && forecastData.length > 0 && (
              <>
                <WeatherChart forecastData={forecastData} />
                <ForecastTable forecastData={forecastData} />
              </>
            )}

            {insights.length > 0 && (
              <InsightGenerator insights={insights} />
            )}
          </div>
        )}

        {!isLoading && !currentWeather && !error && (
          <div className="welcome-container">
            <div className="welcome-box">
              <h2>👋 Welcome to Weather Trend Planner</h2>
              <p>Search for a city to get started with weather forecasting and activity recommendations.</p>
              <div className="welcome-features">
                <div className="feature">
                  <span className="feature-icon">🔍</span>
                  <p>Search any city</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">📊</span>
                  <p>View temperature trends</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">💡</span>
                  <p>Get activity recommendations</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">⚠️</span>
                  <p>Receive weather alerts</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Weather Trend Planner © 2026 | Powered by Open-Meteo API</p>
      </footer>
    </div>
  );
}
