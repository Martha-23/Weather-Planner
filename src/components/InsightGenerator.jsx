import React from 'react';

/**
 * InsightGenerator Component
 * Displays weather insights and warnings
 */
export default function InsightGenerator({ insights, warnings }) {
  if (!insights || insights.length === 0) {
    return null;
  }

  // Get the most useful insight (success insight if available, otherwise first insight)
  const successInsights = insights.filter(i => i.type === 'success');
  const primaryInsight = successInsights.length > 0 ? successInsights[0] : insights[0];

  return (
    <div className="insights-container">
      <div className="insights-header">
        Insight:
      </div>
      
      <div className="insights-content">
        <div className="insight-card">
          <span className="insight-icon">{primaryInsight.icon}</span>
          <p className="insight-text">{primaryInsight.message}</p>
        </div>
      </div>
    </div>
  );
}
