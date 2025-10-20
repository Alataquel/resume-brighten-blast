import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CVCard } from "./CVCard";
import { Card } from "@/components/ui/card";

interface CVDashboardProps {
  onSelectCV: (id: string) => void;
  onUploadNew: (file: File) => void;
}

// Mock data - in a real app, this would come from a database
const mockCVs = [
  {
    id: "1",
    name: "My Resume 1",
    template: "modern",
    updatedDate: "Oct 19, 2025"
  },
  {
    id: "2",
    name: "My Resume 2",
    template: "modern",
    updatedDate: "Oct 20, 2025"
  }
];

export const CVDashboard = ({ onSelectCV, onUploadNew }: CVDashboardProps) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onUploadNew(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My CVs</h1>
              <p className="text-muted-foreground">Manage and organize your professional resumes</p>
            </div>
            <div className="flex gap-3">
              <label htmlFor="upload-new-cv">
                <input
                  id="upload-new-cv"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button asChild variant="outline" className="gap-2">
                  <span className="cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload CV
                  </span>
                </Button>
              </label>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create New CV
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCVs.map((cv) => (
            <CVCard
              key={cv.id}
              id={cv.id}
              name={cv.name}
              template={cv.template}
              updatedDate={cv.updatedDate}
              onEdit={onSelectCV}
              onCopy={(id) => console.log("Copy", id)}
              onDelete={(id) => console.log("Delete", id)}
            />
          ))}

          {/* New CV Card */}
          <Card className="overflow-hidden border-2 border-dashed border-border hover:border-secondary transition-colors cursor-pointer">
            <label htmlFor="upload-cv-card" className="cursor-pointer">
              <input
                id="upload-cv-card"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="p-8 flex flex-col items-center justify-center min-h-[420px] space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground mb-1">Upload New CV</p>
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>
            </label>
          </Card>
        </div>
      </main>
    </div>
  );
};
