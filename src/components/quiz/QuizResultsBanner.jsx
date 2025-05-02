import { useEffect } from "react";
import confetti from "canvas-confetti";

const QuizResultsBanner = ({ score, totalQuestions, handleRetake }) => {
  useEffect(() => {
    const accuracy = (score / totalQuestions) * 100;
    if (accuracy >= 80) {
      confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [score, totalQuestions]);

  return (
    <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-xl border-2 border-green-200 shadow-md">
      <div className="text-center space-y-3">
        <h3 className="text-3xl font-bold text-green-700">
          {score === totalQuestions ? "🎉 Perfect Score!" : "📝 Quiz Complete!"}
        </h3>
        <div className="text-4xl font-bold text-gray-800">
          <span className="text-blue-600">{score}</span>/
          <span className="text-purple-600">{totalQuestions}</span>
        </div>
        <p className="text-xl text-gray-600">
          ({Math.round((score / totalQuestions) * 100)}%) Accuracy
        </p>
        <button
          onClick={handleRetake}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
};

export default QuizResultsBanner;
