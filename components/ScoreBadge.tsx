type Props = {
  score: number;
};

export default function ScoreBadge({ score }: Props) {
  const color =
    score >= 75
      ? "bg-green-100 text-green-700"
      : score >= 50
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className={`inline-flex items-center px-6 py-4 rounded-xl ${color}`}>
      <span className="text-2xl font-bold mr-3">{score}%</span>
      <span className="font-medium">ATS Match Score</span>
    </div>
  );
}
