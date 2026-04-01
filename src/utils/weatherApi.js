// Weather API Integration
// Using Open-Meteo API - Free, no API key required!
const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetch weather forecast data for a specific city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather forecast data
 */
export async function fetchWeather(city) {
  try {
    // Step 1: Get city coordinates
    const geoUrl = `${BASE_URL}?name=${city}&count=1&language=en&format=json`;
    console.log('Fetching city coordinates:', geoUrl);
    
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${city}" not found`);
    }
    
    const cityData = geoData.results[0];
    const { latitude, longitude, name, country } = cityData;
    
    console.log(`Found: ${name}, ${country}`);
    
    // Step 2: Get forecast using coordinates
    const forecastUrl = `${FORECAST_BASE_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,wind_speed_10m_max&timezone=auto`;
    console.log('Fetching forecast:', forecastUrl);
    
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    
    // Format the response to match expected structure
    return {
      city: {
        name: name,
        country: country,
        coord: { lat: latitude, lon: longitude }
      },
      daily: forecastData.daily,
      timezone: forecastData.timezone
    };
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    throw error;
  }
}

/**
 * Process forecast data into daily averages
 * @param {Object} data - Raw forecast data from API
 * @returns {Array} Array of objects with date and average temperature
 */
export function processForecast(data) {
  const result = data.daily.time
    .slice(0, 7) // Get next 7 days
    .map((date, index) => {
      const weatherCode = data.daily.weather_code[index];
      const condition = getWeatherCondition(weatherCode);
      
      return {
        date,
        avgTemp: Math.round(data.daily.temperature_2m_max[index] * 10) / 10,
        minTemp: Math.round(data.daily.temperature_2m_min[index] * 10) / 10,
        maxTemp: Math.round(data.daily.temperature_2m_max[index] * 10) / 10,
        condition,
        humidity: 65, // Average humidity
        windSpeed: Math.round(data.daily.wind_speed_10m_max[index]),
        rainProb: Math.round((data.daily.precipitation_sum[index] || 0) * 10)
      };
    });
  
  return result;
}

/**
 * Convert WMO weather codes to readable conditions
 * @param {number} code - WMO weather code
 * @returns {string} Weather condition
 */
function getWeatherCondition(code) {
  if (code === 0 || code === 1) return 'Clear';
  if (code === 2) return 'Clouds';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if (code === 51 || code === 53 || code === 55) return 'Drizzle';
  if (code === 61 || code === 63 || code === 65) return 'Rain';
  if (code === 71 || code === 73 || code === 75) return 'Snow';
  if (code === 77) return 'Snow';
  if (code === 80 || code === 81 || code === 82) return 'Rain';
  if (code === 85 || code === 86) return 'Snow';
  if (code === 95 || code === 96 || code === 99) return 'Thunderstorm';
  return 'Cloudy';
}

/**
 * Get current weather from forecast data
 * @param {Object} data - Raw forecast data from API
 * @param {string} cityName - Name of the city
 * @returns {Object} Current weather information
 */
export function getCurrentWeather(data, cityName) {
  if (!data.daily || data.daily.time.length === 0) {
    return null;
  }
  
  // Use the first day as current weather
  const today = 0;
  return {
    city: cityName,
    country: data.country || 'Unknown',
    temperature: Math.round(data.daily.temperature_2m_max[today] * 10) / 10,
    condition: getWeatherCondition(data.daily.weather_code[today]),
    description: getWeatherCondition(data.daily.weather_code[today]),
    humidity: 65, // Average humidity (not provided by Open-Meteo basic API)
    windSpeed: Math.round(data.daily.wind_speed_10m_max[today]),
    feelsLike: Math.round(data.daily.temperature_2m_max[today] * 10) / 10,
    pressure: 1013, // Standard pressure placeholder
    visibility: 10 // km, standard visibility placeholder
  };
}
