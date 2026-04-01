# 🎨 Weather Trend Planner - Visual Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEATHER TREND PLANNER                        │
│                      React Application                          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │   Browser        │
                    │ (localhost:3000) │
                    └──────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    ┌─────────┐      ┌─────────────┐    ┌────────────────┐
    │ index.  │      │ App.jsx     │    │ App.css        │
    │ html    │      │ (Main)      │    │ (Styling)      │
    └────┬────┘      └──────┬──────┘    └────────────────┘
         │                  │
         └──────────────────┘
                   │
        ┌──────────┴──────────┐
        │   React DOM         │
        │   Rendering         │
        └──────────┬──────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
    ▼              ▼              ▼
┌─────────────┐ ┌────────────┐ ┌──────────────┐
│ Components/ │ │ Utils/     │ │ Styles/      │
│ (5 files)   │ │ (2 files)  │ │ (1 file)     │
└─────┬───────┘ └─────┬──────┘ └──────────────┘
      │               │
      ├─── Fetches API data
      └─── Processes insights
            │
            ▼
    ┌─────────────────────────────┐
    │ Open-Meteo API              │
    │ (https://api.open-meteo.com)│
    └─────────────────────────────┘
```

---

## Component Hierarchy Tree

```
App.jsx
│
├─ Header (static)
│  └─ Title & Subtitle
│
├─ Main Content Container
│  │
│  ├─ WeatherSearch
│  │  └─ Input Form
│  │     └─ onSearch callback
│  │
│  └─ Conditional Rendering:
│     ├─ IF loading:
│     │  └─ Loading Spinner
│     │
│     ├─ IF error:
│     │  └─ Error Message Box
│     │
│     ├─ IF welcome (no search):
│     │  └─ Welcome Screen
│     │
│     └─ IF has data:
│        └─ WeatherContent
│           ├─ CurrentWeather
│           │  └─ Weather Info Grid
│           │
│           ├─ WeatherChart
│           │  └─ Chart.js Line Chart
│           │
│           ├─ ForecastTable
│           │  └─ HTML Table
│           │
│           └─ InsightGenerator
│              └─ Insight Cards
│
└─ Footer (static)
```

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION                          │
├──────────────────────────────────────────────────────────────────┤
│  User types: "London"                                            │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              WeatherSearch.jsx                                   │
│  - Captures user input                                           │
│  - Validates input                                               │
│  - Calls onSearch("London")                                      │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              App.jsx (handleSearch)                              │
│  - Sets isLoading = true                                         │
│  - Clears previous data                                          │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              weatherApi.js                                       │
│  - fetchWeather("London")                                        │
│  - Makes HTTP request to Open-Meteo                              │
│  - Returns raw API response                                      │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              Open-Meteo API                                      │
│  - Processes request                                             │
│  - Returns 7-day forecast (hourly data)                          │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              weatherApi.js                                       │
│  - processForecast(data)                                         │
│  - Converts 3-hour intervals to daily averages                   │
│  - Calculates min/max temperatures                               │
│  - Extracts humidity, wind, rain probability                     │
│  - Returns array of daily objects                                │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              weatherApi.js                                       │
│  - getCurrentWeather(data)                                       │
│  - Extracts current weather from first entry                     │
│  - Returns current weather object                                │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              insightGenerator.js                                 │
│  - generateInsights(forecast, current)                           │
│  - Analyzes weather patterns                                     │
│  - Generates alerts and recommendations                          │
│  - Returns array of insight objects                              │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              App.jsx (State Update)                              │
│  - setCurrentWeather(current)                                    │
│  - setForecastData(forecast)                                     │
│  - setInsights(insights)                                         │
│  - setIsLoading(false)                                           │
│  - setSearchedCity("London")                                     │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              React Re-render                                     │
│  - currentWeather != null                                        │
│  - forecastData != null                                          │
│  - Re-render components with new data                            │
└────────────────┬─────────────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────────┐
│ Current  │ │ Weather  │ │ Forecast     │
│ Weather  │ │ Chart    │ │ Table & Insight
│ Display  │ │          │ │ Generator    │
└──────────┘ └──────────┘ └──────────────┘
    │            │            │
    └────────────┼────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              DOM Update & Display                                │
│  - User sees London weather                                      │
│  - Views temperature trend chart                                 │
│  - Reads detailed forecast                                       │
│  - Gets activity recommendations                                 │
└──────────────────────────────────────────────────────────────────┘
```

---

## Component Communication Pattern

```
     App.jsx
       │
       │ Pass Props Down
       ▼
  ┌──────────────────────────────────────┐
  │                                      │
  ▼                    ▼                 ▼
WeatherSearch    CurrentWeather      WeatherChart
  │                  │                  │
  │ onSearch()       │ weather prop     │ forecastData
  │ callback         │                  │ prop
  │                  │                  │
  ▼                  ▼                  ▼
(User Input)    (Display Data)    (Render Chart)
  │
  └──> Call App.handleSearch()
       │
       └──> Update App State
            │
            └──> Pass Updated Props
                 │
                 └──> Components Re-render
```

---

## State Management Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                    App.jsx State                                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  currentWeather                                                  │
│  ├─ city, country                                               │
│  ├─ temperature, condition                                      │
│  ├─ humidity, windSpeed, pressure                               │
│  └─ feelsLike, visibility                                       │
│                                                                  │
│  forecastData (Array of 5-7 objects)                            │
│  ├─ date, avgTemp, minTemp, maxTemp                             │
│  ├─ condition, humidity, windSpeed                              │
│  └─ rainProb                                                    │
│                                                                  │
│  insights (Array of insight objects)                            │
│  ├─ message, type, icon                                         │
│  └─ Type: 'success' | 'warning' | 'danger' | 'info'            │
│                                                                  │
│  isLoading (Boolean)                                            │
│  ├─ true: Show spinner                                          │
│  └─ false: Show content                                         │
│                                                                  │
│  error (String or null)                                         │
│  ├─ Set on API failure                                          │
│  └─ Null on success                                             │
│                                                                  │
│  searchedCity (String)                                          │
│  └─ Last searched city name                                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## CSS Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                       App.css (850 lines)                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CSS Variables (Colors, Shadows, Transitions)                   │
│  ├─ Color Palette (7 colors)                                    │
│  └─ Standard Values (shadow, transition)                        │
│                                                                  │
│  Global Styles                                                  │
│  ├─ * { box-sizing, reset }                                     │
│  └─ body { font, background }                                   │
│                                                                  │
│  Layout Components                                              │
│  ├─ .app-container (flex column)                                │
│  ├─ .app-header (gradient, padding)                             │
│  ├─ .app-main (max-width, margin auto)                          │
│  └─ .app-footer (footer)                                        │
│                                                                  │
│  Form Components                                                │
│  ├─ .search-form (background, shadow)                           │
│  ├─ .search-input (border, focus)                               │
│  └─ .search-button (gradient, hover)                            │
│                                                                  │
│  Content Components                                             │
│  ├─ .current-weather-container                                  │
│  ├─ .chart-container                                            │
│  ├─ .forecast-table-container                                   │
│  └─ .insights-container                                         │
│                                                                  │
│  Utility Classes                                                │
│  ├─ .loading-spinner (animation)                                │
│  ├─ .error-box (styling)                                        │
│  ├─ .welcome-container (layout)                                 │
│  └─ .info-grid (responsive grid)                                │
│                                                                  │
│  Responsive Breakpoints                                         │
│  ├─ @media (max-width: 768px)  - Tablet                         │
│  ├─ @media (max-width: 480px)  - Mobile                         │
│  └─ @media print                - Print Styles                  │
│                                                                  │
│  Animations                                                     │
│  ├─ @keyframes float (header icon)                              │
│  ├─ @keyframes spin (loading)                                   │
│  └─ @keyframes fadeIn (content)                                 │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## API Integration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              Open-Meteo API                                 │
│  https://api.open-meteo.com/v1/forecast                     │
└─────────────┬───────────────────────────────────────────────────┘
              │
              │ Request Parameters:
              │ - q: city name
              │ - appid: API key
              │ - units: metric
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│              API Response Structure                             │
│                                                                 │
│  {                                                              │
│    city: {                                                      │
│      name: "London",                                            │
│      coord: { lat, lon },                                       │
│      country: "GB"                                              │
│    },                                                           │
│    list: [                                                      │
│      {                                                          │
│        dt_txt: "2026-04-05 12:00:00",                          │
│        main: { temp, feels_like, humidity, pressure },          │
│        weather: [{ main, description }],                        │
│        wind: { speed },                                         │
│        clouds: { all },                                         │
│        pop: 0.3,                                                │
│        visibility: 10000                                        │
│      },                                                         │
│      ... (40 entries for 5 days × 8 intervals)                 │
│    ]                                                            │
│  }                                                              │
│                                                                 │
└─────────────┬───────────────────────────────────────────────────┘
              │
              │ Processing Steps:
              │ 1. Parse JSON response
              │ 2. Check for errors
              │ 3. Extract current weather (first entry)
              │ 4. Group by date
              │ 5. Calculate daily averages
              │ 6. Return structured data
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│              Processed Data Structure                           │
│                                                                 │
│  Current Weather:                                               │
│  {                                                              │
│    city: "London",                                              │
│    temperature: 18,                                             │
│    condition: "Cloudy",                                         │
│    humidity: 72,                                                │
│    windSpeed: 4.5                                               │
│  }                                                              │
│                                                                 │
│  Forecast Array:                                                │
│  [                                                              │
│    {                                                            │
│      date: "2026-04-05",                                        │
│      avgTemp: 18.3,                                             │
│      minTemp: 14.2,                                             │
│      maxTemp: 22.1,                                             │
│      rainProb: 30                                               │
│    },                                                           │
│    ... (5-7 more days)                                          │
│  ]                                                              │
│                                                                 │
└─────────────┬───────────────────────────────────────────────────┘
              │
              │ Ready for UI Rendering
              │
              ▼
          React Components
        Display Weather Data
```

---

## Responsiveness Breakpoints

```
Desktop (≥ 1200px)
├─ Full 3-5 column grid layouts
├─ Sidebar possible
├─ Large fonts and spacing
└─ All features visible

      │
      ▼

Tablet (768px - 1199px)
├─ 2 column layouts
├─ Adjusted spacing
├─ Touch-friendly buttons
└─ Optimized for 10" screens

      │
      ▼

Mobile (480px - 767px)
├─ Single column layout
├─ Full-width content
├─ Larger touch targets
└─ Optimized for phones

      │
      ▼

Small Mobile (< 480px)
├─ Super condensed layout
├─ Very large touch targets
├─ Minimal whitespace
└─ Essential content only
```

---

## Error Handling Flow

```
User Search
    │
    ├─ Empty Input?
    │  └─ Show validation error
    │
    ├─ API Call Fails?
    │  └─ Network Error
    │      └─ Show error message
    │
    ├─ City Not Found?
    │  └─ API Error Response
    │      └─ Show "City not found"
    │
    ├─ Invalid Response?
    │  └─ JSON Parse Error
    │      └─ Show error message
    │
    └─ Success!
       └─ Render Data
```

---

## Loading States

```
Initial State (No Search Yet)
    │
    ├─ Show Welcome Screen
    ├─ Display Features
    └─ Prompt User Input

User Clicks Search
    │
    ├─ Disable Input & Button
    ├─ Show Loading Spinner
    ├─ isLoading = true
    └─ Make API Call

API Response Received
    │
    ├─ Process Data
    ├─ Generate Insights
    ├─ isLoading = false
    └─ Re-render with Data

Display Results
    │
    ├─ Show Current Weather
    ├─ Show Chart
    ├─ Show Forecast Table
    └─ Show Insights
```

---

**Architecture Version**: 1.0  
**Last Updated**: April 2026  
**Status**: ✅ Complete
