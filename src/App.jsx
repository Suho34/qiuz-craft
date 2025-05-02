import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext.jsx";
import PrivateRoute from "./components/layout/PrivateRoute.jsx";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./pages/Dashboard";
import QuizGenerator from "./components/quiz/QuizForm";
import Error from "./components/ui/Error.jsx";

const App = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/quiz" element={<QuizGenerator />} />
            </Route>

            <Route path="*" element={<Error message="Page not found" />} />
          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
