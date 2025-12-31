const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// In-memory data store for assessment results
let assessmentData = {
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
    pronunciation: "Your pronunciation is generally clear with good intonation patterns. Some vowel sounds could be more distinct. Focus on word stress patterns and consonant clusters for improved clarity.",
    fluency: "You speak at a reasonable pace but have occasional hesitations. Try to use more linking words for smoother transitions and practice speaking for longer periods without pauses.",
    vocabulary: "You use a good range of vocabulary appropriately. Consider incorporating more topic-specific terminology and idiomatic expressions to sound more natural.",
    grammar: "You demonstrate reasonable grammatical control with some complex structures. Watch subject-verb agreement in longer sentences and practice using a wider variety of tenses."
  },
  
  overallFeedback: "Good performance with clear communication. You demonstrate the ability to discuss familiar topics with some detail and maintain good coherence. To improve further, focus on increasing fluency through regular practice and expanding your range of grammatical structures for more sophisticated expression."
};

// Helper function to generate feedback based on scores
function generateFeedback(scores) {
  const overall = scores.overall;
  let overallFeedback = '';
  
  if (overall >= 8) {
    overallFeedback = "Exceptional performance demonstrating mastery of spoken English. You communicate with precision, fluency, and sophistication. Your language use is natural and effective across all contexts.";
  } else if (overall >= 7) {
    overallFeedback = "Strong performance with clear and effective communication. You handle complex topics well and maintain good flow with only occasional minor errors that don't impede understanding.";
  } else if (overall >= 6) {
    overallFeedback = "Competent performance with generally effective communication. You can discuss familiar topics adequately but may struggle with more complex subjects or precise expression.";
  } else if (overall >= 5) {
    overallFeedback = "Developing proficiency with basic communication skills. You can handle simple conversations but need improvement in fluency, vocabulary range, and grammatical accuracy.";
  } else {
    overallFeedback = "Foundational level requiring significant improvement. Focus on building core vocabulary, basic sentence structures, and pronunciation fundamentals through regular practice.";
  }

  const skillFeedback = {
    pronunciation: generateSkillFeedback('pronunciation', scores.pronunciation),
    fluency: generateSkillFeedback('fluency', scores.fluency),
    vocabulary: generateSkillFeedback('vocabulary', scores.vocabulary),
    grammar: generateSkillFeedback('grammar', scores.grammar)
  };

  return { overallFeedback, skillFeedback };
}

function generateSkillFeedback(skill, score) {
  const feedback = {
    pronunciation: {
      8: "Your pronunciation is highly intelligible with native-like features. Intonation patterns are natural and word stress is consistently accurate.",
      7: "Pronunciation is generally clear with good control of sounds. Some minor accent features are present but don't affect understanding.",
      6: "Pronunciation is mostly intelligible with occasional unclear sounds. Work on specific vowel contrasts and consonant clusters.",
      5: "Pronunciation sometimes affects intelligibility. Focus on basic sound production and word stress patterns.",
      4: "Pronunciation frequently hinders communication. Prioritize mastering basic English sounds and rhythm."
    },
    fluency: {
      8: "You speak fluently with natural pacing, appropriate pausing, and sophisticated use of discourse markers.",
      7: "Fluency is generally good with occasional hesitations. You maintain good flow and use a range of connecting words.",
      6: "You can maintain speech flow but with noticeable pauses and some repetition. Practice speaking at length on various topics.",
      5: "Speech is hesitant with frequent pauses and reliance on basic connectors. Focus on building speaking confidence.",
      4: "Significant difficulty maintaining speech flow. Start with short, prepared responses and gradually increase complexity."
    },
    vocabulary: {
      8: "You use a wide and sophisticated vocabulary precisely. Idiomatic language is used naturally and appropriately.",
      7: "Good range of vocabulary used appropriately. You can express ideas clearly with some less common lexical items.",
      6: "Adequate vocabulary for familiar topics. Work on expanding your lexical range and using more precise word choices.",
      5: "Limited vocabulary that sometimes requires circumlocution. Focus on building core vocabulary for common topics.",
      4: "Very basic vocabulary with frequent searching for words. Start with high-frequency words and phrases."
    },
    grammar: {
      8: "You demonstrate full grammatical control with accurate and sophisticated complex structures used flexibly.",
      7: "Good grammatical control with occasional minor errors. You use a mix of simple and complex structures effectively.",
      6: "You use a mix of structures with some errors. Focus on verb tense consistency and complex sentence construction.",
      5: "Frequent grammatical errors that sometimes affect meaning. Master basic sentence structures before moving to complex ones.",
      4: "Limited grammatical control with basic errors throughout. Focus on present, past, and future simple tenses."
    }
  };

  const level = score >= 8 ? 8 : score >= 7 ? 7 : score >= 6 ? 6 : score >= 5 ? 5 : 4;
  return feedback[skill][level];
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Speaking Assessment API is running' });
});

app.get('/api/assessment', (req, res) => {
  res.json(assessmentData);
});

app.post('/api/update-scores', (req, res) => {
  try {
    const { scores } = req.body;
    
    if (!scores) {
      return res.status(400).json({ 
        success: false, 
        error: 'Scores are required' 
      });
    }

    // Validate scores are between 0-9
    const scoreEntries = Object.entries(scores);
    const isValid = scoreEntries.every(([key, value]) => {
      if (typeof value !== 'number' || value < 0 || value > 9) {
        return false;
      }
      return true;
    });

    if (!isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid scores. All scores must be numbers between 0 and 9.' 
      });
    }

    // Update scores
    assessmentData.scores = scores;
    
    // Generate new feedback based on updated scores
    const { overallFeedback, skillFeedback } = generateFeedback(scores);
    assessmentData.overallFeedback = overallFeedback;
    assessmentData.skillFeedback = skillFeedback;

    res.json({ 
      success: true, 
      message: 'Scores updated successfully',
      data: assessmentData
    });
  } catch (error) {
    console.error('Error updating scores:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

app.post('/api/reset-scores', (req, res) => {
  try {
    // Reset to default scores
    assessmentData.scores = {
      overall: 7.0,
      pronunciation: 7.5,
      fluency: 6.5,
      vocabulary: 7.0,
      grammar: 6.5
    };
    
    const { overallFeedback, skillFeedback } = generateFeedback(assessmentData.scores);
    assessmentData.overallFeedback = overallFeedback;
    assessmentData.skillFeedback = skillFeedback;

    res.json({ 
      success: true, 
      message: 'Scores reset to default',
      data: assessmentData
    });
  } catch (error) {
    console.error('Error resetting scores:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});