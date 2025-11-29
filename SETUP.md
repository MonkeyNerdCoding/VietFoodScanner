# Setup Instructions for Pho-tographer

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Google Gemini API Key** - Get one from [Google AI Studio](https://aistudio.google.com/app/apikey)
3. **Google Places API Key** (Optional) - For finding nearby restaurants. Get from [Google Cloud Console](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
# Required - For food identification
GEMINI_API_KEY=your_gemini_api_key_here

# Optional - For finding nearby restaurants (will fallback to Google Maps search if not provided)
GOOGLE_PLACES_API_KEY=your_places_api_key_here
```

Replace the values with your actual API keys.

## Running the App

### Start the server:
```bash
npm start
# or
npm run dev
```

### Start the frontend (development):
```bash
npm run dev:frontend
```

### Start both (concurrently):
```bash
npm run dev:all
```

## Usage

Run the script with an image path:

```bash
node gemini-api.js <image-path> [language]
```

### Examples

```bash
# Basic usage
node gemini-api.js ./test-images/pho.jpg

# With language option
node gemini-api.js ./test-images/banh-mi.jpg en
```

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)

## Output

The script returns a JSON object with the following structure:

```json
{
  "success": true,
  "data": {
    "name": {
      "vietnamese": "Phở Bò",
      "english": "Beef Pho",
      "pronunciation": "fuh baw"
    },
    "description": "...",
    "ingredients": [...],
    "calories": {
      "estimate": 450,
      "range": "400-500"
    },
    "allergens": [...],
    "spiceLevel": "mild",
    "culturalNote": "...",
    "confidence": 0.94
  }
}
```

## Error Handling

If the image doesn't contain food, the script returns:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOOD",
    "message": "The image doesn't appear to contain food. Please try another photo."
  }
}
```

## Features

### 🍜 Food Identification
- Identifies Vietnamese food, drinks, desserts, and snacks
- Returns detailed information including:
  - Name (Vietnamese + translated)
  - IPA pronunciation guide
  - Ingredients, calories, allergens
  - Cultural notes
  - Category-specific info (spice level, sweetness, temperature, etc.)

### 📍 Find Nearby Restaurants
- Locates restaurants/vendors selling the identified dish
- Uses device geolocation + Google Places API
- Fallback: Opens Google Maps search if Places API unavailable
- Shows:
  - Restaurant name & address
  - Ratings & reviews
  - Open/closed status
  - Directions link

### 🎆 Celebration Effects
- Fireworks animation when food is successfully identified
- Emoji confetti and sparkles

### 🌐 Multi-language Support
- Vietnamese, English, French, Chinese
- AI responses are translated to user's selected language

