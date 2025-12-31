import React from 'react';
import { FaChartPie, FaChartBar } from 'react-icons/fa';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const ChartsSection = ({ scores }) => {
  const skillLabels = ['Pronunciation', 'Fluency', 'Vocabulary', 'Grammar'];
  const skillValues = [
    scores.pronunciation,
    scores.fluency,
    scores.vocabulary,
    scores.grammar
  ];

  const getSkillColor = (score) => {
    if (score >= 8) return 'rgba(16, 185, 129, 0.7)';
    if (score >= 7) return 'rgba(59, 130, 246, 0.7)';
    if (score >= 6) return 'rgba(139, 92, 246, 0.7)';
    if (score >= 5) return 'rgba(245, 158, 11, 0.7)';
    return 'rgba(239, 68, 68, 0.7)';
  };

  const skillColors = skillValues.map(score => getSkillColor(score));

  const radarData = {
    labels: skillLabels,
    datasets: [
      {
        label: 'Skill Scores',
        data: skillValues,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 3,
        pointBackgroundColor: skillColors.map(color => color.replace('0.7', '1')),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
        pointRadius: 6,
        pointHoverRadius: 10
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 9,
        ticks: {
          stepSize: 1,
          color: '#6b7280'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        pointLabels: {
          color: '#374151',
          font: {
            size: 14,
            weight: '600'
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const barData = {
    labels: skillLabels,
    datasets: [
      {
        label: 'Score',
        data: skillValues,
        backgroundColor: skillColors,
        borderColor: skillColors.map(color => color.replace('0.7', '1')),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 9,
        ticks: {
          stepSize: 1,
          color: '#6b7280'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#374151',
          font: {
            size: 14,
            weight: '600'
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="charts-section card"
    >
      <h2><FaChartPie /> Performance Visualization</h2>
      <div className="charts-container">
        <motion.div 
          className="chart-wrapper"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="chart-header">
            <FaChartPie />
            <h3>Skill Radar Analysis</h3>
          </div>
          <div className="chart-content">
            <Radar data={radarData} options={radarOptions} />
          </div>
          <p className="chart-description">
            Visual representation of skill strengths and areas for improvement
          </p>
        </motion.div>
        
        <motion.div 
          className="chart-wrapper"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="chart-header">
            <FaChartBar />
            <h3>Score Distribution</h3>
          </div>
          <div className="chart-content">
            <Bar data={barData} options={barOptions} />
          </div>
          <p className="chart-description">
            Comparative analysis of individual skill scores
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ChartsSection;