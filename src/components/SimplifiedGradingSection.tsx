import { useState } from "react";
import { ChevronDown, CheckCircle2, XCircle, User, Briefcase, GraduationCap, Lightbulb, AlignLeft, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProCon {
  text: string;
  tips?: string[];
}

interface SimplifiedGradingSectionProps {
  title: string;
  icon: "contact" | "experience" | "education" | "skills" | "summary" | "format";
  prosCount: number;
  consCount: number;
  pros: ProCon[];
  cons: ProCon[];
  suggestedContent?: string;
}

const iconMap = {
  contact: User,
  experience: Briefcase,
  education: GraduationCap,
  skills: Lightbulb,
  summary: AlignLeft,
  format: FileText,
};

export const SimplifiedGradingSection = ({
  title,
  icon,
  prosCount,
  consCount,
  pros,
  cons,
  suggestedContent,
}: SimplifiedGradingSectionProps) => {
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
    <div className="border border-border rounded-lg p-6 bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-medium text-foreground">Pros</h4>
            <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50 border-0">
              {prosCount}
            </Badge>
          </div>
          <div className="space-y-3">
            {pros.map((pro, index) => (
              <div key={`pro-${index}`} className="space-y-2">
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{pro.text}</p>
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
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-medium text-foreground">Cons</h4>
            <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50 border-0">
              {consCount}
            </Badge>
          </div>
          <div className="space-y-3">
            {cons.map((con, index) => (
              <div key={`con-${index}`} className="space-y-2">
                <div className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{con.text}</p>
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
          <h4 className="text-sm font-semibold text-foreground mb-3">Suggested content</h4>
          <p className="text-sm text-foreground leading-relaxed">{suggestedContent}</p>
        </div>
      )}
    </div>
  );
};
