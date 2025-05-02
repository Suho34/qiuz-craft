import { useQuiz } from "../../context/QuizContext";
import AccuracyRadarChart from "./AccuracyRadarChart";

const DashboardStats = () => {
  const { quizState } = useQuiz();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📈 Quick Stats</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-3xl font-bold">{quizState.history.length}</p>
            <p className="text-sm">Quizzes Taken</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <p className="text-3xl font-bold">
              {Math.round(
                quizState.history.reduce(
                  (acc, curr) => acc + curr.accuracy,
                  0
                ) / (quizState.history.length || 1)
              ) || 0}
              %
            </p>
            <p className="text-sm">Avg Accuracy</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <p className="text-3xl font-bold">
              {quizState.history.reduce((acc, curr) => acc + curr.score, 0)}
            </p>
            <p className="text-sm">Correct Answers</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 Accuracy by Difficulty</h2>
        <AccuracyRadarChart history={quizState.history} />
      </div>
    </div>
  );
};

export default DashboardStats;
