import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, type = 'info', onClose }) => {
  const icons = {
    success: FaCheckCircle,
    error: FaExclamationCircle,
    warning: FaExclamationCircle,
    info: FaInfoCircle
  };

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="notification"
        style={{ borderLeftColor: colors[type] }}
      >
        <div className="notification-content">
          <div className="notification-icon" style={{ color: colors[type] }}>
            <Icon size={20} />
          </div>
          <div className="notification-message">
            {message}
          </div>
          <button className="notification-close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;