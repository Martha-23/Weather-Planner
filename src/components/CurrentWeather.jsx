import React from 'react';

/**
 * CurrentWeather Component
 * Displays current weather information for the selected city
 */
export default function CurrentWeather({ weather }) {
  if (!weather) {
    return null;
  }

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Foggy': '🌫️',
      'Overcast': '☁️',
      'Cloudy': '☁️'
    };
    return iconMap[condition] || '🌤️';
  };

  return (
    <div className="current-weather-container">
      <div className="weather-card-header">
        {weather.city}
      </div>
      
      <div className="weather-card-content">
        <div className="weather-info-row">
          <span className="weather-label">Current Temperature:</span>
          <span className="weather-value">{weather.temperature}°C</span>
        </div>
        <div className="weather-info-row">
          <span className="weather-label">Condition:</span>
          <span className="weather-value">{getWeatherIcon(weather.condition)} {weather.condition}</span>
        </div>
      </div>
    </div>
  );
}
