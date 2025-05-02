const QuizFormField = ({
  label,
  type = "text",
  value,
  onChange,
  options,
  className = "",
}) => {
  if (type === "select") {
    return (
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border-2 border-blue-200 rounded-xl bg-white text-blue-700 font-medium focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border-2 border-blue-200 rounded-xl placeholder:text-blue-300 text-blue-700 font-medium focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all ${className}`}
      required
    />
  );
};

export default QuizFormField;
