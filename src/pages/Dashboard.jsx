import { useQuiz } from "../context/QuizContext";
import DashboardStats from "../components/charts/DashboardStats";
import QuizHistoryChart from "../components/charts/QuizHistoryChart";

const Dashboard = () => {
  const { quizState } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 Your Learning Dashboard
        </h1>

        <DashboardStats />
        <QuizHistoryChart history={quizState.history} />
      </div>
    </div>
  );
};

export default Dashboard;
