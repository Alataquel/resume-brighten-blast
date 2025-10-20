import { Card } from "@/components/ui/card";
import { ScoreCard } from "./ScoreCard";
import { Target, FileText, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "action-oriented", label: "Action Oriented", icon: Target },
  { id: "specifics", label: "Specifics", icon: FileText },
  { id: "overusage", label: "Overusage", icon: AlertCircle },
  { id: "avoided-words", label: "Avoided Words", icon: XCircle },
];

export const FeedbackSidebar = ({ activeSection, onSectionChange }: FeedbackSidebarProps) => {
  return (
    <div className="w-full space-y-6">
      {/* Resume Score */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-warning text-white flex items-center justify-center text-xl font-bold">
            68
          </div>
          <h2 className="text-lg font-semibold">Resume Score</h2>
        </div>
        
        <div className="bg-accent/50 border border-secondary/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-foreground">
            You can increase your score by <span className="font-bold text-destructive">19 points</span>.{" "}
            <button className="text-secondary hover:underline">(See how)</button>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ScoreCard score={32} maxScore={40} label="Impact" status="warning" />
          <ScoreCard score={6} maxScore={30} label="Presentation" status="error" />
          <ScoreCard score={30} maxScore={30} label="Competencies" status="good" />
        </div>
      </Card>

      {/* Navigation */}
      <Card className="p-4">
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                  activeSection === section.id
                    ? "bg-accent text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>
      </Card>
    </div>
  );
};
