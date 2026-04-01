import React from 'react';

/**
 * ForecastTable Component
 * Displays detailed forecast data in a table format
 */
export default function ForecastTable({ forecastData }) {
  if (!forecastData || forecastData.length === 0) {
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
      'Mist': '🌫️',
      'Smoke': '💨',
      'Haze': '🌫️',
      'Dust': '🌪️',
      'Fog': '🌫️',
      'Sand': '🌪️',
      'Ash': '🌪️',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    return iconMap[condition] || '🌤️';
  };

  return (
    <div className="forecast-table-container">
      <h3 className="forecast-title">📅 Detailed Forecast</h3>
      <div className="table-wrapper">
        <table className="forecast-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Condition</th>
              <th>Avg Temp</th>
              <th>Min-Max</th>
              <th>Humidity</th>
              <th>Wind</th>
              <th>Rain%</th>
            </tr>
          </thead>
          <tbody>
            {forecastData.map((day, index) => {
              const date = new Date(day.date + 'T00:00:00');
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
              
              return (
                <tr key={index} className="forecast-row">
                  <td className="date-cell">{dayName}</td>
                  <td className="condition-cell">
                    <span className="condition-icon">{getWeatherIcon(day.condition)}</span>
                    <span>{day.condition}</span>
                  </td>
                  <td className="temp-cell avg-temp">{day.avgTemp}°C</td>
                  <td className="temp-range-cell">
                    <span className="min-temp">{day.minTemp}°</span>
                    <span className="range-sep">-</span>
                    <span className="max-temp">{day.maxTemp}°</span>
                  </td>
                  <td className="humidity-cell">{day.humidity}%</td>
                  <td className="wind-cell">{day.windSpeed} m/s</td>
                  <td className="rain-cell">
                    <span className={`rain-badge rain-${day.rainProb > 60 ? 'high' : day.rainProb > 30 ? 'medium' : 'low'}`}>
                      {day.rainProb}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
