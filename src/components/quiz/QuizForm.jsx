import { useState } from "react";
import { useQuiz } from "../../context/QuizContext";
import QuizSettings from "./QuizSettings";
import QuizButton from "../ui/QuizButton";
import QuizQuestionCard from "./QuizQuestionCard";
import QuizResults from "./QuizResults";

const QuizForm = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(5);
  const { generateQuiz, quizState, setQuizState } = useQuiz();

  const handleSubmit = (e) => {
    e.preventDefault();
    generateQuiz(topic, difficulty, questionCount);
  };

  const { quiz, answers, score } = quizState;
  const allAnswered =
    quiz && answers && Object.keys(answers).length === quiz.length;

  // If quiz is loaded and all answered, show results
  if (quiz && quiz.length > 0) {
    return allAnswered ? (
      <QuizResults />
    ) : (
      <div className="min-h-screen p-4 flex flex-col gap-6 items-center bg-gradient-to-br from-blue-50 to-purple-50">
        {quiz.map((question, index) => (
          <QuizQuestionCard
            key={index}
            question={question}
            index={index}
            answers={answers}
            handleAnswer={(questionIndex, selectedOption) => {
              const isCorrect =
                selectedOption === quiz[questionIndex].correctAnswer;
              const wasAlreadyAnswered = answers.hasOwnProperty(questionIndex);

              const newAnswers = {
                ...answers,
                [questionIndex]: selectedOption,
              };

              const newScore =
                !wasAlreadyAnswered && isCorrect ? score + 1 : score;

              setQuizState((prev) => ({
                ...prev,
                answers: newAnswers,
                score: newScore,
              }));
            }}
          />
        ))}
      </div>
    );
  }

  // Show quiz setup screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🚀 Quiz Master
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <QuizSettings
            topic={topic}
            setTopic={setTopic}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
          />

          <QuizButton loading={quizState.loading}>Start Quiz Now!</QuizButton>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
