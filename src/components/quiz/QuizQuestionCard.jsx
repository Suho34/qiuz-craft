const QuizQuestionCard = ({ question, index, answers, handleAnswer }) => {
  const hasAnswered = answers.hasOwnProperty(index);
  const isCorrect = answers[index] === question.correctAnswer;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-blue-50 hover:border-blue-100 transition-colors max-w-3xl w-full">
      <div className="flex items-start mb-4">
        <span
          className={`inline-block w-8 h-8 ${
            hasAnswered
              ? isCorrect
                ? "bg-green-500"
                : "bg-red-500"
              : "bg-blue-500"
          } text-white rounded-full text-center mr-3 flex-shrink-0 flex items-center justify-center`}
        >
          {index + 1}
        </span>
        <p className="font-semibold text-lg text-gray-800 mt-1">
          {question.question}
        </p>
      </div>

      <div className="grid gap-2 ml-11">
        {question.options.map((opt, i) => {
          const isSelected = answers[index] === opt;
          const showCorrect = hasAnswered && opt === question.correctAnswer;

          return (
            <button
              key={i}
              onClick={() => handleAnswer(index, opt)}
              disabled={hasAnswered}
              className={`text-left p-3 rounded-lg border-2 font-medium transition-all duration-200 flex items-start ${
                isSelected
                  ? isCorrect
                    ? "bg-green-50 border-green-400"
                    : "bg-red-50 border-red-400"
                  : showCorrect
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-blue-100 hover:border-blue-200"
              } ${!hasAnswered && "hover:translate-x-1"}`}
            >
              <span className="mr-3 text-lg">
                {isSelected
                  ? isCorrect
                    ? "✅"
                    : "❌"
                  : showCorrect
                  ? "✓"
                  : "•"}
              </span>
              <span className="text-gray-700">{opt}</span>
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div className="mt-4 pt-4 border-t border-blue-50 ml-11">
          <p
            className={`text-lg font-medium ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "✅ Correct Answer" : "❌ Your Answer"}
          </p>
          {!isCorrect && (
            <p className="mt-2 text-blue-600">
              Correct answer:{" "}
              <span className="font-semibold">{question.correctAnswer}</span>
            </p>
          )}
          <div className="mt-3 bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-700 italic">💡 {question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionCard;
