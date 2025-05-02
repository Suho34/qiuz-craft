# QuizCraft

QuizCraft is an AI-powered quiz platform built with React and Vite. Users can create, take, and analyze quizzes on any topic, with support for Google and email authentication, quiz history, and a modern, responsive UI.

## Features

- Create quizzes on any topic using AI (Gemini API)
- Multiple difficulty levels and customizable question counts
- User authentication (Google and email/password via Firebase)
- Quiz history and analytics dashboard
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quiz-craft.git
   cd quiz-craft
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Copy `.env.example` to `.env` and fill in your Firebase and Gemini API keys.

### Running the App

To start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/` by default.

### Building for Production

```bash
npm run build
```

## Project Structure

- `src/components/` – UI components (quiz, auth, layout, etc.)
- `src/context/` – React context providers for auth and quiz state
- `src/utilis/api.js` – API utilities for fetching quizzes from Gemini
- `src/firebase.js` – Firebase configuration

## License

MIT
