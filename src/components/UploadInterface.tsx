import { Upload, User, Briefcase, GraduationCap, Lightbulb, AlignLeft, FileText, Lightbulb as TipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UploadInterfaceProps {
  onUpload: (file: File) => void;
}

export const UploadInterface = ({ onUpload }: UploadInterfaceProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-3">How good is your CV?</h1>
              <p className="text-muted-foreground text-lg">Upload your resume as PDF and get an instant review and suggestions.</p>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary" className="text-sm">PDF</Badge>
                <Badge variant="secondary" className="text-sm">AI-assisted</Badge>
                <Badge variant="secondary" className="text-sm">Private</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground mb-2">Tips</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Use clear headings • Keep it 1-2 pages • Quantify impact
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">How good is your CV?</h2>
              
              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center bg-accent/5 hover:bg-accent/10 transition-colors mb-6"
              >
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <input
                    id="cv-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button size="lg" className="mb-3">
                    Upload your CV (PDF)
                  </Button>
                  <p className="text-sm text-muted-foreground">or drop it here</p>
                </label>
              </div>

              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full"
                onClick={() => document.getElementById('cv-upload')?.click()}
              >
                Review my resume
              </Button>
            </Card>

            {/* What we check section */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">What we check</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Contact</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>Experiences</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span>Education</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Lightbulb className="w-4 h-4 text-muted-foreground" />
                  <span>Skills</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <AlignLeft className="w-4 h-4 text-muted-foreground" />
                  <span>Summary</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>Format</span>
                </div>
              </div>

              <div className="bg-accent/30 rounded-lg p-4 border border-primary/20">
                <div className="flex gap-3">
                  <TipIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    Keep descriptions concise and quantifiable. Adding measurable results is a great way to make your experiences more impactful.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="flex items-start justify-center">
            <Card className="w-full h-[600px] flex items-center justify-center bg-muted/30">
              <div className="text-center text-muted-foreground">
                <Upload className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Upload a PDF to preview.</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
