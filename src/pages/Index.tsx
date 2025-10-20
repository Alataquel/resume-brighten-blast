import { useState, useEffect } from "react";
import { CVDashboard } from "@/components/CVDashboard";
import { LoadingState } from "@/components/LoadingState";
import { FeedbackSidebar } from "@/components/FeedbackSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

type AppState = "dashboard" | "loading" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("dashboard");
  const [activeSection, setActiveSection] = useState("action-oriented");
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
        <div className="container mx-auto px-6">
          <Tabs defaultValue="feedback" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="border-0 bg-transparent h-14">
                <TabsTrigger 
                  value="feedback" 
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-6"
                >
                  Resume Level Feedback
                </TabsTrigger>
                <TabsTrigger 
                  value="editor"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-6"
                >
                  SMART Editor
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Resume Score</span>
                  <div className="w-10 h-10 rounded-full bg-warning text-white flex items-center justify-center font-bold">
                    68
                  </div>
                </div>
                <Button variant="outline">Summary</Button>
                <Button variant="ghost" size="icon">↓</Button>
              </div>
            </div>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Left Sidebar */}
          <aside className="space-y-6">
            <FeedbackSidebar 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </aside>

          {/* Main Content Area */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent rounded-full mb-3">
                    <span className="text-sm font-medium text-primary">Action Oriented</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Good Job!</span>
                  </div>
                  <p className="text-foreground">
                    You have done a good job of using action-oriented language in your resume
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button className="flex items-center gap-2 text-secondary hover:underline">
                  <span>What is Action-Oriented?</span>
                  <span>+</span>
                </button>
              </div>
            </Card>

            {/* Resume Preview Area */}
            <Card className="p-8 min-h-[800px] bg-white">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center border-b border-border pb-4">
                  <h1 className="text-2xl font-bold text-foreground mb-1">Education</h1>
                  <p className="text-sm text-muted-foreground italic">
                    Dual Bachelor in Business Administration and International Relations
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded">
                    <span>✓</span>
                    <p>Relevant subjects: Economics (A), Math (A), and EPQ (A*)</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Harrow School, London</h3>
                    <p className="text-sm italic text-muted-foreground">Advanced levels (A-levels) diploma</p>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded">
                        <span className="text-green-600">✓</span>
                        <p>Achieved the Harrow academic excellence award in Spanish</p>
                      </div>
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded">
                        <span className="text-green-600">✓</span>
                        <p>Guided a team of six for two years in the Worlds Economics Cup - an international rigorous economics challenge</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
