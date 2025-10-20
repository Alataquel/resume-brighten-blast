import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar } from "lucide-react";

interface CVCardProps {
  id: string;
  name: string;
  template: string;
  updatedDate: string;
  onEdit: (id: string) => void;
}

export const CVCard = ({ 
  id, 
  name, 
  template, 
  updatedDate, 
  onEdit
}: CVCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Preview Area */}
      <div className="bg-accent/30 p-8 flex items-center justify-center min-h-[280px]">
        <div className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center">
          <FileText className="w-10 h-10 text-primary" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 space-y-4">
        <div className="text-center space-y-1">
          <p className="font-medium text-foreground capitalize">{template}</p>
          <p className="text-sm text-muted-foreground">Resume Template</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Updated {updatedDate}</span>
          </div>
          <p className="text-sm text-muted-foreground">Template: {template}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end pt-2">
          <Button onClick={() => onEdit(id)} size="lg" className="w-full">
            Select Resume
          </Button>
        </div>
      </div>
    </Card>
  );
};
