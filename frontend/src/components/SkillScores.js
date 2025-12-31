import React from 'react';
import { FaVolumeUp, FaComments, FaBook, FaCode, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SkillScores = ({ scores }) => {
  const skills = [
    {
      name: 'Pronunciation',
      score: scores.pronunciation,
      icon: <FaVolumeUp />,
      description: 'Clarity of speech and accurate pronunciation',
      color: '#6366f1'
    },
    {
      name: 'Fluency',
      score: scores.fluency,
      icon: <FaComments />,
      description: 'Smoothness and continuity of speech',
      color: '#10b981'
    },
    {
      name: 'Vocabulary',
      score: scores.vocabulary,
      icon: <FaBook />,
      description: 'Range and accuracy of word choice',
      color: '#f59e0b'
    },
    {
      name: 'Grammar',
      score: scores.grammar,
      icon: <FaCode />,
      description: 'Accuracy of grammatical structures',
      color: '#8b5cf6'
    }
  ];

  const getBandLevel = (score) => {
    if (score >= 8) return { level: 'Expert', color: '#10b981' };
    if (score >= 7) return { level: 'Advanced', color: '#3b82f6' };
    if (score >= 6) return { level: 'Competent', color: '#8b5cf6' };
    if (score >= 5) return { level: 'Intermediate', color: '#f59e0b' };
    return { level: 'Developing', color: '#ef4444' };
  };

  const getStars = (score) => {
    const filledStars = Math.floor(score / 2);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          color={i <= filledStars ? '#fbbf24' : '#e5e7eb'} 
          size={14}
        />
      );
    }
    return stars;
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="skill-scores card"
    >
      <h2><FaStar /> Skill Analysis</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const band = getBandLevel(skill.score);
          const percent = (skill.score / 9) * 100;
          
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="skill-card"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="skill-header">
                <div className="skill-icon" style={{ backgroundColor: `${skill.color}15`, color: skill.color }}>
                  {skill.icon}
                </div>
                <div className="skill-title">
                  <h3>{skill.name}</h3>
                  <p className="skill-description">{skill.description}</p>
                </div>
              </div>
              
              <div className="skill-score-display">
                <div className="score-number" style={{ color: skill.color }}>
                  {skill.score.toFixed(1)}
                  <span className="score-out-of">/9</span>
                </div>
                <div className="stars">
                  {getStars(skill.score)}
                </div>
              </div>
              
              <div className="progress-container">
                <div className="progress-labels">
                  <span>0</span>
                  <span>4.5</span>
                  <span>9.0</span>
                </div>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </div>
              
              <div className="skill-footer">
                <div className="band-level" style={{ color: band.color, backgroundColor: `${band.color}15` }}>
                  {band.level}
                </div>
                <div className="score-comparison">
                  {skill.score >= 7 ? 'Above Average' : skill.score >= 6 ? 'Average' : 'Needs Improvement'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default SkillScores;