import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Copy, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  label: string;
}

export default function JsonEditor({
  value,
  onChange,
  error,
  label,
}: JsonEditorProps) {
  const { toast } = useToast();

  const handleFormat = () => {
    try {
      if (!value) return;
      const formatted = JSON.stringify(JSON.parse(value), null, 2);
      onChange(formatted);
    } catch (e) {
      // Error will be shown by the error state
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied!",
        description: "JSON content copied to clipboard",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFormat}
            disabled={!value}
          >
            Format
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!value}
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!value}
          >
            <Trash className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono min-h-[300px]"
        placeholder="Paste JSON here..."
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
