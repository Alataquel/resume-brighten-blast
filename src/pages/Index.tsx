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
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAppState("dashboard")}
              >
                ← Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Resume Grading Results</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Overall Score</span>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-warning">55</div>
                <span className="text-muted-foreground">/100</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split View */}
      <main className="h-[calc(100vh-73px)] overflow-hidden">
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left: Feedback Sections */}
          <div className="overflow-y-auto p-6 space-y-4 bg-background">
            <div className="max-w-2xl space-y-4">
              {/* Score Progress */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-foreground">Overall Score</h2>
                  <div className="text-xl font-bold text-warning">55/100</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all"
                    style={{ width: "55%" }}
                  />
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
          </div>

          {/* Right: CV Preview */}
          <div className="bg-muted/30 border-l border-border overflow-y-auto">
            <div className="p-8">
              <Card className="max-w-3xl mx-auto bg-white shadow-lg">
                <div className="p-12 space-y-6">
                  {/* Header */}
                  <div className="text-center border-b-2 border-primary pb-4">
                    <h1 className="text-3xl font-bold text-foreground mb-2">John Smith</h1>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span>📧 john.smith@email.com</span>
                      <span>📱 +1 (555) 123-4567</span>
                      <span>📍 New York, NY</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <span className="text-primary">▪</span> Professional Summary
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      [Summary section missing - see feedback]
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <span className="text-primary">▪</span> Experience
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-foreground">Senior Software Engineer</h3>
                          <span className="text-sm text-muted-foreground">2020 - Present</span>
                        </div>
                        <p className="text-sm text-primary mb-2">Tech Company Inc.</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                          <li>Led development of key features for main product</li>
                          <li>Managed team of 5 junior developers</li>
                          <li>Improved system performance by 40%</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-foreground">Software Developer</h3>
                          <span className="text-sm text-muted-foreground">2018 - 2020</span>
                        </div>
                        <p className="text-sm text-primary mb-2">StartUp Solutions</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                          <li>Developed mobile applications using React Native</li>
                          <li>Collaborated with design team on UI/UX improvements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <span className="text-primary">▪</span> Education
                    </h2>
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-foreground">Bachelor of Science</h3>
                        <span className="text-sm text-muted-foreground">2014 - 2018</span>
                      </div>
                      <p className="text-sm text-muted-foreground">University of Technology</p>
                      <p className="text-sm text-muted-foreground italic">[Field of study missing - see feedback]</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <span className="text-primary">▪</span> Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-accent text-sm rounded-full">JavaScript</span>
                      <span className="px-3 py-1 bg-accent text-sm rounded-full">React</span>
                      <span className="px-3 py-1 bg-accent text-sm rounded-full">Node.js</span>
                    </div>
                    <p className="text-xs text-destructive italic">[Skills section needs expansion - see feedback]</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
