import React from 'react';
import { FaChartLine, FaFlag } from 'react-icons/fa';
import { motion } from 'framer-motion';

const OverallScore = ({ score, bandDescriptions }) => {
  const scorePercent = (score / 9) * 100;
  const band = Math.floor(score);
  const bandDescription = bandDescriptions[band] || bandDescriptions[Math.max(...Object.keys(bandDescriptions).map(Number))];

  const getBandColor = (score) => {
    if (score >= 8) return '#10b981';
    if (score >= 7) return '#3b82f6';
    if (score >= 6) return '#8b5cf6';
    if (score >= 5) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="overall-score card"
    >
      <h2><FaChartLine /> Overall Performance</h2>
      <div className="score-display">
        <div className="score-circle-wrapper">
          <div className="score-circle" style={{ '--score-percent': `${scorePercent}%` }}>
            <div className="score-value" style={{ color: getBandColor(score) }}>
              {score.toFixed(1)}
            </div>
            <div className="score-label">out of 9.0</div>
          </div>
        </div>
        
        <div className="band-info">
          <div className="band-header">
            <h3><FaFlag /> IELTS Band Description</h3>
            <div className="band-level" style={{ backgroundColor: getBandColor(score) }}>
              Band {band}
            </div>
          </div>
          <p className="band-description">{bandDescription}</p>
          
          <div className="band-indicator">
            <div className="band-scale">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((band) => (
                <div key={band} className="band-tick">
                  <span>{band}</span>
                </div>
              ))}
            </div>
            <div className="band-progress">
              <div 
                className="band-fill" 
                style={{ 
                  width: `${scorePercent}%`,
                  background: `linear-gradient(90deg, ${getBandColor(score)} 0%, ${getBandColor(score)}80 100%)`
                }}
              />
              <div 
                className="band-marker" 
                style={{ 
                  left: `${scorePercent}%`,
                  color: getBandColor(score)
                }}
              >
                <FaFlag />
              </div>
            </div>
            <div className="band-labels">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OverallScore;