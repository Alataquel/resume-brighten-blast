import { Card } from "@/components/ui/card";
import { User, Briefcase, GraduationCap, Lightbulb, FileText, Layout } from "lucide-react";

const checkItems = [
  { icon: User, label: "Contact" },
  { icon: Briefcase, label: "Experiences" },
  { icon: GraduationCap, label: "Education" },
  { icon: Lightbulb, label: "Skills" },
  { icon: FileText, label: "Summary" },
  { icon: Layout, label: "Format" },
];

export const WhatWeCheck = () => {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-3 mb-4">
        <FileText className="w-5 h-5 text-primary mt-1" />
        <h3 className="text-lg font-semibold">What we check</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {checkItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-4 bg-accent rounded-lg border border-secondary/20">
        <div className="flex gap-2">
          <span className="text-warning text-lg">💡</span>
          <p className="text-sm text-muted-foreground">
            Keep descriptions concise and quantifiable. Adding measurable results is a great way to make your experiences more impactful.
          </p>
        </div>
      </div>
    </Card>
  );
};
