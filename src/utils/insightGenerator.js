/**
 * Generate insights from weather forecast data
 * @param {Array} forecastData - Processed forecast data
 * @param {Object} currentWeather - Current weather information
 * @returns {Object} Generated insights with message, type, and icon
 */
export function generateInsights(forecastData, currentWeather) {
  const insights = [];
  
  if (!forecastData || forecastData.length === 0) {
    return { insights, warnings: [] };
  }
  
  // Find best day for outdoor activities (lowest temp variation, no rain)
  const bestDay = forecastData
    .filter(day => day.rainProb < 40)
    .reduce((best, current) => {
      const currentVariation = current.maxTemp - current.minTemp;
      const bestVariation = best.maxTemp - best.minTemp;
      return currentVariation < bestVariation ? current : best;
    });
  
  if (bestDay && bestDay.rainProb < 40) {
    const dateObj = new Date(bestDay.date + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    insights.push({
      message: `✓ Best day for outdoor activities: ${dayName} (${bestDay.avgTemp}°C, ${bestDay.rainProb}% rain)`,
      type: 'success',
      icon: '🌞'
    });
  }
  
  // Check for rain probability > 60%
  const rainyDays = forecastData.filter(day => day.rainProb > 60);
  if (rainyDays.length > 0) {
    const dateObj = new Date(rainyDays[0].date + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    insights.push({
      message: `⚠ Rain expected on ${dayName} (${rainyDays[0].rainProb}% probability)`,
      type: 'warning',
      icon: '🌧️'
    });
  }
  
  // Find hottest day and check if > 35°C
  const hottestDay = forecastData.reduce((max, current) => 
    current.maxTemp > max.maxTemp ? current : max
  );
  
  if (hottestDay.maxTemp > 35) {
    const dateObj = new Date(hottestDay.date + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    insights.push({
      message: `🔥 HEAT WARNING: Very hot day expected on ${dayName} (${hottestDay.maxTemp}°C)`,
      type: 'danger',
      icon: '🔥'
    });
  }
  
  // Find coldest day and check if < 5°C
  const coldestDay = forecastData.reduce((min, current) => 
    current.minTemp < min.minTemp ? current : min
  );
  
  if (coldestDay.minTemp < 5) {
    const dateObj = new Date(coldestDay.date + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    insights.push({
      message: `❄️ COLD WARNING: Very cold day expected on ${dayName} (${coldestDay.minTemp}°C)`,
      type: 'danger',
      icon: '❄️'
    });
  }
  
  // Check for extreme weather conditions
  const extremeWindDays = forecastData.filter(day => day.windSpeed > 40);
  if (extremeWindDays.length > 0) {
    const dateObj = new Date(extremeWindDays[0].date + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    insights.push({
      message: `💨 WIND WARNING: Strong winds expected on ${dayName} (${extremeWindDays[0].windSpeed} km/h)`,
      type: 'warning',
      icon: '💨'
    });
  }
  
  // Check for temperature trend
  if (forecastData.length >= 2) {
    const firstAvgTemp = forecastData[0].avgTemp;
    const lastAvgTemp = forecastData[forecastData.length - 1].avgTemp;
    const trend = lastAvgTemp - firstAvgTemp;
    
    if (trend > 5) {
      insights.push({
        message: `📈 Temperature trend: Getting warmer (+${Math.round(trend)}°C over the period)`,
        type: 'info',
        icon: '📈'
      });
    } else if (trend < -5) {
      insights.push({
        message: `📉 Temperature trend: Getting colder (${Math.round(trend)}°C over the period)`,
        type: 'info',
        icon: '📉'
      });
    }
  }
  
  return { insights, warnings: insights.filter(i => i.type === 'danger') };
}
