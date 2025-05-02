import { createContext, useContext, useState, useEffect } from "react";
import { fetchQuizFromAI } from "../utilis/api";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  // Load saved history from localStorage
  const loadHistory = () => {
    try {
      const saved = localStorage.getItem("quizHistory");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load quiz history:", error);
      return [];
    }
  };

  // Initial state
  const initialState = {
    topic: "",
    difficulty: "medium",
    questionCount: 5,
    quiz: null,
    error: "",
    loading: false,
    answers: {},
    score: 0,
    history: loadHistory(),
    resultSaved: false,
  };

  const [quizState, setQuizState] = useState(initialState);

  // Save history to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("quizHistory", JSON.stringify(quizState.history));
    } catch (error) {
      console.error("Failed to save quiz history:", error);
    }
  }, [quizState.history]);

  // Generate a new quiz
  const generateQuiz = async (topic, difficulty, questionCount) => {
    setQuizState((prev) => ({
      ...prev,
      loading: true,
      error: "",
      topic,
      difficulty,
      questionCount,
    }));

    try {
      const data = await fetchQuizFromAI(topic, difficulty, questionCount);
      setQuizState((prev) => ({
        ...prev,
        quiz: data.questions,
        answers: {},
        score: 0,
        loading: false,
        resultSaved: false,
      }));
    } catch (error) {
      setQuizState((prev) => ({
        ...prev,
        error: error.message || "Failed to generate quiz",
        loading: false,
      }));
    }
  };

  // Handle answering a question
  const handleAnswer = (questionIndex, selectedOption) => {
    setQuizState((prev) => {
      const question = prev.quiz[questionIndex];
      const isCorrect = selectedOption === question.correctAnswer;
      const wasAlreadyAnswered = prev.answers.hasOwnProperty(questionIndex);

      const newAnswers = { ...prev.answers, [questionIndex]: selectedOption };
      const newScore =
        !wasAlreadyAnswered && isCorrect ? prev.score + 1 : prev.score;

      return { ...prev, answers: newAnswers, score: newScore };
    });
  };

  // Add quiz result to history
  const addQuizResult = (result) => {
    if (quizState.resultSaved) return;

    const newResult = {
      ...result,
      id: Date.now(),
      topic: quizState.topic,
      difficulty: quizState.difficulty,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setQuizState((prev) => ({
      ...prev,
      history: [...prev.history, newResult],
      resultSaved: true,
    }));
  };

  // Reset quiz state
  const resetQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      quiz: null,
      answers: {},
      score: 0,
      resultSaved: false,
    }));
  };

  // Clear entire history
  const clearHistory = () => {
    setQuizState((prev) => ({
      ...prev,
      history: [],
    }));
  };

  // Context value
  const value = {
    quizState,
    generateQuiz,
    handleAnswer,
    addQuizResult,
    resetQuiz,
    clearHistory,
    setQuizState,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
