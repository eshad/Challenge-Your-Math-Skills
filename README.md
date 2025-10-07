# 📘 Primary 5 AI Math Problem Generator

An AI-powered math problem generator for Primary 5 students following the Singapore Math Syllabus. This application generates personalized word problems, validates answers, and provides intelligent feedback using Google's Gemini AI.

![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)

## ✨ Features

- 🤖 **AI-Powered Problem Generation** - Uses Google Gemini 2.5 to create unique math problems
- 📚 **Singapore Math Syllabus** - Covers Primary 5 topics including fractions, decimals, percentages, geometry, and more
- 💬 **Personalized Feedback** - AI generates contextual feedback based on student answers
- 💾 **Database Persistence** - All problems and submissions saved to Supabase
- 🎨 **Beautiful UI/UX** - Modern, animated interface built with Tailwind CSS
- 📱 **Mobile Responsive** - Works seamlessly on all device sizes
- ⚡ **Real-time Validation** - Instant feedback on answer correctness

## 🎯 Covered Topics

### Number and Algebra
- Whole Numbers (up to 10 million, four operations)
- Fractions (mixed numbers, multiplication)
- Decimals (up to 3 decimal places)
- Percentage (discount, GST, interest)
- Rate (per unit calculations)

### Measurement and Geometry
- Area & Volume (triangles, composite figures, cubes, cuboids)
- Geometry (angles, properties of shapes)

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Generative AI (Gemini 2.5 Flash)
- **Deployment**: Vercel-ready

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- Google AI Studio API key

### 1. Clone the Repository

```bash
git clone https://github.com/ottodotofficial/ottodot-coding-task-full-stack
cd ottodot-coding-task-full-stack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and configure your credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_API_KEY=your_google_api_key
```


### 4. Set Up Database

1. Go to your Supabase Dashboard and select your project
2. Navigate to **SQL Editor** in the left sidebar
3. Copy the contents of `database.sql` from this repository
4. Paste into the SQL editor and click **Run**

This will create:
- `math_problem_sessions` table
- `math_problem_submissions` table
- Row Level Security policies
- Performance indexes

### 5. Run Development Server

```bash
npm run dev
```

Or using npx:

```bash
npx next dev --turbo
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note**: This project uses Turbo mode for faster development and proper CSS compilation.

## 🗄️ Database Schema

### `math_problem_sessions`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `created_at` | TIMESTAMPTZ | Auto-generated timestamp |
| `problem_text` | TEXT | The math word problem |
| `final_answer` | NUMERIC | Correct answer |

### `math_problem_submissions`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `session_id` | UUID | Foreign key to sessions |
| `user_answer` | NUMERIC | Student's submitted answer |
| `is_correct` | BOOLEAN | Whether answer is correct |
| `feedback` | TEXT | AI-generated feedback |
| `created_at` | TIMESTAMPTZ | Auto-generated timestamp |

## 🎮 How to Use

1. **Generate Problem**: Click "Generate New Problem" button
2. **Read Carefully**: Review the word problem displayed
3. **Enter Answer**: Type your answer in the input field
4. **Submit**: Click "Submit Answer" to check your work
5. **Get Feedback**: Receive personalized AI feedback
6. **Try Again**: Generate new problems to practice more!

## 🏗️ Project Structure

```
ottodot-coding-task-full-stack/
├── app/
│   ├── api/
│   │   ├── generate-problem/
│   │   │   └── route.ts          # API: Generate math problems
│   │   └── submit-answer/
│   │       └── route.ts          # API: Submit and validate answers
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application UI
├── lib/
│   └── supabaseClient.ts         # Supabase client configuration
├── database.sql                  # Database schema and migrations
├── .env.local                    # Environment variables (create this)
├── tailwind.config.ts            # Tailwind configuration with animations
└── package.json                  # Dependencies
```

## 🎨 UI/UX Features

- ✨ Smooth fade-in, slide-up, and bounce animations
- 🌈 Gradient backgrounds with animated floating blobs
- 💫 Loading states with spinners and animated dots
- 🎯 Hover effects and scale transitions
- 📱 Fully responsive mobile design
- 🎭 Glass morphism effects with backdrop blur
- 🎨 Color-coded feedback (green for correct, amber for incorrect)

## 🔌 API Endpoints

### `GET /api/generate-problem`

Generates a new math problem using AI.

**Response:**
```json
{
  "id": "uuid",
  "problem_text": "Ali had 24 apples. He gave 1/3 to his friend. How many apples are left?",
  "final_answer": 16,
  "created_at": "2025-10-04T05:30:00Z"
}
```

### `POST /api/submit-answer`

Validates answer and generates feedback.

**Request:**
```json
{
  "session_id": "uuid",
  "user_answer": 16
}
```

**Response:**
```json
{
  "id": "uuid",
  "session_id": "uuid",
  "user_answer": 16,
  "is_correct": true,
  "feedback": "Excellent work! You correctly calculated...",
  "correct_answer": 16,
  "created_at": "2025-10-04T05:31:00Z"
}
```

## 🐛 Troubleshooting

### CSS Not Loading
```bash
# Clear build cache and restart
rm -rf .next node_modules/.cache
npx next dev
```


## 📝 Implementation Notes

### Key Design Decisions

1. **Gemini 2.5 Flash**: Chosen for fast response times and cost-effectiveness while maintaining high-quality problem generation
2. **Server-Side API Routes**: AI calls are made from Next.js API routes to keep API keys secure
3. **Tailwind Animations**: Custom keyframes defined in `tailwind.config.ts` for smooth, performant animations
4. **Row Level Security**: Enabled on Supabase with permissive policies for demo purposes
5. **Type Safety**: Full TypeScript implementation with proper type definitions


## 🎯 Assessment Checklist

- ✅ AI generates appropriate Primary 5 level math problems
- ✅ Problems follow Singapore Math Syllabus
- ✅ Problems and answers saved to Supabase
- ✅ User submissions saved with feedback
- ✅ AI generates helpful, personalized feedback
- ✅ Beautiful, modern UI with animations
- ✅ Mobile-responsive design
- ✅ Error handling for API failures
- ✅ Loading states during API calls
- ✅ Type-safe TypeScript implementation

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Problem history and statistics
- [ ] User accounts and progress tracking
- [ ] Hints system for struggling students
- [ ] Step-by-step solution explanations
- [ ] Topic filtering
- [ ] Timer/timed challenges
- [ ] Leaderboard system

## 📄 License

This project is part of the Ottodot Developer Assessment.

## 🙏 Credits

- **Singapore Math Syllabus**: Ministry of Education, Singapore
- **AI**: Google Gemini 2.5
- **Database**: Supabase
- **Framework**: Next.js by Vercel

---

**Made with ❤️ for Primary 5 Students**
