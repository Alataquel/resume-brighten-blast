import { useState } from "react";
import { ResumeUpload } from "@/components/ResumeUpload";
import { FeedbackSidebar } from "@/components/FeedbackSidebar";
import { WhatWeCheck } from "@/components/WhatWeCheck";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeSection, setActiveSection] = useState("action-oriented");
  const [showResults, setShowResults] = useState(false);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleReview = () => {
    if (uploadedFile) {
      setShowResults(true);
    }
  };

  if (!showResults) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-primary">Resume Grader</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">PDF</Button>
                <Button variant="ghost" size="sm">AI-assisted</Button>
                <Button variant="ghost" size="sm">Private</Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">How good is your CV?</h2>
              </div>

              <ResumeUpload onUpload={handleUpload} />

              {uploadedFile && (
                <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button onClick={handleReview} size="lg">
                    Review my resume
                  </Button>
                </div>
              )}

              <WhatWeCheck />
            </div>

            {/* Right Column - Preview */}
            <div className="flex items-center justify-center">
              <Card className="w-full h-[600px] flex items-center justify-center bg-muted/30">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    {uploadedFile ? "Ready to review" : "Upload a PDF to preview."}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Want to improve your score?
              </p>
              <Button variant="outline">Open Resume Builder</Button>
            </div>
          </div>
        </footer>
      </div>
    );
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
