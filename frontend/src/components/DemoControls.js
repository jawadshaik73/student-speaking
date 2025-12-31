import React, { useState } from 'react';
import { FaSlidersH, FaSyncAlt, FaUndo, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DemoControls = ({ scores, onScoreChange, onUpdate, onReset, loading }) => {
  const [localScores, setLocalScores] = useState(scores);
  
  const skillConfigs = [
    { key: 'overall', label: 'Overall Score', min: 0, max: 9, step: 0.5, color: '#6366f1' },
    { key: 'pronunciation', label: 'Pronunciation', min: 0, max: 9, step: 0.5, color: '#8b5cf6' },
    { key: 'fluency', label: 'Fluency', min: 0, max: 9, step: 0.5, color: '#10b981' },
    { key: 'vocabulary', label: 'Vocabulary', min: 0, max: 9, step: 0.5, color: '#f59e0b' },
    { key: 'grammar', label: 'Grammar', min: 0, max: 9, step: 0.5, color: '#ec4899' }
  ];

  const handleSliderChange = (key, value) => {
    const newValue = parseFloat(value);
    setLocalScores(prev => ({
      ...prev,
      [key]: newValue
    }));
    onScoreChange(key, newValue);
  };

  const handleUpdate = () => {
    onUpdate();
  };

  const handleReset = () => {
    const defaultScores = {
      overall: 7.0,
      pronunciation: 7.5,
      fluency: 6.5,
      vocabulary: 7.0,
      grammar: 6.5
    };
    
    skillConfigs.forEach(config => {
      handleSliderChange(config.key, defaultScores[config.key]);
    });
    onReset();
  };

  const getBandColor = (score) => {
    if (score >= 8) return '#10b981';
    if (score >= 7) return '#3b82f6';
    if (score >= 6) return '#8b5cf6';
    if (score >= 5) return '#f59e0b';
    return '#ef4444';
  };

  const handleDownload = () => {
    // Create a simple report download
    const report = `
      SPEAKING ASSESSMENT REPORT
      ===========================
      
      Overall Score: ${localScores.overall}/9
      
      Skill Scores:
      - Pronunciation: ${localScores.pronunciation}/9
      - Fluency: ${localScores.fluency}/9
      - Vocabulary: ${localScores.vocabulary}/9
      - Grammar: ${localScores.grammar}/9
      
      Report generated on: ${new Date().toLocaleDateString()}
      
      This is a simulated report for educational purposes.
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speaking-assessment-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="demo-controls card"
    >
      <h2><FaSlidersH /> Interactive Demo</h2>
      <p className="demo-description">
        Adjust the scores below to see how feedback changes dynamically. This demonstrates the adaptive feedback system.
      </p>
      
      <div className="score-controls-grid">
        {skillConfigs.map((config, index) => {
          const value = localScores[config.key];
          const color = getBandColor(value);
          
          return (
            <motion.div
              key={config.key}
              className="score-control-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
            >
              <div className="control-header">
                <label htmlFor={`${config.key}-control`}>
                  {config.label}: 
                  <span className="score-value" style={{ color }}>
                    {value.toFixed(1)}
                  </span>
                </label>
                <div className="band-indicator" style={{ backgroundColor: `${color}15`, color }}>
                  {value >= 8 ? 'Expert' : value >= 7 ? 'Advanced' : value >= 6 ? 'Competent' : value >= 5 ? 'Intermediate' : 'Developing'}
                </div>
              </div>
              
              <input
                type="range"
                id={`${config.key}-control`}
                min={config.min}
                max={config.max}
                step={config.step}
                value={value}
                onChange={(e) => handleSliderChange(config.key, e.target.value)}
                className="score-slider"
                style={{
                  '--track-color': color,
                  '--thumb-color': color
                }}
              />
              
              <div className="range-labels">
                <span>0</span>
                <span>4.5</span>
                <span>9.0</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="control-buttons">
        <motion.button
          className="btn btn-primary"
          onClick={handleUpdate}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSyncAlt className={loading ? 'spinning' : ''} />
          {loading ? 'Updating...' : 'Apply Changes'}
        </motion.button>
        
        <motion.button
          className="btn btn-secondary"
          onClick={handleReset}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUndo />
          Reset to Default
        </motion.button>
        
        <motion.button
          className="btn btn-secondary"
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload />
          Download Report
        </motion.button>
      </div>
      
      <div className="demo-info">
        <p>
          <strong>Note:</strong> Changing scores will update the charts and feedback in real-time to demonstrate the system's adaptive feedback capabilities.
        </p>
      </div>
    </motion.section>
  );
};

export default DemoControls;