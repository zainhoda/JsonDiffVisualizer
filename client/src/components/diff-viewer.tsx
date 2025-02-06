import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JsonDiff } from "@/lib/json-diff";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DiffViewerProps {
  diff: JsonDiff | null;
}

export default function DiffViewer({ diff }: DiffViewerProps) {
  if (!diff) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Enter valid JSON in both editors to see the comparison
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold mb-2">Structure Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Left Fields</p>
            <p className="text-2xl font-bold">{diff.leftFieldCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Right Fields</p>
            <p className="text-2xl font-bold">{diff.rightFieldCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Added Fields</p>
            <p className="text-2xl font-bold text-green-600">
              {diff.addedFields.length}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Removed Fields</p>
            <p className="text-2xl font-bold text-red-600">
              {diff.removedFields.length}
            </p>
          </div>
        </div>
      </section>

      {diff.addedFields.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-2">Added Fields</h3>
          <div className="flex flex-wrap gap-2">
            {diff.addedFields.map((field) => (
              <Badge key={field} variant="outline" className="text-green-600">
                {field}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {diff.removedFields.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-2">Removed Fields</h3>
          <div className="flex flex-wrap gap-2">
            {diff.removedFields.map((field) => (
              <Badge key={field} variant="outline" className="text-red-600">
                {field}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {diff.changedValues.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-2">Changed Values</h3>
          <div className="space-y-2">
            {diff.changedValues.map((change) => (
              <div
                key={change.path}
                className="grid grid-cols-[auto_1fr_auto_1fr] gap-2 items-center text-sm font-mono break-all"
              >
                <span className="text-muted-foreground whitespace-nowrap">{change.path}:</span>
                <span className="text-red-600 px-2 py-1 bg-red-50 rounded">{change.oldValue}</span>
                <ArrowRight className="h-4 w-4 justify-self-center" />
                <span className="text-green-600 px-2 py-1 bg-green-50 rounded">{change.newValue}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}