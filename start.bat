@echo off
echo.
echo ========================================
echo  Weather Trend Planner - Setup & Run
echo ========================================
echo.

echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies
    echo Please ensure Node.js is installed: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo Starting development server...
echo The app will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
