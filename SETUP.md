# Setup Instructions for Gemini API Script

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Google Gemini API Key** - Get one from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Gemini API key.

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

