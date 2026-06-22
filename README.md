# SmartMatchmakingEngine

A TypeScript-based intelligent matchmaking engine that integrates with AI-MAT (Online Proctor Exam Platform) to match candidates with positions based on exam performance, skills assessment, and resume qualifications.

## Overview

SmartMatchmakingEngine is an advanced algorithmic system designed to intelligently match exam takers with job opportunities by correlating:

- Exam performance scores from AI-MAT proctored assessments
- Technical skills verification through AI-powered evaluation
- Resume qualifications and experience profile
- Real-time candidate capability assessment

The engine provides data-driven candidate-to-role matching that reduces recruitment time while ensuring quality placements.

## Problem Statement

Traditional recruitment processes fail to correlate candidate assessment scores with actual job requirements. SmartMatchmakingEngine bridges this gap by:

- Utilizing real-time exam metrics from proctored environments
- Implementing bias-free algorithmic matching
- Providing transparent scoring and ranking systems
- Enabling rapid identification of qualified candidates

## Project Structure

```
SmartMatchmakingEngine/
├── src/
│   ├── ai/                       - AI and ML models integration
│   ├── components/               - React UI components
│   ├── app/                      - Next.js application pages
│   ├── lib/                      - Utility functions and helpers
│   └── types/                    - TypeScript type definitions
├── public/                       - Static assets
├── tests/                        - Unit and integration tests
├── .env.example                  - Environment configuration template
├── package.json                  - Project dependencies
├── tsconfig.json                 - TypeScript configuration
├── next.config.js                - Next.js configuration
└── README.md                     - This file
```

## Key Features

### Integration with AI-MAT Platform

SmartMatchmakingEngine receives candidate data from AI-MAT including:

- Exam completion with full-screen monitoring verification
- Webcam and microphone validation during assessment
- Room scan confirmation and device orientation verification
- Candidate photograph capture for identity verification
- Real-time score calculation from exam responses

### Intelligent Matching Algorithm

- Multi-factor scoring system combining exam performance and profile metrics
- Resume parsing and skill extraction
- Score correlation and candidate ranking
- Automated candidate-to-role mapping
- Customizable weighting for different position types

### Data Processing

- Extract exam scores from AI-MAT assessments
- Parse resume documents for skill identification
- Cross-reference exam performance with job requirements
- Generate confidence scores for each match
- Produce ranked candidate recommendations

### Analytics and Reporting

- Match success rate metrics
- Candidate performance distribution analysis
- Position-specific candidate pool insights
- Placement trend visualization
- Recruitment funnel tracking

## Tech Stack

Frontend and Application Framework:
- Next.js 15.3+ - React framework with server-side rendering
- React 18.3+ - UI component library
- TypeScript 5 - Type-safe JavaScript

AI and Machine Learning:
- Genkit 1.14+ - Google's unified AI framework
- Google Generative AI - Advanced NLP and analysis
- Google AI integration for intelligent text processing

User Interface:
- Tailwind CSS 3.4+ - Utility-first CSS framework
- Radix UI - Unstyled, accessible component primitives
- shadcn/ui - Pre-built component library
- Lucide React - Icon system

Forms and Data Validation:
- React Hook Form 7.54+ - Efficient form state management
- Zod 3.24+ - TypeScript-first schema validation

Data Visualization:
- Recharts 2.15+ - Composable charting library
- Date-fns 3.6+ - Date utility functions

Backend and Services:
- Firebase 11.9+ - Authentication, database, and hosting
- dotenv - Environment variable management

Development Tools:
- Genkit CLI - AI framework command-line tools
- PostCSS 8 - CSS transformation
- TSC - TypeScript compiler

## Integration with AI-MAT

SmartMatchmakingEngine receives real-time data from AI-MAT proctored exams:

1. Candidate completes exam in AI-MAT with full proctoring
2. System verifies:
   - Full-screen mode engagement
   - Camera and microphone operational status
   - Room environment scan completion
   - Identity verification through photograph
   - PC orientation validation
3. Upon exam completion, score and metadata transmitted to engine
4. Engine matches exam performance against job positions
5. Candidates receive personalized opportunity recommendations

## Data Flow Diagram

```
AI-MAT Platform
    |
    | (Exam Score + Metrics)
    |
    v
Input Processing
    |
    +-- Score Normalization
    +-- Skills Extraction
    +-- Resume Parsing
    |
    v
Matching Algorithm
    |
    +-- Multi-factor Scoring
    +-- Ranking Computation
    +-- Confidence Calculation
    |
    v
Output Generation
    |
    +-- Ranked Matches
    +-- Detailed Reports
    +-- Recommendations
    |
    v
User Interface Display
```

## License

This project is open source and available under the MIT License.

## Contact and Support

For questions, suggestions, or support regarding SmartMatchmakingEngine:

Developer: K-GOKULPRASATH
GitHub Profile: https://github.com/K-GOKULPRASATH

Repository: https://github.com/K-GOKULPRASATH/SmartMatchmakingEngine
Related Project (AI-MAT): https://github.com/K-GOKULPRASATH/AI-MAT

