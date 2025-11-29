/**
 * Utility functions for Gemini API
 * Helper to convert base64 directly without file system
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY environment variable is not set.');
}

// Initialize Gemini
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }) : null;

/**
 * Generate the prompt for Gemini
 */
function generatePrompt() {
  return `You are a Vietnamese street food expert. Analyze this image and return ONLY a JSON object with the following structure. Do not include any markdown formatting or explanation.

{
  "name": {
    "vietnamese": "string",
    "english": "string", 
    "pronunciation": "string"
  },
  "description": "string (max 100 words)",
  "ingredients": ["string"],
  "calories": {
    "estimate": number,
    "range": "string"
  },
  "allergens": ["string"],
  "spiceLevel": "mild" | "medium" | "hot",
  "culturalNote": "string (max 50 words)",
  "confidence": number (0-1)
}

If the image is not food, return: {"error": "NOT_FOOD"}`;
}

/**
 * Parse JSON from Gemini response
 */
function parseJSONResponse(text) {
  // Try to extract JSON from markdown code blocks if present
  const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1]);
  }
  
  // Try to find JSON object in the text
  const jsonObjectMatch = text.match(/\{[\s\S]*\}/);
  if (jsonObjectMatch) {
    return JSON.parse(jsonObjectMatch[0]);
  }
  
  // If no match, try parsing the whole text
  return JSON.parse(text);
}

/**
 * Identify food from base64 image data
 */
async function identifyFoodFromBase64(base64Data, mimeType = 'image/jpeg') {
  if (!model) {
    throw new Error('Gemini API not initialized. Please set GEMINI_API_KEY.');
  }

  try {
    const prompt = generatePrompt();
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    const jsonResponse = parseJSONResponse(text);
    
    // Check for error
    if (jsonResponse.error === 'NOT_FOOD') {
      return {
        success: false,
        error: {
          code: 'NOT_FOOD',
          message: 'The image doesn\'t appear to contain food. Please try another photo.'
        }
      };
    }
    
    return {
      success: true,
      data: jsonResponse
    };
    
  } catch (error) {
    console.error('❌ Error calling Gemini API:', error.message);
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: error.message
      }
    };
  }
}

module.exports = { identifyFoodFromBase64 };

