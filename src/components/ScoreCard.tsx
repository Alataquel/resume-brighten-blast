import { Card } from "@/components/ui/card";

interface ScoreCardProps {
  score: number;
  maxScore: number;
  label: string;
  status?: "good" | "warning" | "error";
}

export const ScoreCard = ({ score, maxScore, label, status }: ScoreCardProps) => {
  const percentage = (score / maxScore) * 100;
  const statusColor = status === "good" ? "text-green-600" : status === "warning" ? "text-yellow-600" : "text-red-600";
  const statusIcon = status === "good" ? "✓" : status === "warning" ? "!" : "!";

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <div className={`text-3xl font-bold ${statusColor}`}>
          {score}
          <span className="text-lg text-muted-foreground">/{maxScore}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        {status && (
          <span className={`text-lg ${statusColor}`}>{statusIcon}</span>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            status === "good" ? "bg-green-600" : status === "warning" ? "bg-yellow-600" : "bg-red-600"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
