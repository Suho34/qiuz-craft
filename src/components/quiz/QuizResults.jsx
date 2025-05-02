import { useEffect } from "react";
import { useQuiz } from "../../context/QuizContext";
import QuizResultsBanner from "./QuizResultsBanner";
import QuizQuestionCard from "./QuizQuestionCard";

const QuizResults = () => {
  const { quizState, setQuizState, addQuizResult } = useQuiz();
  const { quiz, answers, score, questionCount, resultSaved } = quizState;

  const allAnswered = Object.keys(answers).length === questionCount;

  useEffect(() => {
    if (allAnswered && !resultSaved) {
      addQuizResult({
        date: new Date().toLocaleDateString(),
        score,
        total: questionCount,
        accuracy: Math.round((score / questionCount) * 100),
        difficulty: quizState.difficulty,
      });

      setQuizState((prev) => ({ ...prev, resultSaved: true }));
    }
  }, [
    allAnswered,
    resultSaved,
    addQuizResult,
    quizState.difficulty,
    questionCount,
    score,
    setQuizState,
  ]);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto px-4">
      {allAnswered && (
        <QuizResultsBanner
          score={score}
          totalQuestions={questionCount}
          handleRetake={() =>
            setQuizState((prev) => ({
              ...prev,
              quiz: null,
              answers: {},
              score: 0,
              resultSaved: false,
            }))
          }
        />
      )}

      <div className="flex flex-col gap-6">
        {quiz.map((question, index) => (
          <QuizQuestionCard
            key={index}
            question={question}
            index={index}
            answers={answers}
            handleAnswer={(questionIndex, selectedOption) => {
              const isCorrect =
                selectedOption === quiz[questionIndex].correctAnswer;

              setQuizState((prev) => {
                const newAnswers = {
                  ...prev.answers,
                  [questionIndex]: selectedOption,
                };

                const newScore =
                  !prev.answers.hasOwnProperty(questionIndex) && isCorrect
                    ? prev.score + 1
                    : prev.score;

                return { ...prev, answers: newAnswers, score: newScore };
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizResults;
