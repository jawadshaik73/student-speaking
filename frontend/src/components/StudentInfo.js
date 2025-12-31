import React from 'react';
import { FaUserGraduate, FaIdCard, FaCalendarDay, FaClipboardList, FaClock, FaUserTie } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StudentInfo = ({ data }) => {
  const infoItems = [
    {
      icon: <FaUserGraduate />,
      label: 'Student Name',
      value: data.studentName,
      color: '#6366f1'
    },
    {
      icon: <FaIdCard />,
      label: 'Student ID',
      value: data.studentId,
      color: '#8b5cf6'
    },
    {
      icon: <FaCalendarDay />,
      label: 'Test Date',
      value: new Date(data.testDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      color: '#10b981'
    },
    {
      icon: <FaClipboardList />,
      label: 'Test Type',
      value: data.testType,
      color: '#f59e0b'
    },
    {
      icon: <FaClock />,
      label: 'Duration',
      value: data.duration || '15 minutes',
      color: '#3b82f6'
    },
    {
      icon: <FaUserTie />,
      label: 'Examiner',
      value: data.examiner || 'Dr. Sarah Chen',
      color: '#ec4899'
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="student-info card"
    >
      <h2><FaUserGraduate /> Student Information</h2>
      <div className="info-grid">
        {infoItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="info-item"
            style={{ borderLeftColor: item.color }}
          >
            <div className="info-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <div className="info-content">
              <div className="info-label">{item.label}</div>
              <div className="info-value">{item.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default StudentInfo;