#!/bin/bash

echo ""
echo "========================================"
echo " Weather Trend Planner - Setup & Run"
echo "========================================"
echo ""

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to install dependencies"
    echo "Please ensure Node.js is installed: https://nodejs.org/"
    exit 1
fi

echo ""
echo "Dependencies installed successfully!"
echo ""
echo "Starting development server..."
echo "The app will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
