#!/usr/bin/env node

/**
 * Gemini API Script
 * Calls Google Gemini API to identify Vietnamese street food from images
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load environment variables if .env file exists
require('dotenv').config();

// Get API key from environment variable
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY environment variable is not set.');
  console.error('Please set it in your .env file or export it:');
  console.error('  export GEMINI_API_KEY=your_api_key_here');
  process.exit(1);
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Convert image file to base64
 */
function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = path.extname(imagePath).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
    return {
      data: base64Image,
      mimeType: mimeType
    };
  } catch (error) {
    throw new Error(`Failed to read image file: ${error.message}`);
  }
}

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
 * Handles cases where response might be wrapped in markdown code blocks
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
 * Call Gemini API with image
 */
async function identifyFood(imagePath, language = 'en') {
  try {
    console.log('📸 Loading image...');
    const imageData = imageToBase64(imagePath);
    
    console.log('🤖 Calling Gemini API...');
    const prompt = generatePrompt();
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageData.data,
          mimeType: imageData.mimeType
        }
      }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    console.log('📝 Parsing response...');
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

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('📋 Usage: node gemini-api.js <image-path> [language]');
    console.log('');
    console.log('Examples:');
    console.log('  node gemini-api.js ./test-images/pho.jpg');
    console.log('  node gemini-api.js ./test-images/banh-mi.jpg en');
    console.log('');
    process.exit(1);
  }
  
  const imagePath = args[0];
  const language = args[1] || 'en';
  
  // Check if image file exists
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Error: Image file not found: ${imagePath}`);
    process.exit(1);
  }
  
  console.log(`🍜 Vietnamese Street Food Scanner`);
  console.log(`📁 Image: ${imagePath}`);
  console.log(`🌐 Language: ${language}`);
  console.log('');
  
  const result = await identifyFood(imagePath, language);
  
  console.log('');
  console.log('📊 Result:');
  console.log(JSON.stringify(result, null, 2));
  
  if (result.success) {
    console.log('');
    console.log('✅ Success! Food identified.');
  } else {
    console.log('');
    console.log('❌ Failed to identify food.');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { identifyFood, imageToBase64 };

