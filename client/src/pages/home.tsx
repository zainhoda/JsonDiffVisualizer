import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JsonEditor from "@/components/json-editor";
import DiffViewer from "@/components/diff-viewer";
import { compareJson } from "@/lib/json-diff";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [leftJson, setLeftJson] = useState("");
  const [rightJson, setRightJson] = useState("");
  const [leftError, setLeftError] = useState<string | null>(null);
  const [rightError, setRightError] = useState<string | null>(null);

  const handleLeftChange = (value: string) => {
    setLeftJson(value);
    setLeftError(null);
    try {
      if (value) JSON.parse(value);
    } catch (e) {
      setLeftError((e as Error).message);
    }
  };

  const handleRightChange = (value: string) => {
    setRightJson(value);
    setRightError(null);
    try {
      if (value) JSON.parse(value);
    } catch (e) {
      setRightError((e as Error).message);
    }
  };

  const getDiff = () => {
    try {
      const left = leftJson ? JSON.parse(leftJson) : null;
      const right = rightJson ? JSON.parse(rightJson) : null;
      if (!left || !right) return null;
      return compareJson(left, right);
    } catch {
      return null;
    }
  };

  const diff = getDiff();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="mx-auto max-w-7xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            JSON Comparison Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <JsonEditor
              value={leftJson}
              onChange={handleLeftChange}
              error={leftError}
              label="Left JSON"
            />
            <JsonEditor
              value={rightJson}
              onChange={handleRightChange}
              error={rightError}
              label="Right JSON"
            />
          </div>
          
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <DiffViewer diff={diff} />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
