import { useState, useEffect } from "react";
import { CVDashboard } from "@/components/CVDashboard";
import { LoadingState } from "@/components/LoadingState";
import { GradingSection } from "@/components/GradingSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type AppState = "dashboard" | "loading" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("dashboard");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);

  const handleSelectCV = (id: string) => {
    setSelectedCV(id);
    setAppState("loading");
  };

  const handleUploadNew = (file: File) => {
    setSelectedCV(file.name);
    setAppState("loading");
  };

  // Simulate loading process
  useEffect(() => {
    if (appState === "loading") {
      const timer = setTimeout(() => {
        setAppState("results");
      }, 3000); // 3 second loading simulation

      return () => clearTimeout(timer);
    }
  }, [appState]);

  // Show dashboard view
  if (appState === "dashboard") {
    return <CVDashboard onSelectCV={handleSelectCV} onUploadNew={handleUploadNew} />;
  }

  // Show loading state
  if (appState === "loading") {
    return <LoadingState />;
  }

  // Results View
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Resume Grading Results</h1>
              <p className="text-sm text-muted-foreground mt-1">Detailed analysis of your CV</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setAppState("dashboard")}
              >
                ← Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Score Overview */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Score</h2>
              <div className="text-2xl font-bold text-warning">55/100</div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-warning rounded-full h-3 transition-all"
                  style={{ width: "55%" }}
                />
              </div>
            </div>
          </Card>

          {/* Contact Section */}
          <GradingSection
            title="Contact"
            icon="contact"
            prosCount={3}
            consCount={2}
            pros={[
              { text: "Contact information includes a phone number for easy reachability." },
              { text: "Location information is clearly mentioned, indicating geographical availability." },
              { text: "Your email address has a proper structure and appears valid." },
            ]}
            cons={[
              {
                text: "LinkedIn profile is not linked.",
                tips: ["Add your LinkedIn URL to increase professional credibility"],
              },
              {
                text: "Consider using your real name in the email address for a more professional appearance.",
                tips: ["Professional email addresses help recruiters remember you"],
              },
            ]}
          />

          {/* Experiences Section */}
          <GradingSection
            title="Experiences"
            icon="experience"
            prosCount={4}
            consCount={1}
            pros={[
              { text: "Job titles are clearly defined in the experience section." },
              { text: "Company names are mentioned, adding credibility to the experience section." },
              { text: "Start and end dates for work experiences are specified." },
              { text: "Descriptions in your work experience section are within the standard length." },
            ]}
            cons={[
              {
                text: "Some descriptions in your work experience section lack a professional tone.",
                tips: ["Use action verbs and quantifiable achievements to enhance impact"],
              },
            ]}
          />

          {/* Education Section */}
          <GradingSection
            title="Education"
            icon="education"
            prosCount={3}
            consCount={1}
            pros={[
              { text: "University names are mentioned, detailing the academic journey." },
              { text: "Type of degree is clearly stated, clarifying educational level." },
              { text: "Start and end dates in the education section are included, showing the timeline." },
            ]}
            cons={[
              {
                text: "Field of study is missing in the education section.",
                tips: ["Always include your major or field of study for clarity"],
              },
            ]}
          />

          {/* Skills Section */}
          <GradingSection
            title="Skills"
            icon="skills"
            prosCount={0}
            consCount={1}
            pros={[]}
            cons={[
              {
                text: "Your skills section is not within the standard range.",
                tips: ["Include 6-12 relevant skills for optimal presentation"],
              },
            ]}
          />

          {/* Summary Section */}
          <GradingSection
            title="Summary"
            icon="summary"
            prosCount={0}
            consCount={1}
            pros={[]}
            cons={[
              {
                text: "Personal summary or objective is missing.",
                tips: ["A strong summary can set the tone for your entire resume"],
              },
            ]}
            suggestedContent="Founder and CEO with experience in AI-driven solutions for job applications. Skilled in financial analysis and management consulting, having worked with early-stage startups and corporate giants. Successfully led the development and execution of strategic initiatives at Jobsi, enhancing user engagement and operational efficiency."
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
