// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Default student data
// let studentData = {
//     overall: 7.0,
//     pronunciation: 7.5,
//     fluency: 6.5,
//     vocabulary: 7.0,
//     grammar: 6.5,
//     studentName: "Alex Johnson",
//     studentId: "STU-2023-001",
//     testType: "IELTS Speaking Mock Test"
// };

// // Helper function to calculate overall score
// function calculateOverallScore(skills) {
//     // Weighted average calculation
//     const weights = {
//         pronunciation: 0.25,
//         fluency: 0.25,
//         vocabulary: 0.25,
//         grammar: 0.25
//     };
    
//     let total = 0;
//     total += skills.pronunciation * weights.pronunciation;
//     total += skills.fluency * weights.fluency;
//     total += skills.vocabulary * weights.vocabulary;
//     total += skills.grammar * weights.grammar;
    
//     // Round to nearest 0.5
//     return Math.round(total * 2) / 2;
// }

// // API Endpoints

// // Get current scores
// app.get('/api/scores', (req, res) => {
//     res.json({
//         success: true,
//         data: studentData,
//         message: "Scores retrieved successfully"
//     });
// });

// // Update scores
// app.post('/api/scores/update', (req, res) => {
//     try {
//         const { pronunciation, fluency, vocabulary, grammar } = req.body;
        
//         // Validate input
//         if ([pronunciation, fluency, vocabulary, grammar].some(score => 
//             score < 0 || score > 9 || typeof score !== 'number')) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All scores must be numbers between 0 and 9"
//             });
//         }
        
//         // Update individual scores
//         studentData.pronunciation = pronunciation;
//         studentData.fluency = fluency;
//         studentData.vocabulary = vocabulary;
//         studentData.grammar = grammar;
        
//         // Calculate new overall score
//         studentData.overall = calculateOverallScore({
//             pronunciation,
//             fluency,
//             vocabulary,
//             grammar
//         });
        
//         // Get feedback based on scores
//         const feedback = generateFeedback(studentData);
        
//         res.json({
//             success: true,
//             data: {
//                 ...studentData,
//                 feedback
//             },
//             message: "Scores updated successfully"
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error updating scores",
//             error: error.message
//         });
//     }
// });

// // Reset to default
// app.post('/api/scores/reset', (req, res) => {
//     studentData = {
//         overall: 7.0,
//         pronunciation: 7.5,
//         fluency: 6.5,
//         vocabulary: 7.0,
//         grammar: 6.5,
//         studentName: "Alex Johnson",
//         studentId: "STU-2023-001",
//         testType: "IELTS Speaking Mock Test"
//     };
    
//     res.json({
//         success: true,
//         data: studentData,
//         message: "Scores reset to default"
//     });
// });

// // Generate feedback based on scores
// function generateFeedback(data) {
//     const feedback = {
//         overall: "",
//         pronunciation: "",
//         fluency: "",
//         vocabulary: "",
//         grammar: "",
//         improvementTips: [
//             "Practice speaking for 10 minutes daily",
//             "Record and review your own speech",
//             "Expand vocabulary with topic-specific words",
//             "Join speaking clubs or conversation groups"
//         ]
//     };
    
//     // Overall feedback
//     if (data.overall >= 8) {
//         feedback.overall = "Excellent performance with strong control of language features. You speak fluently with only rare errors that don't affect communication. Your pronunciation and vocabulary are particularly impressive.";
//     } else if (data.overall >= 7) {
//         feedback.overall = "Good performance with clear communication. You demonstrate the ability to discuss familiar topics with some detail and maintain good coherence. Pronunciation is a particular strength, while fluency could be improved with more practice.";
//     } else if (data.overall >= 6) {
//         feedback.overall = "Competent performance despite some errors. You can generally handle communication on familiar topics but may struggle with more complex subjects. Focus on increasing fluency and expanding your grammatical range.";
//     } else if (data.overall >= 5) {
//         feedback.overall = "Modest performance with basic communication skills. You can handle simple exchanges but struggle with complex topics. Focus on building foundational language skills through regular practice.";
//     } else {
//         feedback.overall = "Needs improvement in foundational language skills. Focus on building core vocabulary, basic sentence structures, and pronunciation fundamentals through regular, structured practice.";
//     }
    
//     // Pronunciation feedback
//     if (data.pronunciation >= 8) {
//         feedback.pronunciation = "Your pronunciation is excellent with native-like intonation and stress patterns. Vowel and consonant sounds are produced accurately, making your speech highly intelligible.";
//     } else if (data.pronunciation >= 7) {
//         feedback.pronunciation = "Your pronunciation is generally clear with good intonation patterns. Some vowel sounds could be more distinct for better clarity, but overall intelligibility is good.";
//     } else if (data.pronunciation >= 6) {
//         feedback.pronunciation = "Pronunciation is mostly intelligible with occasional unclear sounds. Work on specific vowel contrasts and consonant clusters to improve clarity.";
//     } else {
//         feedback.pronunciation = "Pronunciation sometimes affects intelligibility. Focus on basic sound production, word stress patterns, and intonation contours.";
//     }
    
//     // Fluency feedback
//     if (data.fluency >= 8) {
//         feedback.fluency = "You speak fluently with natural pacing, appropriate pausing, and sophisticated use of discourse markers. Speech flow is smooth and effortless.";
//     } else if (data.fluency >= 7) {
//         feedback.fluency = "Fluency is generally good with occasional hesitations. You maintain good flow and use a range of connecting words effectively.";
//     } else if (data.fluency >= 6) {
//         feedback.fluency = "You can maintain speech flow but with noticeable pauses and some repetition. Practice speaking at length on various topics to build confidence.";
//     } else {
//         feedback.fluency = "Speech is hesitant with frequent pauses and reliance on basic connectors. Focus on building speaking confidence through regular practice.";
//     }
    
//     // Vocabulary feedback
//     if (data.vocabulary >= 8) {
//         feedback.vocabulary = "You use a wide and sophisticated vocabulary precisely. Idiomatic language is used naturally and appropriately across different contexts.";
//     } else if (data.vocabulary >= 7) {
//         feedback.vocabulary = "Good range of vocabulary used appropriately. You can express ideas clearly with some less common lexical items. Consider incorporating more topic-specific terminology.";
//     } else if (data.vocabulary >= 6) {
//         feedback.vocabulary = "Adequate vocabulary for familiar topics. Work on expanding your lexical range and using more precise word choices to express complex ideas.";
//     } else {
//         feedback.vocabulary = "Limited vocabulary that sometimes requires circumlocution. Focus on building core vocabulary for common topics and learning useful phrases.";
//     }
    
//     // Grammar feedback
//     if (data.grammar >= 8) {
//         feedback.grammar = "You demonstrate full grammatical control with accurate and sophisticated complex structures used flexibly. Errors are rare and don't affect communication.";
//     } else if (data.grammar >= 7) {
//         feedback.grammar = "Good grammatical control with occasional minor errors. You use a mix of simple and complex structures effectively. Watch subject-verb agreement in longer sentences.";
//     } else if (data.grammar >= 6) {
//         feedback.grammar = "You use a mix of structures with some errors that occasionally affect meaning. Focus on verb tense consistency and complex sentence construction.";
//     } else {
//         feedback.grammar = "Frequent grammatical errors that sometimes affect meaning. Master basic sentence structures before moving to more complex ones.";
//     }
    
//     return feedback;
// }

// // Update student info
// app.post('/api/student/update', (req, res) => {
//     try {
//         const { studentName, studentId, testType } = req.body;
        
//         if (studentName) studentData.studentName = studentName;
//         if (studentId) studentData.studentId = studentId;
//         if (testType) studentData.testType = testType;
        
//         res.json({
//             success: true,
//             data: studentData,
//             message: "Student information updated successfully"
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error updating student information",
//             error: error.message
//         });
//     }
// });

// // Generate report (simulated)
// app.post('/api/report/download', (req, res) => {
//     try {
//         // In a real application, you would generate a PDF here
//         // For now, we'll return a success message
//         const reportContent = `
//             SPEAKING ASSESSMENT REPORT
//             ===========================
            
//             Student: ${studentData.studentName}
//             Student ID: ${studentData.studentId}
//             Test Type: ${studentData.testType}
//             Test Date: ${new Date().toLocaleDateString()}
            
//             OVERALL SCORE: ${studentData.overall}/9.0
            
//             SKILL SCORES:
//             - Pronunciation: ${studentData.pronunciation}/9.0
//             - Fluency: ${studentData.fluency}/9.0
//             - Vocabulary: ${studentData.vocabulary}/9.0
//             - Grammar: ${studentData.grammar}/9.0
            
//             Report generated by SpeakMaster Assessment System
//             © ${new Date().getFullYear()} SpeakMaster
//         `;
        
//         res.json({
//             success: true,
//             message: "Report generated successfully",
//             reportContent: reportContent,
//             timestamp: new Date().toISOString()
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error generating report",
//             error: error.message
//         });
//     }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//     res.json({
//         success: true,
//         message: "SpeakMaster API is running",
//         timestamp: new Date().toISOString(),
//         version: "1.0.0"
//     });
// });

// // Serve the main HTML file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`SpeakMaster server running on port ${PORT}`);
//     console.log(`Access the application at http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Default student data
let studentData = {
    overall: 7.0,
    pronunciation: 7.5,
    fluency: 6.5,
    vocabulary: 7.0,
    grammar: 6.5,
    studentName: "Alex Johnson",
    studentId: "STU-2023-001",
    testType: "IELTS Speaking Mock Test"
};

// Helper function to calculate overall score
function calculateOverallScore(skills) {
    // Weighted average calculation
    const weights = {
        pronunciation: 0.25,
        fluency: 0.25,
        vocabulary: 0.25,
        grammar: 0.25
    };
    
    let total = 0;
    total += skills.pronunciation * weights.pronunciation;
    total += skills.fluency * weights.fluency;
    total += skills.vocabulary * weights.vocabulary;
    total += skills.grammar * weights.grammar;
    
    // Round to nearest 0.5
    return Math.round(total * 2) / 2;
}

// API Endpoints

// Get current scores
app.get('/api/scores', (req, res) => {
    res.json({
        success: true,
        data: studentData,
        message: "Scores retrieved successfully"
    });
});

// Update scores
app.post('/api/scores/update', (req, res) => {
    try {
        const { pronunciation, fluency, vocabulary, grammar } = req.body;
        
        // Validate input
        if ([pronunciation, fluency, vocabulary, grammar].some(score => 
            score < 0 || score > 9 || typeof score !== 'number')) {
            return res.status(400).json({
                success: false,
                message: "All scores must be numbers between 0 and 9"
            });
        }
        
        // Update individual scores
        studentData.pronunciation = pronunciation;
        studentData.fluency = fluency;
        studentData.vocabulary = vocabulary;
        studentData.grammar = grammar;
        
        // Calculate new overall score
        studentData.overall = calculateOverallScore({
            pronunciation,
            fluency,
            vocabulary,
            grammar
        });
        
        // Get feedback based on scores
        const feedback = generateFeedback(studentData);
        
        res.json({
            success: true,
            data: {
                ...studentData,
                feedback
            },
            message: "Scores updated successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating scores",
            error: error.message
        });
    }
});

// Reset to default
app.post('/api/scores/reset', (req, res) => {
    studentData = {
        overall: 7.0,
        pronunciation: 7.5,
        fluency: 6.5,
        vocabulary: 7.0,
        grammar: 6.5,
        studentName: "Alex Johnson",
        studentId: "STU-2023-001",
        testType: "IELTS Speaking Mock Test"
    };
    
    res.json({
        success: true,
        data: studentData,
        message: "Scores reset to default"
    });
});

// Generate feedback based on scores
function generateFeedback(data) {
    const feedback = {
        overall: "",
        pronunciation: "",
        fluency: "",
        vocabulary: "",
        grammar: "",
        improvementTips: [
            "Practice speaking for 10 minutes daily",
            "Record and review your own speech",
            "Expand vocabulary with topic-specific words",
            "Join speaking clubs or conversation groups"
        ]
    };
    
    // Overall feedback
    if (data.overall >= 8) {
        feedback.overall = "Excellent performance with strong control of language features. You speak fluently with only rare errors that don't affect communication. Your pronunciation and vocabulary are particularly impressive.";
    } else if (data.overall >= 7) {
        feedback.overall = "Good performance with clear communication. You demonstrate the ability to discuss familiar topics with some detail and maintain good coherence. Pronunciation is a particular strength, while fluency could be improved with more practice.";
    } else if (data.overall >= 6) {
        feedback.overall = "Competent performance despite some errors. You can generally handle communication on familiar topics but may struggle with more complex subjects. Focus on increasing fluency and expanding your grammatical range.";
    } else if (data.overall >= 5) {
        feedback.overall = "Modest performance with basic communication skills. You can handle simple exchanges but struggle with complex topics. Focus on building foundational language skills through regular practice.";
    } else {
        feedback.overall = "Needs improvement in foundational language skills. Focus on building core vocabulary, basic sentence structures, and pronunciation fundamentals through regular, structured practice.";
    }
    
    // Pronunciation feedback
    if (data.pronunciation >= 8) {
        feedback.pronunciation = "Your pronunciation is excellent with native-like intonation and stress patterns. Vowel and consonant sounds are produced accurately, making your speech highly intelligible.";
    } else if (data.pronunciation >= 7) {
        feedback.pronunciation = "Your pronunciation is generally clear with good intonation patterns. Some vowel sounds could be more distinct for better clarity, but overall intelligibility is good.";
    } else if (data.pronunciation >= 6) {
        feedback.pronunciation = "Pronunciation is mostly intelligible with occasional unclear sounds. Work on specific vowel contrasts and consonant clusters to improve clarity.";
    } else {
        feedback.pronunciation = "Pronunciation sometimes affects intelligibility. Focus on basic sound production, word stress patterns, and intonation contours.";
    }
    
    // Fluency feedback
    if (data.fluency >= 8) {
        feedback.fluency = "You speak fluently with natural pacing, appropriate pausing, and sophisticated use of discourse markers. Speech flow is smooth and effortless.";
    } else if (data.fluency >= 7) {
        feedback.fluency = "Fluency is generally good with occasional hesitations. You maintain good flow and use a range of connecting words effectively.";
    } else if (data.fluency >= 6) {
        feedback.fluency = "You can maintain speech flow but with noticeable pauses and some repetition. Practice speaking at length on various topics to build confidence.";
    } else {
        feedback.fluency = "Speech is hesitant with frequent pauses and reliance on basic connectors. Focus on building speaking confidence through regular practice.";
    }
    
    // Vocabulary feedback
    if (data.vocabulary >= 8) {
        feedback.vocabulary = "You use a wide and sophisticated vocabulary precisely. Idiomatic language is used naturally and appropriately across different contexts.";
    } else if (data.vocabulary >= 7) {
        feedback.vocabulary = "Good range of vocabulary used appropriately. You can express ideas clearly with some less common lexical items. Consider incorporating more topic-specific terminology.";
    } else if (data.vocabulary >= 6) {
        feedback.vocabulary = "Adequate vocabulary for familiar topics. Work on expanding your lexical range and using more precise word choices to express complex ideas.";
    } else {
        feedback.vocabulary = "Limited vocabulary that sometimes requires circumlocution. Focus on building core vocabulary for common topics and learning useful phrases.";
    }
    
    // Grammar feedback
    if (data.grammar >= 8) {
        feedback.grammar = "You demonstrate full grammatical control with accurate and sophisticated complex structures used flexibly. Errors are rare and don't affect communication.";
    } else if (data.grammar >= 7) {
        feedback.grammar = "Good grammatical control with occasional minor errors. You use a mix of simple and complex structures effectively. Watch subject-verb agreement in longer sentences.";
    } else if (data.grammar >= 6) {
        feedback.grammar = "You use a mix of structures with some errors that occasionally affect meaning. Focus on verb tense consistency and complex sentence construction.";
    } else {
        feedback.grammar = "Frequent grammatical errors that sometimes affect meaning. Master basic sentence structures before moving to more complex ones.";
    }
    
    return feedback;
}

// Update student info
app.post('/api/student/update', (req, res) => {
    try {
        const { studentName, studentId, testType } = req.body;
        
        if (studentName) studentData.studentName = studentName;
        if (studentId) studentData.studentId = studentId;
        if (testType) studentData.testType = testType;
        
        res.json({
            success: true,
            data: studentData,
            message: "Student information updated successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating student information",
            error: error.message
        });
    }
});

// Generate report (simulated)
app.post('/api/report/download', (req, res) => {
    try {
        // In a real application, you would generate a PDF here
        // For now, we'll return a success message
        const reportContent = `
            SPEAKING ASSESSMENT REPORT
            ===========================
            
            Student: ${studentData.studentName}
            Student ID: ${studentData.studentId}
            Test Type: ${studentData.testType}
            Test Date: ${new Date().toLocaleDateString()}
            
            OVERALL SCORE: ${studentData.overall}/9.0
            
            SKILL SCORES:
            - Pronunciation: ${studentData.pronunciation}/9.0
            - Fluency: ${studentData.fluency}/9.0
            - Vocabulary: ${studentData.vocabulary}/9.0
            - Grammar: ${studentData.grammar}/9.0
            
            Report generated by SpeakMaster Assessment System
            © ${new Date().getFullYear()} SpeakMaster
        `;
        
        res.json({
            success: true,
            message: "Report generated successfully",
            reportContent: reportContent,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating report",
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: "SpeakMaster API is running",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`SpeakMaster server running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
});