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

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Firebase project setup with active credentials
- Google Generative AI API access
- Environment variables configured

### Installation

1. Clone the repository:
```bash
git clone https://github.com/K-GOKULPRASATH/SmartMatchmakingEngine.git
cd SmartMatchmakingEngine
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- Firebase credentials
- Google Generative AI API key
- AI-MAT platform connection details
- Application ports and URLs

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:9002`

Start Genkit AI development environment:
```bash
npm run genkit:dev
```

Watch for changes in AI models:
```bash
npm run genkit:watch
```

### Building for Production

Build the application:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server with Turbopack on port 9002
- `npm run genkit:dev` - Start Genkit AI development environment
- `npm run genkit:watch` - Watch and restart Genkit on AI model changes
- `npm run build` - Build optimized production bundle
- `npm start` - Run production server
- `npm run lint` - Run ESLint code quality checks
- `npm run typecheck` - Verify TypeScript type safety

## API Integration

### AI-MAT Data Input

The engine accepts exam data from AI-MAT in the following format:

- Candidate identification and authentication details
- Exam type and difficulty level
- Raw exam score and weighted score
- Time taken to complete assessment
- Question-wise performance metrics
- Environmental verification status (camera, microphone, room scan)

### Matching Output

Returns for each candidate:

- Overall match score (0-100)
- Per-position match breakdown
- Top 5 recommended positions
- Confidence level for each match
- Supporting data for each recommendation

### Resume Processing

- Accepts resume files (PDF, DOCX, TXT formats)
- Extracts skills, experience level, and certifications
- Maps identified skills to job requirement taxonomy
- Generates candidate profile summary

## Configuration

### Environment Variables

Create `.env.local` with the following:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

GOOGLE_GENAI_API_KEY=your_google_genai_api_key

AI_MAT_API_URL=your_ai_mat_platform_url
AI_MAT_API_KEY=your_ai_mat_api_key

NEXT_PUBLIC_APP_URL=http://localhost:9002
```

### Matching Algorithm Parameters

Configure algorithm weights in configuration files:

- Exam Score Weight - Percentage contribution to final match score
- Resume Match Weight - Skill alignment contribution
- Experience Weight - Years of experience factor
- Certification Weight - Relevant certifications factor
- Position-Specific Thresholds - Minimum match scores per role

## Usage Examples

### Basic Matching Request

```typescript
import { matchCandidate } from '@/lib/matchmaking';

const result = await matchCandidate({
  candidateId: 'candidate_123',
  examScore: 85,
  skills: ['JavaScript', 'React', 'TypeScript'],
  experience: 3,
  certifications: ['AWS Solutions Architect']
});

console.log(result.topMatches);
```

### Batch Processing

```typescript
import { batchMatchCandidates } from '@/lib/matchmaking';

const candidates = await batchMatchCandidates(excelCandidateList);
```

### Score Calculation

```typescript
import { calculateMatchScore } from '@/lib/scoring';

const score = calculateMatchScore(
  examMetrics,
  resumeAnalysis,
  jobRequirements
);
```

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

## Performance Optimization

- Leverages Next.js 15 with Turbopack for rapid compilation
- Implements caching strategies for candidate data
- Optimizes database queries through Firebase indexing
- Compresses large resume documents before processing
- Asynchronous processing for batch operations

## Security Considerations

- Secure Firebase authentication for all users
- API key protection through environment variables
- Resume and exam data encryption in transit and at rest
- HTTPS enforcement in production
- Role-based access control for sensitive operations
- Compliance with data privacy regulations

## Type Safety

Complete TypeScript implementation ensures:

- Strong typing for all data structures
- Type checking at compile time
- Reduced runtime errors and bugs
- Self-documenting code through type definitions
- Improved developer experience with IDE support

## Development Workflow

1. Create a feature branch from main
2. Install dependencies and configure environment
3. Implement changes with TypeScript strict mode
4. Run linting and type checking: `npm run lint && npm run typecheck`
5. Test functionality in development environment
6. Submit pull request with clear description
7. Address review feedback
8. Merge upon approval

## Testing

Run type checking:
```bash
npm run typecheck
```

Run linting:
```bash
npm run lint
```

Create tests in the tests/ directory following project conventions.

## Database Schema

SmartMatchmakingEngine uses Firebase with the following main collections:

Candidates:
- candidateId, name, email, examScore, skills, resume, matchHistory

Positions:
- positionId, title, requiredSkills, experienceLevel, department, status

Matches:
- matchId, candidateId, positionId, score, timestamp, status

Assessments:
- assessmentId, candidateId, examType, score, details, completedAt

## Roadmap

Current Version:
- Core matching algorithm implementation
- AI-MAT integration
- Resume parsing capabilities
- Web-based dashboard

Planned Features:
- Machine learning model training for improved matching
- Advanced analytics dashboard
- API documentation and SDKs
- Multi-language support
- Automated job recommendations
- Candidate feedback mechanisms
- Enhanced reporting and analytics
- Integration with additional exam platforms

## Known Limitations

- Resume parsing accuracy depends on document format and clarity
- AI model responses time varies based on content complexity
- Firebase pricing scales with usage volume
- Real-time matching requires stable internet connection
- Matching algorithm performance improves with data volume

## Troubleshooting

Issue: Firebase connection errors
- Verify environment variables in .env.local
- Check Firebase project permissions
- Ensure API keys are valid and not expired

Issue: Genkit AI timeout
- Increase timeout values in configuration
- Check internet connection stability
- Verify Google Generative AI API quota

Issue: Port already in use
- Specify different port: `npm run dev -- -p 3000`
- Or kill process using port 9002

Issue: TypeScript compilation errors
- Run `npm install` to ensure all dependencies installed
- Delete node_modules and reinstall if necessary
- Check TypeScript version compatibility

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add feature description'`
4. Push to branch: `git push origin feature/your-feature`
5. Open Pull Request with detailed description

Please ensure code follows project conventions and passes all checks.

## License

This project is open source and available under the MIT License.

## Contact and Support

For questions, suggestions, or support regarding SmartMatchmakingEngine:

Developer: K-GOKULPRASATH
GitHub Profile: https://github.com/K-GOKULPRASATH

Repository: https://github.com/K-GOKULPRASATH/SmartMatchmakingEngine
Related Project (AI-MAT): https://github.com/K-GOKULPRASATH/AI-MAT

For bug reports, feature requests, or issues, please open a GitHub issue in the repository with detailed information.

## Related Projects

AI-MAT: Online Proctor Exam Platform
- Repository: https://github.com/K-GOKULPRASATH/AI-MAT
- Description: Comprehensive proctoring platform with full-screen monitoring, biometric verification, and real-time assessment scoring
- Integration: Provides exam data and candidate metrics to SmartMatchmakingEngine

## Version History

Version 0.1.0 (Initial Release - March 2026)
- Core matchmaking algorithm
- AI-MAT integration
- Firebase backend setup
- Basic UI components
- TypeScript type definitions
- Development environment configuration
