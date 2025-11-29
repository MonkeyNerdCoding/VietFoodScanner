# 📋 Product Requirements Document (PRD)
## **Pho-tographer: Vietnamese Street Food Decoder**

---

## 1. Overview

### 1.1 Product Summary
Pho-tographer is a mobile-first web application that allows users to photograph Vietnamese street food and instantly receive detailed information about the dish, including its name, ingredients, calorie estimates, and cultural context.

### 1.2 Problem Statement
Tourists and food enthusiasts visiting Vietnam often encounter unfamiliar street food dishes but face language barriers and lack of accessible information. They want to know what they're eating, understand the ingredients (especially for dietary restrictions or allergies), and appreciate the cultural significance of the dish.

### 1.3 Solution
A simple "point and shoot" web app powered by AI (Google Gemini) that identifies Vietnamese street food from photos and returns comprehensive, easy-to-understand information in the user's preferred language.

### 1.4 Target Users
- **Primary:** International tourists visiting Vietnam
- **Secondary:** Food bloggers, culinary students, Vietnamese cuisine enthusiasts, health-conscious diners

---

## 2. Goals & Success Metrics

### 2.1 Product Goals
| Goal | Description |
|------|-------------|
| **Accuracy** | Correctly identify at least 85% of common Vietnamese street food dishes |
| **Speed** | Return results within 5 seconds of image submission |
| **Usability** | Users can complete the core flow (photo → result) in under 10 seconds |
| **Engagement** | Users scan at least 2 dishes per session on average |

### 2.2 Key Performance Indicators (KPIs)
- Identification accuracy rate
- Average response time
- Session duration
- Return user rate
- Number of scans per session

---

## 3. User Stories & Requirements

### 3.1 User Stories

**Epic 1: Food Identification**
| ID | User Story | Priority |
|----|------------|----------|
| US-01 | As a tourist, I want to take a photo of a dish so that I can learn what it is | P0 (Must Have) |
| US-02 | As a user, I want to upload an existing photo from my gallery so that I don't have to take a new picture | P0 |
| US-03 | As a user, I want to see a loading indicator so that I know the app is processing | P0 |
| US-04 | As a user, I want to receive an error message if my photo cannot be identified so that I know to try again | P0 |

**Epic 2: Food Information Display**
| ID | User Story | Priority |
|----|------------|----------|
| US-05 | As a health-conscious user, I want to see calorie estimates so that I can track my intake | P0 |
| US-06 | As someone with allergies, I want to see the main ingredients so that I can avoid allergens | P0 |
| US-07 | As a food enthusiast, I want to learn about the dish's origin and cultural context so that I can appreciate it more | P1 (Should Have) |
| US-08 | As a user, I want to see the Vietnamese name with pronunciation guide so that I can order it myself | P1 |

**Epic 3: User Experience Enhancements**
| ID | User Story | Priority |
|----|------------|----------|
| US-09 | As a returning user, I want to see my scan history so that I can reference dishes I've tried | P2 (Nice to Have) |
| US-10 | As a social user, I want to share the result card on social media so that I can show my friends | P2 |

### 3.2 Functional Requirements

**FR-01: Image Input**
- Accept image upload from device gallery
- Accept camera capture (mobile browsers)
- Support JPEG, PNG, WebP formats
- Maximum file size: 10MB
- Auto-compress images larger than 2MB before sending

**FR-02: AI Processing**
- Convert image to Base64 encoding
- Send to backend API endpoint
- Backend calls Gemini API with structured prompt
- Parse JSON response from AI
- Handle malformed responses gracefully

**FR-03: Result Display**
- Display dish name (Vietnamese + English)
- Show pronunciation guide (phonetic)
- List main ingredients (with icons)
- Display calorie estimate (range)
- Show brief cultural/historical context
- Indicate spice level (mild/medium/hot)
- Note common allergens present

**FR-04: Error Handling**
- "Not food" detection → friendly message + retry prompt
- Network timeout → retry option
- Server error → fallback to cached data if available
- Invalid image format → format requirements message

### 3.3 Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| **Performance** | API response < 5 seconds (95th percentile) |
| **Availability** | 99% uptime during demo/presentation |
| **Scalability** | Handle 10 concurrent users (MVP scope) |
| **Security** | API key stored server-side only, HTTPS enforced |
| **Compatibility** | Chrome, Safari, Firefox (latest 2 versions) |
| **Mobile Responsive** | Optimized for screens 320px - 768px width |

---

## 4. Technical Architecture

### 4.1 System Overview

```
┌─────────────────┐     HTTP/JSON      ┌─────────────────┐     API Call      ┌─────────────────┐
│                 │ ────────────────►  │                 │ ────────────────► │                 │
│   React Client  │                    │  Node.js Server │                   │   Gemini API    │
│   (Vite + TW)   │ ◄────────────────  │   (Express)     │ ◄──────────────── │   (Flash 2.0)   │
│                 │     JSON Result    │                 │    JSON Response  │                 │
└─────────────────┘                    └─────────────────┘                   └─────────────────┘
```

### 4.2 Tech Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Frontend** | React 18 + Vite | Fast development, hot reload, modern tooling |
| **Styling** | TailwindCSS | Rapid UI development, mobile-first utilities |
| **Backend** | Node.js + Express | JavaScript consistency, easy Gemini SDK integration |
| **AI Model** | Google Gemini Flash 2.0 | Fast inference, multimodal (vision), cost-effective |
| **Deployment** | Localhost + ngrok (MVP) | Quick setup for hackathon demo |

### 4.3 API Specification

**Endpoint:** `POST /api/identify`

**Request:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "language": "en"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "name": {
      "vietnamese": "Phở Bò",
      "english": "Beef Pho",
      "pronunciation": "fuh baw"
    },
    "description": "A traditional Vietnamese soup consisting of broth, rice noodles, herbs, and beef.",
    "ingredients": ["rice noodles", "beef broth", "beef slices", "bean sprouts", "basil", "lime"],
    "calories": {
      "estimate": 450,
      "range": "400-500"
    },
    "allergens": ["gluten (soy sauce)", "beef"],
    "spiceLevel": "mild",
    "culturalNote": "Originating from Northern Vietnam in the early 20th century, Phở has become Vietnam's national dish.",
    "confidence": 0.94
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOOD",
    "message": "The image doesn't appear to contain food. Please try another photo."
  }
}
```

---

## 5. User Interface Design

### 5.1 Screen Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│              │     │              │     │              │     │              │
│    Home      │ ──► │   Camera/    │ ──► │   Loading    │ ──► │   Result     │
│   Screen     │     │   Upload     │     │   Screen     │     │    Card      │
│              │     │              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                      │
                                                                      ▼
                                                               ┌──────────────┐
                                                               │   Scan       │
                                                               │   Another    │
                                                               └──────────────┘
```

### 5.2 Wireframes Description

**Home Screen**
- App logo and tagline centered
- Large "Scan Food" CTA button
- Brief instruction text: "Point your camera at any Vietnamese dish"
- Optional: carousel of sample dishes

**Camera/Upload Screen**
- Full-screen camera viewfinder (mobile)
- Capture button at bottom center
- Gallery upload icon at bottom left
- Flash toggle at top right

**Loading Screen**
- Animated pho bowl with steam rising
- Text: "Analyzing your dish..." with typing animation
- Estimated wait time indicator

**Result Card**
- Hero image (user's photo) at top
- Dish name in large typography (Vietnamese + English)
- Pronunciation with speaker icon (future: audio)
- Horizontal divider
- Ingredients grid with icons
- Calorie badge
- Allergen warnings (highlighted)
- Cultural note in card footer
- "Scan Another" button

### 5.3 Design Guidelines

| Element | Specification |
|---------|---------------|
| **Primary Color** | #E23744 (Pho red/chili) |
| **Secondary Color** | #2D5A27 (Herb green) |
| **Background** | #FFF8F0 (Warm cream) |
| **Font - Headings** | Playfair Display |
| **Font - Body** | Inter |
| **Border Radius** | 12px (cards), 24px (buttons) |
| **Shadows** | Soft, warm-toned (rgba(226,55,68,0.1)) |

---

## 6. Development Plan

### 6.1 Team Structure (4 members)

| Role | Responsibilities |
|------|------------------|
| **M1 - Backend Lead** | Server setup, Gemini integration, API endpoints, deployment |
| **M2 - Frontend Logic** | Camera/upload component, API integration, state management |
| **M3 - UI Developer** | Component styling, result card, responsive design |
| **M4 - UX/Testing** | Loading states, error handling, test data preparation, QA |

### 6.2 Development Timeline (4 Hours)

| Hour | Phase | Deliverables |
|------|-------|--------------|
| **1** | Setup | Repo initialized, dev environment running, basic routing |
| **2** | Core | Gemini API working, image upload functional, JSON parsing |
| **3** | Integration | End-to-end flow complete, components connected |
| **4** | Polish | UI refinement, error handling, demo preparation |

### 6.3 Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Gemini API rate limit | Medium | High | Implement response caching, prepare mock data fallback |
| Network latency during demo | Medium | High | Pre-load test images, have offline mock mode ready |
| Image too large error | High | Medium | Client-side compression before upload |
| AI returns invalid JSON | Medium | Medium | Regex extraction, retry logic, fallback parser |
| CORS issues | High | Low | Configure Express CORS middleware early |

---

## 7. Future Roadmap (Post-MVP)

### Phase 2 (v1.1)
- Scan history with local storage
- Multi-language support (Vietnamese, Chinese, Korean, Japanese)
- Social sharing with branded card template

### Phase 3 (v1.2)
- Restaurant/vendor recommendations nearby
- Price range estimates
- User ratings and reviews

### Phase 4 (v2.0)
- Offline mode with on-device ML model
- AR overlay showing dish information
- Dietary preference filtering (vegetarian, halal, etc.)

---

## 8. Appendix

### 8.1 Sample Gemini Prompt

```
You are a Vietnamese street food expert. Analyze this image and return ONLY a JSON object with the following structure. Do not include any markdown formatting or explanation.

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

If the image is not food, return: {"error": "NOT_FOOD"}
```

### 8.2 Test Dataset

| Dish | Expected Result | Test Image Source |
|------|-----------------|-------------------|
| Phở Bò | Beef pho identification | Prepared high-quality image |
| Bánh Mì | Banh mi sandwich identification | Prepared high-quality image |
| Cà Phê Trứng | Egg coffee identification | Prepared high-quality image |
| Non-food item | Error: NOT_FOOD | Random object image |

---

**Document Version:** 1.0  
**Last Updated:** November 2025  
**Author:** Development Team  
**Status:** Ready for Development