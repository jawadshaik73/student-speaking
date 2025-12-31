import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import StudentInfo from './components/StudentInfo';
import OverallScore from './components/OverallScore';
import SkillScores from './components/SkillScores';
import ChartsSection from './components/ChartsSection';
import FeedbackSection from './components/FeedbackSection';
import DemoControls from './components/DemoControls';
import Notification from './components/Notification';
import { fetchAssessmentData, updateScores, resetScores } from './utils/dataService';

function App() {
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [tempScores, setTempScores] = useState(null);

  useEffect(() => {
    loadAssessmentData();
  }, []);

  const loadAssessmentData = async () => {
    try {
      setLoading(true);
      const data = await fetchAssessmentData();
      setAssessmentData(data);
      setTempScores(data.scores);
      setError(null);
      showNotification('Assessment data loaded successfully!', 'success');
    } catch (err) {
      setError('Failed to load assessment data. Please try again.');
      showNotification('Failed to load assessment data', 'error');
      // Load default data for offline mode
      setAssessmentData(getDefaultData());
      setTempScores(getDefaultData().scores);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateScores = async () => {
    if (!tempScores) return;
    
    try {
      setLoading(true);
      const updatedData = await updateScores(tempScores);
      setAssessmentData(updatedData);
      showNotification('Scores updated successfully!', 'success');
    } catch (err) {
      // Fallback to local update if server fails
      const updatedData = {
        ...assessmentData,
        scores: tempScores,
        overallFeedback: generateOverallFeedback(tempScores.overall),
        skillFeedback: generateSkillFeedback(tempScores)
      };
      setAssessmentData(updatedData);
      showNotification('Updated locally (offline mode)', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleResetScores = async () => {
    try {
      setLoading(true);
      const data = await resetScores();
      setAssessmentData(data);
      setTempScores(data.scores);
      showNotification('Scores reset to default', 'success');
    } catch (err) {
      const defaultData = getDefaultData();
      setAssessmentData(defaultData);
      setTempScores(defaultData.scores);
      showNotification('Reset locally (offline mode)', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (skill, value) => {
    setTempScores(prev => ({
      ...prev,
      [skill]: parseFloat(value)
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const getDefaultData = () => ({
    studentId: 'STU001',
    studentName: 'Alex Johnson',
    testDate: '2023-11-15',
    testType: 'IELTS Speaking Mock Test',
    duration: '15 minutes',
    examiner: 'Dr. Sarah Chen',
    scores: {
      overall: 7.0,
      pronunciation: 7.5,
      fluency: 6.5,
      vocabulary: 7.0,
      grammar: 6.5
    },
    bandDescriptions: {
      9: 'Expert user: Full operational command of the language with complete accuracy and fluency.',
      8: 'Very good user: Has fully operational command with only occasional unsystematic inaccuracies.',
      7: 'Good user: Has operational command with occasional inaccuracies and misunderstandings.',
      6: 'Competent user: Has generally effective command despite some inaccuracies and misunderstandings.',
      5: 'Modest user: Has partial command, coping with overall meaning in most situations.',
      4: 'Limited user: Basic competence is limited to familiar situations with frequent problems.',
      3: 'Extremely limited user: Conveys and understands only general meaning in very familiar situations.',
      2: 'Intermittent user: Has great difficulty understanding spoken and written English.',
      1: 'Non-user: Essentially has no ability to use the language beyond possibly a few isolated words.'
    },
    skillFeedback: {
      pronunciation: "Your pronunciation is generally clear with good intonation patterns. Some vowel sounds could be more distinct.",
      fluency: "You speak at a reasonable pace but have occasional hesitations. Try to use more linking words for smoother transitions.",
      vocabulary: "You use a good range of vocabulary appropriately. Consider incorporating more topic-specific terminology.",
      grammar: "You demonstrate reasonable grammatical control with some complex structures. Watch subject-verb agreement."
    },
    overallFeedback: "Good performance with clear communication. You demonstrate the ability to discuss familiar topics with some detail."
  });

  const generateOverallFeedback = (overallScore) => {
    if (overallScore >= 8) return "Excellent performance with strong control of language features.";
    if (overallScore >= 7) return "Good performance with clear communication and detailed discussion.";
    if (overallScore >= 6) return "Competent performance despite some errors in complex topics.";
    if (overallScore >= 5) return "Modest performance with basic communication skills.";
    return "Needs improvement in foundational language skills.";
  };

  const generateSkillFeedback = (scores) => ({
    pronunciation: `Pronunciation score: ${scores.pronunciation}/9. ${scores.pronunciation >= 7 ? 'Good control with minor improvements needed.' : 'Focus on basic sound production.'}`,
    fluency: `Fluency score: ${scores.fluency}/9. ${scores.fluency >= 7 ? 'Good flow with occasional hesitations.' : 'Practice speaking for longer periods.'}`,
    vocabulary: `Vocabulary score: ${scores.vocabulary}/9. ${scores.vocabulary >= 7 ? 'Good range used appropriately.' : 'Expand core vocabulary for common topics.'}`,
    grammar: `Grammar score: ${scores.grammar}/9. ${scores.grammar >= 7 ? 'Reasonable control with complex structures.' : 'Master basic sentence structures first.'}`
  });

  if (loading && !assessmentData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading assessment report...</p>
        </div>
      </div>
    );
  }

  if (error && !assessmentData) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>⚠️ Error Loading Data</h2>
          <p>{error}</p>
          <button onClick={loadAssessmentData} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container"
      >
        <Header />
        
        <StudentInfo data={assessmentData} />
        
        <OverallScore 
          score={assessmentData.scores.overall} 
          bandDescriptions={assessmentData.bandDescriptions}
        />
        
        <SkillScores scores={assessmentData.scores} />
        
        <ChartsSection scores={assessmentData.scores} />
        
        <FeedbackSection 
          overallFeedback={assessmentData.overallFeedback}
          skillFeedback={assessmentData.skillFeedback}
          scores={assessmentData.scores}
        />
        
        <DemoControls
          scores={tempScores || assessmentData.scores}
          onScoreChange={handleScoreChange}
          onUpdate={handleUpdateScores}
          onReset={handleResetScores}
          loading={loading}
        />
        
        <footer className="footer">
          <p>© 2024 SpeakMaster Assessment System. All rights reserved.</p>
          <p className="footer-note">
            This report is generated based on the IELTS 9-band scale. Scores and feedback are for educational purposes.
          </p>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;