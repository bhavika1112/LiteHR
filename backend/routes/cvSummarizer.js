import express from 'express';
import multer from 'multer';
import { 
  extractTextFromPDF, 
  generateSummaryWithGemini 
} from '../controllers/cvSummarizer.js';

const router = express.Router();

// File upload configuration
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

// Upload CV and generate summary
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded' 
      });
    }

    const { jobPosition } = req.body;
    
    // Extract text from PDF
    const text = await extractTextFromPDF(req.file.buffer);
    
    if (!text || text.trim().length < 50) {
      return res.status(400).json({ 
        success: false,
        error: 'PDF contains insufficient text or is not readable' 
      });
    }

    // Generate summary using Gemini
    const summary = await generateSummaryWithGemini(text, jobPosition);
    
    res.json({
      success: true,
      summary: summary,
      metadata: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        textLength: text.length,
        jobPosition: jobPosition || 'Not specified'
      }
    });
  } catch (error) {
    console.error('Error in summarize upload:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to generate summary'
    });
  }
});

// Generate summary from text
router.post('/text', async (req, res) => {
  try {
    const { text, jobPosition } = req.body;
    
    if (!text || text.trim().length < 50) {
      return res.status(400).json({ 
        success: false,
        error: 'Text is too short or empty' 
      });
    }

    const summary = await generateSummaryWithGemini(text, jobPosition);
    
    res.json({
      success: true,
      summary: summary,
      metadata: {
        textLength: text.length,
        jobPosition: jobPosition || 'Not specified'
      }
    });
  } catch (error) {
    console.error('Error in summarize text:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to generate summary'
    });
  }
});

// Generate summary from URL
router.post('/url', async (req, res) => {
  try {
    const { cvUrl, jobPosition } = req.body;
    
    if (!cvUrl) {
      return res.status(400).json({ 
        success: false,
        error: 'CV URL is required' 
      });
    }

    const response = await axios.get(cvUrl, {
      responseType: 'arraybuffer'
    });

    const text = await extractTextFromPDF(Buffer.from(response.data));
    
    if (!text || text.trim().length < 50) {
      return res.status(400).json({ 
        success: false,
        error: 'PDF contains insufficient text or is not readable' 
      });
    }

    const summary = await generateSummaryWithGemini(text, jobPosition);
    
    res.json({
      success: true,
      summary: summary,
      metadata: {
        cvUrl: cvUrl,
        textLength: text.length,
        jobPosition: jobPosition || 'Not specified'
      }
    });
  } catch (error) {
    console.error('Error in summarize URL:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to generate summary'
    });
  }
});

export default router;