import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Welcome to QuizCraft
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
        Create, take, and analyze quizzes on any topic with our AI-powered
        platform
      </p>

      {currentUser ? (
        <div className="flex gap-4">
          <Link
            to="/quiz"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Create New Quiz
          </Link>
          <Link
            to="/dashboard"
            className="bg-white border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            View Dashboard
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
