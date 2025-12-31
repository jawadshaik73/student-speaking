import React from 'react';
import { FaCommentDots, FaCogs, FaTrophy, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeedbackSection = ({ overallFeedback, skillFeedback, scores }) => {
  const skillIcons = {
    pronunciation: <FaVolumeUp />,
    fluency: <FaComments />,
    vocabulary: <FaBook />,
    grammar: <FaCode />
  };

  const getSkillColor = (score) => {
    if (score >= 8) return '#10b981';
    if (score >= 7) return '#3b82f6';
    if (score >= 6) return '#8b5cf6';
    if (score >= 5) return '#f59e0b';
    return '#ef4444';
  };

  const getPracticeTips = (skill) => {
    const tips = {
      pronunciation: [
        'Practice minimal pairs (ship/sheep)',
        'Record and compare with native speakers',
        'Use pronunciation apps daily'
      ],
      fluency: [
        'Speak for 2 minutes without stopping',
        'Use linking words and phrases',
        'Practice with timed responses'
      ],
      vocabulary: [
        'Learn 5 new words daily',
        'Use words in context sentences',
        'Review with flashcards weekly'
      ],
      grammar: [
        'Focus on verb tenses',
        'Practice complex sentences',
        'Review common errors'
      ]
    };
    return tips[skill];
  };

  const improvementTips = [
    'Practice speaking for 10 minutes daily',
    'Record and review your own speech',
    'Expand vocabulary with topic-specific words',
    'Listen to native speakers and mimic pronunciation',
    'Join speaking clubs or conversation groups'
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="feedback-section"
    >
      <div className="card">
        <h2><FaCommentDots /> Detailed Feedback</h2>
        
        <div className="feedback-content">
          <motion.div 
            className="overall-feedback"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3><FaTrophy /> Overall Performance Summary</h3>
            <div className="feedback-card">
              <p className="feedback-text">{overallFeedback}</p>
            </div>
            
            <div className="improvement-tips">
              <h4><FaLightbulb /> Quick Improvement Tips:</h4>
              <ul>
                {improvementTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
                  >
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="skill-feedback"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3><FaCogs /> Skill-specific Recommendations</h3>
            <div className="skill-feedback-grid">
              {Object.entries(skillFeedback).map(([skill, feedback], index) => {
                const score = scores[skill];
                const color = getSkillColor(score);
                const tips = getPracticeTips(skill);
                
                return (
                  <motion.div
                    key={skill}
                    className="skill-feedback-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                    whileHover={{ y: -5 }}
                    style={{ borderTopColor: color }}
                  >
                    <div className="skill-feedback-header">
                      <div className="skill-icon" style={{ color }}>
                        {skillIcons[skill]}
                      </div>
                      <div className="skill-title">
                        <h4 style={{ color }}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</h4>
                        <div className="skill-score-tag" style={{ backgroundColor: `${color}15`, color }}>
                          Score: {score.toFixed(1)}/9
                        </div>
                      </div>
                    </div>
                    
                    <p className="skill-feedback-text">{feedback}</p>
                    
                    <div className="practice-tips">
                      <strong>Practice Tips:</strong>
                      <ul>
                        {tips.map((tip, tipIndex) => (
                          <li key={tipIndex}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Import the missing icons
import { FaVolumeUp, FaComments, FaBook, FaCode } from 'react-icons/fa';

export default FeedbackSection;