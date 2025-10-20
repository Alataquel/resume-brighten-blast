import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ResumeUploadProps {
  onUpload: (file: File) => void;
}

export const ResumeUpload = ({ onUpload }: ResumeUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    }
  };

  return (
    <Card className="p-8 border-2 border-dashed border-border hover:border-secondary transition-colors">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Upload your CV (PDF)</h3>
          <p className="text-sm text-muted-foreground">or drop it here</p>
        </div>

        <label htmlFor="cv-upload">
          <input
            id="cv-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button asChild variant="default" size="lg">
            <span className="cursor-pointer">Choose File</span>
          </Button>
        </label>
      </div>
    </Card>
  );
};
