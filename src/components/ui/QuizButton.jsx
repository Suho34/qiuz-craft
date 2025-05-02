const QuizButton = ({
  children,
  loading,
  disabled,
  className = "",
  ...props
}) => (
  <button
    {...props}
    disabled={disabled || loading}
    className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <span className="animate-spin">🌀</span>
        Loading...
      </span>
    ) : (
      children
    )}
  </button>
);

export default QuizButton;
