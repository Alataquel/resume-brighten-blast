import { useState, useEffect } from "react";
import { UploadInterface } from "@/components/UploadInterface";
import { SimplifiedGradingSection } from "@/components/SimplifiedGradingSection";
import { Button } from "@/components/ui/button";

type AppState = "idle" | "loading" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("idle");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);

  const handleUpload = (file: File) => {
    setSelectedCV(file.name);
    setAppState("loading");
  };

  const handleReview = () => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Always show upload interface */}
      <UploadInterface onUpload={handleUpload} onReview={handleReview} />

      {/* Show loading or results below */}
      {appState === "loading" && (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Analyzing your resume...</p>
            </div>
          </div>
        </div>
      )}

      {appState === "results" && (
        <div className="border-t border-border bg-card">
          {/* Results Header */}
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Resume Grading Results</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Overall Score</span>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-warning">55</div>
                  <span className="text-muted-foreground text-lg">/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Single Column */}
          <main className="container mx-auto px-8 py-8 max-w-5xl">
        <div className="space-y-6">
          {/* Score Progress */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">Score</h2>
              <div className="text-2xl font-bold text-warning">50/100</div>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-warning rounded-full h-2.5 transition-all"
                style={{ width: "50%" }}
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
            consCount={2}
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
              {
                text: "Some descriptions in your work experience section are not within the standard length.",
                tips: ["Keep descriptions concise and focused on achievements"],
              },
            ]}
          />

          {/* Educations Section */}
          <SimplifiedGradingSection
            title="Educations"
            icon="education"
            prosCount={3}
            consCount={1}
            pros={[
              { text: "University names are mentioned, detailing the academic journey." },
              { text: "Type of degrees is clearly stated, clarifying educational level." },
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
            suggestedContent="Dynamic Founder and CEO with over 2 years of experience in establishing innovative platforms, including ApplyLab and WorkTap. Proven expertise in team leadership, organizational structure design, and market analysis. Skilled in Java, JavaScript, and system administration, with notable achievements such as launching partnerships with multiple universities and building a robust pipeline of restaurant clients."
          />

          {/* Format Section */}
          <SimplifiedGradingSection
            title="Format"
            icon="format"
            prosCount={4}
            consCount={0}
            pros={[
              { text: "Resume file size is within the required limit (under 2MB), ensuring easy parsing by the Applicant Tracking System." },
              { text: "Your resume is in PDF format, which is more professional." },
              { text: "Text-based PDF is recommended for better parsing and readability." },
              { text: "Resume is concisely formatted to between 1-3 pages, focusing on relevancy." },
            ]}
            cons={[]}
          />
          </div>
        </main>
      </div>
      )}
    </div>
  );
};

export default Index;
