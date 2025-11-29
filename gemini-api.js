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
 * Language names mapping for prompt
 */
const LANGUAGE_NAMES = {
  vi: 'Vietnamese',
  en: 'English',
  fr: 'French',
  zh: 'Chinese (Simplified)',
  ja: 'Japanese',
  ko: 'Korean'
};

/**
 * Generate the prompt for Gemini with language support
 * Supports multiple categories: food, drink, dessert, snack
 */
function generatePrompt(language = 'en') {
  const targetLanguage = LANGUAGE_NAMES[language] || 'English';
  
  return `You are a Vietnamese cuisine expert and linguist. Analyze this image and identify the Vietnamese item (food, drink, dessert, snack, etc.).

Return ONLY a JSON object with NO markdown formatting or explanation.

IMPORTANT RULES:
- "vietnamese" name field must ALWAYS be in Vietnamese with proper diacritics/tones
- "pronunciation" field must be IPA transcription of the VIETNAMESE name only
- ALL other text fields must be in ${targetLanguage}
- Choose the correct "category" and include ONLY the fields relevant to that category

=== CATEGORY DETECTION ===
Detect the category based on the item:
- "food": Main dishes, soups, noodles (Phở, Bún, Cơm Tấm, Bánh Cuốn...)
- "drink": Beverages (Cà Phê, Trà, Sinh Tố, Nước Mía, Chè...)
- "dessert": Sweet treats, cakes, pastries (Bánh Flan, Bánh Bò, Bánh Chuối...)
- "snack": Street snacks (Bánh Tráng Trộn, Bột Chiên, Xôi...)

=== RESPONSE STRUCTURE BY CATEGORY ===

**FOR ALL CATEGORIES (required fields):**
{
  "category": "food" | "drink" | "dessert" | "snack",
  "name": {
    "vietnamese": "string (ALWAYS Vietnamese with diacritics)",
    "english": "string (in ${targetLanguage})",
    "pronunciation": {
      "ipa": "string (IPA of Vietnamese name, e.g. /fəː˧˩˧/)",
      "simplified": "string (phonetic guide for ${targetLanguage} speakers)",
      "toneGuide": "string (tone description in ${targetLanguage})"
    }
  },
  "description": "string (max 100 words, in ${targetLanguage})",
  "ingredients": ["string (in ${targetLanguage})"],
  "calories": { "estimate": number, "range": "string" },
  "allergens": ["string (in ${targetLanguage})"],
  "culturalNote": "string (max 50 words, in ${targetLanguage})",
  "confidence": number (0-1)
}

**ADDITIONAL FIELDS BY CATEGORY:**

For "food" ADD:
- "spiceLevel": "none" | "mild" | "medium" | "hot"
- "servingStyle": "string (e.g., 'served with herbs and lime', in ${targetLanguage})"

For "drink" ADD:
- "temperature": "hot" | "cold" | "iced" | "room"
- "sweetnessLevel": "none" | "light" | "medium" | "sweet" | "very_sweet"
- "caffeineContent": "none" | "low" | "medium" | "high" (for coffee/tea)
- "servingSize": "string (e.g., '300ml')"

For "dessert" ADD:
- "sweetnessLevel": "light" | "medium" | "sweet" | "very_sweet"
- "texture": "string (e.g., 'soft and chewy', in ${targetLanguage})"
- "bestServed": "string (e.g., 'chilled', in ${targetLanguage})"

For "snack" ADD:
- "spiceLevel": "none" | "mild" | "medium" | "hot"
- "texture": "string (e.g., 'crispy', in ${targetLanguage})"
- "eatingOccasion": "string (e.g., 'afternoon snack', in ${targetLanguage})"

=== IPA TONE MARKERS ===
Vietnamese 6 tones:
- ngang (level): ˧
- sắc (rising): ˧˥  
- huyền (falling): ˨˩
- hỏi (dipping-rising): ˧˩˧
- ngã (rising glottalized): ˧˥ˀ
- nặng (low glottalized): ˨˩ˀ

=== ERROR HANDLING ===
If image is NOT Vietnamese food/drink/dessert/snack, return:
{"error": "NOT_VIETNAMESE_ITEM", "suggestion": "string (what the image appears to be, in ${targetLanguage})"}`;
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
    const prompt = generatePrompt(language);
    
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
    if (jsonResponse.error === 'NOT_FOOD' || jsonResponse.error === 'NOT_VIETNAMESE_ITEM') {
      return {
        success: false,
        error: {
          code: jsonResponse.error,
          message: jsonResponse.suggestion || 'The image doesn\'t appear to contain Vietnamese food/drink. Please try another photo.'
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

