import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // <-- add this

const SocialAuth = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate(); // <-- initialize navigate

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/"); // <-- redirect after success
    } catch (error) {
      console.error("Google sign in failed:", error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FaGoogle className="text-blue-500" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialAuth;
