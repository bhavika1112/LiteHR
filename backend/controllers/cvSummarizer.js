import pdf from 'pdf-parse';
import axios from 'axios';

// Helper function to extract text from PDF
export const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to parse PDF: ' + error.message);
  }
};

// Helper function to call Gemini API
export const generateSummaryWithGemini = async (text, jobPosition = '') => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `
      Analyze this CV and provide a comprehensive summary. 
      ${jobPosition ? `The candidate applied for: ${jobPosition}` : ''}
      
      Please provide the summary in the following structure:
      
      **Professional Summary:**
      [Brief overview of the candidate's profile]
      
      **Key Highlights:**
      - [Key point 1]
      - [Key point 2]
      - [Key point 3]
      
      **Technical Skills Assessment:**
      - [Skill 1]: [Level]
      - [Skill 2]: [Level]
      
      **Experience Breakdown:**
      1. [Company/Role]: [Key achievements]
      
      **Education & Certifications:**
      - [Degree/Certification]: [Details]
      
      **Strengths:**
      - [Strength 1]
      - [Strength 2]
      
      **Recommendations:**
      [Hiring recommendations and next steps]
      
      CV Content:
      ${text.substring(0, 15000)} // Limit text to avoid token limits
    `;

    const model = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
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
          maxOutputTokens: 2048,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.candidates && response.data.candidates[0]) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected response format from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
};

// Test Gemini API connection
export const testGeminiAPI = async () => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'API key not configured' };
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: "Hello, can you respond with 'Gemini API is working'?"
          }]
        }]
      }
    );

    return {
      success: true,
      message: response.data.candidates[0].content.parts[0].text
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};