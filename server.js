const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { identifyFoodFromBase64 } = require('./gemini-api-utils');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
// Increase body size limit to handle base64 images (15MB)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(express.static('public'));

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

/**
 * POST /api/identify
 * Accepts base64 image or multipart form data
 */
app.post('/api/identify', upload.single('image'), async (req, res) => {
  try {
    let imageBase64;
    let mimeType;

    // Handle multipart form data
    if (req.file) {
      imageBase64 = req.file.buffer.toString('base64');
      mimeType = req.file.mimetype;
    } 
    // Handle base64 from JSON body
    else if (req.body.image) {
      const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, '');
      imageBase64 = base64Data;
      mimeType = req.body.image.match(/data:image\/(\w+);base64/)?.[1] || 'jpeg';
      mimeType = `image/${mimeType}`;
    } 
    else {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_IMAGE',
          message: 'No image provided. Please upload an image.'
        }
      });
    }

    // Use base64 directly with utility function
    const language = req.body.language || 'en';
    const result = await identifyFoodFromBase64(imageBase64, mimeType, language);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message || 'An unexpected error occurred'
      }
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/identify`);
});

