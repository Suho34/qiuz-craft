import QuizFormField from "./QuizFormField";

const QuizSettings = ({
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  questionCount,
  setQuestionCount,
}) => {
  return (
    <div className="space-y-4">
      <QuizFormField
        label="📚 Enter topic (e.g., Quantum Physics)"
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <QuizFormField
        label="Difficulty"
        type="select"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        options={[
          { value: "easy", label: "🟢 Easy" },
          { value: "medium", label: "🟡 Medium" },
          { value: "hard", label: "🔴 Hard" },
        ]}
      />

      <QuizFormField
        label="Question Count"
        type="select"
        value={questionCount}
        onChange={(e) => setQuestionCount(Number(e.target.value))}
        options={[5, 10, 15, 20].map((num) => ({
          value: num,
          label: `${num} Questions${num === 10 ? " 🌟" : ""}`,
        }))}
      />
    </div>
  );
};

export default QuizSettings;
