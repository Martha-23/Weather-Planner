# Quick Start Guide

## 📋 Requirements

Before you begin, make sure you have:
- ✅ Node.js installed (download from https://nodejs.org/)
- ✅ npm (comes with Node.js)
- ✅ A code editor (VS Code recommended)
- ✅ Internet connection

## 🚀 Quick Setup (5 minutes)

### Step 1: Open Terminal
- Windows: Open PowerShell in the project folder (or use VS Code terminal)
- Mac/Linux: Open Terminal in the project folder

### Step 2: Install Dependencies
```bash
npm install
```
This downloads all required packages (React, Chart.js, etc.)
⏱️ Takes 2-3 minutes on first run

### Step 3: Start Development Server
```bash
npm start
```
✅ The app opens automatically at `http://localhost:3000`

### Step 4: Start Using!
- Type a city name (e.g., "London")
- Click "Search"
- View weather trends and recommendations

## 📦 What Gets Installed

The `npm install` command installs:
- **react** - UI framework
- **react-dom** - React DOM rendering
- **chart.js** - Charting library
- **react-chartjs-2** - React wrapper for Chart.js
- **react-scripts** - Build tools

## 🛑 Stopping the Server

To stop the development server:
- Press `Ctrl + C` in the terminal

## 🔄 Common Commands

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (⚠️ one-way operation)
npm eject
```

## ❓ Troubleshooting

### Issue: "npm: command not found"
**Solution**: Node.js is not installed. Download from https://nodejs.org/

### Issue: Port 3000 already in use
**Solution**: 
```bash
npm start -- --port 3001
```

### Issue: Module not found error
**Solution**:
```bash
rm -rf node_modules
npm install
```

### Issue: "Cannot find module 'Chart'"
**Solution**: Ensure all dependencies are installed:
```bash
npm install
```

### Issue: API returns "City not found"
- Check city name spelling
- Try a major city first (e.g., "London", "Paris")
- Verify internet connection

### Issue: Chart doesn't display
- Check browser console for errors (F12)
- Clear browser cache and refresh
- Make sure Chart.js is properly installed

## 🌐 Running on a Different Port

```bash
# Use port 3001 instead of 3000
PORT=3001 npm start

# Windows PowerShell
$env:PORT=3001; npm start
```

## 📱 Accessing from Other Devices

To access the app from another computer on your network:

1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig`

2. On other device, go to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

## 🔧 Environment Setup

No API key is required! The app uses the **Open-Meteo API**, which is:
- ✅ Free to use
- ✅ No authentication required
- ✅ No rate limits for weather data
- ✅ Easy to integrate

For more information, visit: https://open-meteo.com

## 📊 File Structure Overview

```
project/
├── public/               # HTML template
├── src/
│   ├── components/      # React components
│   ├── styles/          # CSS files
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main component
│   └── index.jsx        # Entry point
├── package.json         # Dependencies
└── README.md            # Documentation
```

## ✅ Verify Installation

After `npm install`, verify everything is set up correctly:

```bash
# Check if React is installed
npm list react

# Check if Chart.js is installed
npm list chart.js

# Should show versions without errors
```

## 🎯 Next Steps

1. Search for a city to see weather data
2. Explore the temperature trends chart
3. Check the detailed forecast table
4. Read weather insights and recommendations
5. Try different cities to test the app

## 💬 Getting Help

If you encounter issues:
1. Check the console for error messages (F12 in browser)
2. Verify Node.js and npm are up to date
3. Try clearing node_modules: `rm -rf node_modules && npm install`
4. Restart your terminal and VS Code
5. Restart your computer

---

**You're all set! Happy weather forecasting! 🌤️**
