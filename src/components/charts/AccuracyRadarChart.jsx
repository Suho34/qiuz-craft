import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const AccuracyRadarChart = ({ history }) => {
  const processData = () => {
    const difficultyMap = {};

    history.forEach((quiz) => {
      const { difficulty, accuracy } = quiz;
      if (!difficultyMap[difficulty]) {
        difficultyMap[difficulty] = { count: 0, totalAccuracy: 0 };
      }
      difficultyMap[difficulty].count++;
      difficultyMap[difficulty].totalAccuracy += accuracy;
    });

    return Object.entries(difficultyMap).map(([difficulty, data]) => ({
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      accuracy: Math.round(data.totalAccuracy / data.count),
      fullMark: 100,
    }));
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart outerRadius="80%" data={processData()}>
        <PolarGrid />
        <PolarAngleAxis dataKey="difficulty" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Accuracy"
          dataKey="accuracy"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default AccuracyRadarChart;
