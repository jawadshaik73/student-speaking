import React from 'react';
import { FaLanguage, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="header"
    >
      <div className="logo">
        <div className="logo-icon">
          <FaLanguage size={32} />
        </div>
        <div>
          <h1>SpeakMaster Assessment</h1>
          <p className="logo-subtitle">Speaking Performance Report</p>
        </div>
      </div>
      <div className="header-info">
        <p>
          <FaCalendarAlt style={{ marginRight: '8px' }} />
          {currentDate}
        </p>
      </div>
    </motion.header>
  );
};

export default Header;