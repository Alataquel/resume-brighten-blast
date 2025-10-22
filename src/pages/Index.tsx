import { useState, useEffect } from "react";
import { UploadInterface } from "@/components/UploadInterface";
import { LoadingState } from "@/components/LoadingState";
import { SimplifiedGradingSection } from "@/components/SimplifiedGradingSection";
import { Button } from "@/components/ui/button";

type AppState = "upload" | "loading" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("upload");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);

  const handleUpload = (file: File) => {
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

  // Show upload view
  if (appState === "upload") {
    return <UploadInterface onUpload={handleUpload} />;
  }

  // Show loading state
  if (appState === "loading") {
    return <LoadingState />;
  }

  // Results View
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAppState("upload")}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Resume Grading Results</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Overall Score</span>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-foreground">55</div>
                <span className="text-muted-foreground text-lg">/100</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split View */}
      <main className="flex-1 overflow-hidden">
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left: Feedback Sections */}
          <div className="overflow-y-auto p-8 bg-background border-r border-border">
            <div className="max-w-2xl space-y-8">
              {/* Score Progress */}
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium text-foreground">Overall Score</h2>
                  <div className="text-3xl font-bold text-foreground">55/100</div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3 transition-all"
                    style={{ width: "55%" }}
                  />
                </div>
              </div>

              {/* Contact Section */}
              <SimplifiedGradingSection
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
              <SimplifiedGradingSection
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
              <SimplifiedGradingSection
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
              <SimplifiedGradingSection
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
              <SimplifiedGradingSection
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
          <div className="bg-muted/10 overflow-y-auto">
            <div className="p-12 max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center border-b border-border pb-6 mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">John Smith</h1>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-2">
                    <span className="text-primary">📧</span> john.smith@email.com
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary">📱</span> +1 (555) 123-4567
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-primary">📍</span> New York, NY
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-primary">■</span> Professional Summary
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed italic pl-6">
                  [Summary section missing - see feedback]
                </p>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary">■</span> Experience
                </h2>
                <div className="space-y-6 pl-6">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-foreground">Senior Software Engineer</h3>
                      <span className="text-sm text-muted-foreground">2020 - Present</span>
                    </div>
                    <p className="text-sm text-primary mb-3">Tech Company Inc.</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                      <li>Led development of key features for main product</li>
                      <li>Managed team of 5 junior developers</li>
                      <li>Improved system performance by 40%</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-foreground">Software Developer</h3>
                      <span className="text-sm text-muted-foreground">2018 - 2020</span>
                    </div>
                    <p className="text-sm text-primary mb-3">StartUp Solutions</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                      <li>Developed mobile applications using React Native</li>
                      <li>Collaborated with design team on UI/UX improvements</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary">■</span> Education
                </h2>
                <div className="pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-foreground">Bachelor of Science</h3>
                    <span className="text-sm text-muted-foreground">2014 - 2018</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">University of Technology</p>
                  <p className="text-sm text-muted-foreground italic">[Field of study missing - see feedback]</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary">■</span> Skills
                </h2>
                <div className="pl-6">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="px-4 py-2 bg-primary/10 text-foreground text-sm rounded-md font-medium">JavaScript</span>
                    <span className="px-4 py-2 bg-primary/10 text-foreground text-sm rounded-md font-medium">React</span>
                    <span className="px-4 py-2 bg-primary/10 text-foreground text-sm rounded-md font-medium">Node.js</span>
                  </div>
                  <p className="text-sm text-destructive italic">[Skills section needs expansion - see feedback]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
