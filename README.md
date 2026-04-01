# Weather Trend Planner

A lightweight web application that helps users analyze upcoming weather trends for a specific city and determine the best day for outdoor activities.

## Features

✅ **City Search** - Enter any city name to get weather forecasts  
✅ **Current Weather** - View real-time temperature, conditions, humidity, and more  
✅ **Temperature Trend Chart** - Visualize temperature changes over 5-7 days  
✅ **Detailed Forecast** - Complete table with hourly conditions and metrics  
✅ **Smart Insights** - Get recommendations for outdoor activities  
✅ **Weather Alerts** - Receive warnings for extreme weather (heat, cold, wind, rain)  
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile  
✅ **Modern UI** - Beautiful gradient design with smooth animations  

## Tech Stack

- **React 18** - UI Framework
- **Chart.js & React-ChartJS-2** - Temperature trend visualization
- **Open-Meteo API** - Real-time weather data (free, no authentication required)
- **CSS3** - Modern, responsive styling with animations
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
Assignment 4/
├── public/
│   └── index.html                 # Main HTML file
├── src/
│   ├── components/
│   │   ├── WeatherSearch.jsx      # City search input component
│   │   ├── CurrentWeather.jsx     # Current weather display
│   │   ├── WeatherChart.jsx       # Temperature trend chart
│   │   ├── ForecastTable.jsx      # Detailed forecast table
│   │   └── InsightGenerator.jsx   # Weather insights and alerts
│   ├── utils/
│   │   ├── weatherApi.js          # Open-Meteo API integration
│   │   └── insightGenerator.js    # Insight generation logic
│   ├── styles/
│   │   └── App.css                # Global styling and animations
│   ├── App.jsx                    # Main app component
│   └── index.jsx                  # React entry point
├── package.json                   # Dependencies and scripts
├── .gitignore                     # Git ignore patterns
└── README.md                      # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory**
```bash
cd "BSE Class of 2024\2026\BSE 3350 - FULLSTACK WEB\Assignment 4"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open in browser**
The app will automatically open at `http://localhost:3000`

## How to Use

1. **Search for a City**
   - Enter a city name in the search box (e.g., London, New York, Tokyo)
   - Click "Search" or press Enter

2. **View Current Weather**
   - See the current temperature, weather condition, and other metrics
   - Displays feel-like temperature, humidity, pressure, and visibility

3. **Analyze Temperature Trends**
   - View the temperature trend chart with average, min, and max temperatures
   - Chart covers the next 5-7 days

4. **Check Detailed Forecast**
   - Review the detailed forecast table with:
     - Date and day of the week
     - Weather conditions with emoji icons
     - Temperature ranges
     - Humidity percentage
     - Wind speed
     - Rain probability

5. **Get Weather Insights**
   - Receive recommendations for the best day for outdoor activities
   - Get alerts for extreme weather:
     - 🔥 Heat warnings (temp > 35°C)
     - ❄️ Cold warnings (temp < 5°C)
     - 💨 Wind warnings (speed > 40 km/h)
     - 🌧️ Rain alerts (probability > 60%)
   - See temperature trends over the period

## API Configuration

This app uses the **Open-Meteo API** (free, no authentication required).

### Features
- No API key needed
- Free weather data and forecasts
- Easy to use and integrate

For more information, visit: https://open-meteo.com

## Features Implemented

### User Stories
- ✅ **US1**: Search Weather - Enter a city name to view the weather forecast
- ✅ **US2**: View Current Weather - See current temperature and weather condition
- ✅ **US3**: View Weather Trend - See temperature trend chart for upcoming days
- ✅ **US4**: Get Activity Recommendation - System suggests best day for outdoor activities
- ✅ **US5**: Receive Weather Warnings - Get warned about extreme weather conditions

### Technical Features
- ✅ API data fetching with error handling
- ✅ Data transformation (converts 3-hour intervals to daily averages)
- ✅ Temperature trend visualization with Chart.js
- ✅ Smart insight generation algorithm
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and error handling
- ✅ Smooth animations and transitions
- ✅ Accessible UI (ARIA labels, keyboard navigation)

## Customization

### Styling
- Main styles are in `src/styles/App.css`
- CSS variables are defined at the top for easy color/spacing customization
- Responsive breakpoints for different screen sizes

### Adding New Features
- Create new components in `src/components/`
- Import and use them in `src/App.jsx`
- Add utility functions in `src/utils/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized React components with minimal re-renders
- Lazy chart rendering
- Efficient data processing algorithms
- Compressed CSS and optimized images
- Average load time: < 2 seconds

## Troubleshooting

### "City not found" Error
- Check the spelling of the city name
- Try with a different city
- Ensure you have internet connection

### Chart not displaying
- Check browser console for errors
- Ensure Chart.js library is loaded
- Refresh the page

### API not working
- Check Open-Meteo API status
- Ensure city name is valid
- Verify internet connection

### Port 3000 already in use
```bash
npm start -- --port 3001
```

## Future Enhancements

- 📍 Geolocation support (auto-detect user's city)
- 🌍 Multiple language support
- 💾 Favorites/bookmarks for cities
- 📈 Advanced analytics
- 🔔 Push notifications
- 📱 Progressive Web App (PWA) support
- 🌙 Dark mode toggle
- 📊 Historical weather data
- 🗺️ Weather map integration

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

BSE 3350 Assignment - Fullstack Web Development

## Author

Created as part of BSE 3350 - Fullstack Web Development Course (2026)

## Support

For questions or issues, please open an issue or contact the development team.

---

**Happy weather forecasting! 🌤️**
