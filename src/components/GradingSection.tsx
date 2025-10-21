import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, CheckCircle2, XCircle, User, Briefcase, GraduationCap, Lightbulb, AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProCon {
  text: string;
  tips?: string[];
  highlightId?: string;
}

interface GradingSectionProps {
  title: string;
  icon: "contact" | "experience" | "education" | "skills" | "summary";
  prosCount: number;
  consCount: number;
  pros: ProCon[];
  cons: ProCon[];
  suggestedContent?: string;
  onHighlight?: (id: string | null) => void;
}

const iconMap = {
  contact: User,
  experience: Briefcase,
  education: GraduationCap,
  skills: Lightbulb,
  summary: AlignLeft,
};

export const GradingSection = ({
  title,
  icon,
  prosCount,
  consCount,
  pros,
  cons,
  suggestedContent,
  onHighlight,
}: GradingSectionProps) => {
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());
  const Icon = iconMap[icon];

  const toggleTip = (id: string) => {
    const newExpanded = new Set(expandedTips);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTips(newExpanded);
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-green-700">Pros</h4>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              {prosCount}
            </span>
          </div>
          <div className="space-y-3">
            {pros.map((pro, index) => (
              <div key={`pro-${index}`} className="space-y-2">
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{pro.text}</p>
                </div>
                {pro.tips && pro.tips.length > 0 && (
                  <>
                    <button
                      onClick={() => toggleTip(`pro-${index}`)}
                      className="ml-7 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform",
                          expandedTips.has(`pro-${index}`) && "rotate-180"
                        )}
                      />
                      Tips
                    </button>
                    {expandedTips.has(`pro-${index}`) && (
                      <div className="ml-7 pl-3 border-l-2 border-muted space-y-1">
                        {pro.tips.map((tip, tipIndex) => (
                          <p key={tipIndex} className="text-xs text-muted-foreground">
                            {tip}
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-red-700">Cons</h4>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-sm font-medium">
              {consCount}
            </span>
          </div>
          <div className="space-y-3">
            {cons.map((con, index) => (
              <div 
                key={`con-${index}`} 
                className="space-y-2"
                onMouseEnter={() => con.highlightId && onHighlight?.(con.highlightId)}
                onMouseLeave={() => onHighlight?.(null)}
              >
                <div className="flex gap-2 cursor-pointer">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{con.text}</p>
                </div>
                {con.tips && con.tips.length > 0 && (
                  <>
                    <button
                      onClick={() => toggleTip(`con-${index}`)}
                      className="ml-7 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform",
                          expandedTips.has(`con-${index}`) && "rotate-180"
                        )}
                      />
                      Tips
                    </button>
                    {expandedTips.has(`con-${index}`) && (
                      <div className="ml-7 pl-3 border-l-2 border-muted space-y-1">
                        {con.tips.map((tip, tipIndex) => (
                          <p key={tipIndex} className="text-xs text-muted-foreground">
                            {tip}
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Content */}
      {suggestedContent && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Suggested content</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{suggestedContent}</p>
        </div>
      )}
    </Card>
  );
};
