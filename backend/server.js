import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import * as pdf from "pdf-parse";
import axios from "axios";

import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration for CV summarizer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Helper function to extract text from PDF
async function extractTextFromPDF(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error("PDF Parse Error:", error.message);
    throw new Error('Failed to parse PDF. The file might be corrupted or password protected.');
  }
}

// Helper function to call Gemini API
async function generateSummaryWithGemini(text, jobPosition = '') {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key not configured or is still using placeholder');
    }

    // Enhanced prompt for better CV analysis
    const prompt = `
      You are an expert HR recruiter. Analyze this CV and provide a detailed professional summary.
      
      Job Position: ${jobPosition || 'Not specified'}
      
      CV Content:
      ${text.substring(0, 20000)}
      
      Please provide a comprehensive analysis in the following format:
      
      **PROFESSIONAL SUMMARY:**
      [Write a 3-4 sentence overview highlighting career trajectory, core competencies, and major achievements]
      
      **KEY QUALIFICATIONS:**
      • [Most relevant skill/experience 1]
      • [Most relevant skill/experience 2]
      • [Most relevant skill/experience 3]
      • [Most relevant skill/experience 4]
      
      **TECHNICAL EXPERTISE:**
      • [Technical skill 1]: [Proficiency level - Beginner/Intermediate/Expert]
      • [Technical skill 2]: [Proficiency level - Beginner/Intermediate/Expert]
      • [Technical skill 3]: [Proficiency level - Beginner/Intermediate/Expert]
      
      **WORK EXPERIENCE HIGHLIGHTS:**
      1. [Most recent/relevant role]:
         • [Key achievement 1]
         • [Key achievement 2]
      
      2. [Previous role]:
         • [Key achievement 1]
         • [Key achievement 2]
      
      **EDUCATION & CERTIFICATIONS:**
      • [Highest degree/Relevant certification 1]
      • [Other relevant education/certification 2]
      
      **CAREER PROGRESSION ANALYSIS:**
      [Analyze career growth, promotions, increasing responsibilities]
      
      **RECOMMENDATION FOR HIRING:**
      [Based on the CV analysis, provide hiring recommendation with specific reasons]
      
      **INTERVIEW FOCUS AREAS:**
      1. [Area 1 to probe during interview]
      2. [Area 2 to probe during interview]
      3. [Area 3 to probe during interview]
    `;

    const model = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
    
    console.log(`Calling Gemini API with model: ${model}`);
    
    const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      }
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    }
  );

    if (response.data && response.data.candidates && response.data.candidates[0]) {
      const generatedText = response.data.candidates[0].content.parts[0].text;
      console.log(`Gemini API Success: Generated ${generatedText.length} characters`);
      return generatedText;
    } else {
      console.error('Unexpected Gemini API response:', response.data);
      throw new Error('Unexpected response format from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method
      }
    });
    
    if (error.response?.status === 400) {
      throw new Error('Gemini API: Invalid request. Check your API key and quota.');
    } else if (error.response?.status === 403) {
      throw new Error('Gemini API: Permission denied. Check if your API key is valid and has proper permissions.');
    } else if (error.response?.status === 429) {
      throw new Error('Gemini API: Rate limit exceeded. Please try again later.');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to Gemini API. Check your internet connection.');
    } else {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
  }
}

// Routes
app.use("/api/users", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Recruitment API is running',
    timestamp: new Date().toISOString(),
    services: {
      auth: true,
      cvSummarizer: true,
      geminiApi: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    },
    config: {
      port: PORT,
      allowedOrigins: process.env.ALLOWED_ORIGINS,
      geminiModel: process.env.GEMINI_MODEL
    }
  });
});

// Test endpoint to verify Gemini API
app.get("/api/test/gemini", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key not configured in environment variables',
        tip: 'Please set GEMINI_API_KEY in your .env file'
      });
    }

    console.log("Testing Gemini API with key:", apiKey.substring(0, 10) + '...');
    
    // Use the same model as configured
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: "Respond with 'Gemini API is working correctly' if you can read this message."
          }]
        }],
        generationConfig: {
          maxOutputTokens: 100,
        }
      },
      {
        timeout: 10000
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    
    res.json({
      success: true,
      message: 'Gemini API connection successful!',
      response: result,
      model: model,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Gemini Test Error:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Failed to connect to Gemini API',
      details: error.message,
      response: error.response?.data,
      tip: 'Check if your API key is valid and has quota available at https://aistudio.google.com/'
    });
  }
});

// Add this endpoint after the test endpoint
app.get("/api/test/gemini/models", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key not configured'
      });
    }

    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
      {
        timeout: 10000
      }
    );

    // Filter for text generation models only
    const textModels = response.data.models.filter(m => 
      m.supportedGenerationMethods && 
      m.supportedGenerationMethods.includes('generateContent')
    );

    res.json({
      success: true,
      models: textModels.map(m => ({
        name: m.name,
        displayName: m.displayName,
        description: m.description,
        inputTokenLimit: m.inputTokenLimit,
        outputTokenLimit: m.outputTokenLimit
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to list models:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Failed to list models',
      details: error.message,
      response: error.response?.data
    });
  }
});

// CV Summarizer Routes
app.post("/api/cv/summarize/upload", upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded. Please select a PDF file.' 
      });
    }

    const { jobPosition = '', applicationId = '' } = req.body;
    
    console.log(`Processing CV upload: ${req.file.originalname}, Job: ${jobPosition}, App ID: ${applicationId}`);
    
    // Extract text from PDF
    const text = await extractTextFromPDF(req.file.buffer);
    
    console.log(`Extracted ${text.length} characters from PDF`);
    
    if (!text || text.trim().length < 100) {
      return res.status(400).json({ 
        success: false,
        error: 'PDF contains insufficient text (less than 100 characters). The file might be scanned or empty.' 
      });
    }

    // Generate summary using Gemini
    console.log('Generating summary with Gemini API...');
    const summary = await generateSummaryWithGemini(text, jobPosition);
    
    console.log(`Summary generated successfully (${summary.length} characters)`);
    
    res.json({
      success: true,
      summary: summary,
      metadata: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        textLength: text.length,
        jobPosition: jobPosition,
        applicationId: applicationId,
        generatedAt: new Date().toISOString(),
        model: process.env.GEMINI_MODEL || 'gemini-1.5-pro'
      }
    });
  } catch (error) {
    console.error('Error in summarize upload:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to generate summary',
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

// Generate summary from text
app.post("/api/cv/summarize/text", async (req, res) => {
  try {
    const { text, jobPosition = '', applicationId = '' } = req.body;
    
    if (!text || text.trim().length < 100) {
      return res.status(400).json({ 
        success: false,
        error: 'Text is too short or empty (minimum 100 characters required)' 
      });
    }

    console.log(`Generating summary from text (${text.length} chars), Job: ${jobPosition}`);
    
    const summary = await generateSummaryWithGemini(text, jobPosition);
    
    res.json({
      success: true,
      summary: summary,
      metadata: {
        textLength: text.length,
        jobPosition: jobPosition,
        applicationId: applicationId,
        generatedAt: new Date().toISOString(),
        model: process.env.GEMINI_MODEL || 'gemini-1.5-pro'
      }
    });
  } catch (error) {
    console.error('Error in summarize text:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to generate summary'
    });
  }
});

// Generate summary from URL
app.post("/api/cv/summarize/url", async (req, res) => {
  try {
    const { cvUrl, jobPosition = '', applicationId = '' } = req.body;
    
    if (!cvUrl) {
      return res.status(400).json({ 
        success: false,
        error: 'CV URL is required' 
      });
    }

    console.log(`Processing CV from URL: ${cvUrl}, Job: ${jobPosition}`);
    
    // Fetch PDF from URL
    const response = await axios.get(cvUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Empty response from URL');
    }

    // Extract text from PDF
    const text = await extractTextFromPDF(Buffer.from(response.data));
    
    console.log(`Extracted ${text.length} characters from URL PDF`);
    
    if (!text || text.trim().length < 100) {
      return res.status(400).json({ 
        success: false,
        error: 'PDF contains insufficient text (less than 100 characters). The file might be scanned or empty.' 
      });
    }

    // Generate summary using Gemini
    const summary = await generateSummaryWithGemini(text, jobPosition);
    
    res.json({
      success: true,
      summary: summary,
      metadata: {
        cvUrl: cvUrl,
        textLength: text.length,
        jobPosition: jobPosition,
        applicationId: applicationId,
        generatedAt: new Date().toISOString(),
        model: process.env.GEMINI_MODEL || 'gemini-1.5-pro'
      }
    });
  } catch (error) {
    console.error('Error in summarize URL:', error.message);
    
    let errorMessage = error.message;
    if (error.code === 'ENOTFOUND') {
      errorMessage = 'Could not reach the CV URL. Please check the URL is valid and accessible.';
    } else if (error.response?.status === 404) {
      errorMessage = 'CV not found at the provided URL.';
    } else if (error.response?.status === 403) {
      errorMessage = 'Access denied to the CV URL.';
    }
    
    res.status(500).json({ 
      success: false,
      error: errorMessage || 'Failed to generate summary from URL'
    });
  }
});

// Error handling for file uploads
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false,
        error: 'File size too large. Maximum size is 10MB' 
      });
    }
    return res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
  
  console.error('Server Error:', err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
  console.log(`🌍 Allowed Origins: ${process.env.ALLOWED_ORIGINS}`);
  console.log(`🤖 Gemini Model: ${process.env.GEMINI_MODEL || 'gemini-1.5-pro'}`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ NOT CONFIGURED'}`);
  console.log(`📁 Frontend API URL: ${process.env.REACT_APP_API_URL || 'Not set'}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Test Gemini: http://localhost:${PORT}/api/test/gemini`);
});