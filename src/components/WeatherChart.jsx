import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * WeatherChart Component
 * Displays temperature trend chart using Chart.js
 */
export default function WeatherChart({ forecastData }) {
  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  // Format dates for display as day names
  const labels = forecastData.map(day => {
    const date = new Date(day.date + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });

  // Extract temperature values
  const avgTemps = forecastData.map(day => day.avgTemp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: avgTemps,
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: '#4a90e2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        yAxisID: 'y'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 20,
        right: 10,
        top: 10,
        bottom: 10
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 11 },
        padding: 10,
        cornerRadius: 0,
        displayColors: true,
        callbacks: {
          label: (context) => {
            return `${context.parsed.y}°C`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 15,
        max: 30,
        ticks: {
          stepSize: 5,
          color: '#4a90e2',
          font: { size: 12, weight: 'bold' }
        },
        title: {
          display: true,
          text: 'Temperature (°C)',
          font: { size: 14, weight: 'bold' },
          color: '#4a90e2'
        },
        grid: {
          color: 'rgba(74, 144, 226, 0.1)',
          lineWidth: 1
        }
      },
      x: {
        title: {
          display: false
        },
        grid: {
          display: true,
          color: 'rgba(74, 144, 226, 0.1)',
          lineWidth: 1
        },
        ticks: {
          color: '#4a90e2',
          font: { size: 12, weight: 'bold' }
        }
      }
    }
  };

  return (
    <div className="forecast-chart-container">
      <div className="chart-header">Temperature Trend</div>
      <div className="chart-wrapper">
        <div className="chart-content">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
