// components/report-display.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Report } from "@/lib/api";
import { Spinner } from "./spinner";

interface ReportDisplayProps {
  report: Report | null;
  isLoading: boolean;
  error: string | null;
}

export function ReportDisplay({
  report,
  isLoading,
  error,
}: ReportDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg min-h-[200px]">
        <Spinner size={48} className="text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Generating CRO report...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-100 border border-red-300 text-red-700 rounded-lg min-h-[200px]">
        <p className="text-lg font-semibold">Error:</p>
        <p className="text-center mt-2">{error}</p>
        <p className="text-sm mt-2">Please check the URL and try again.</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg min-h-[200px]">
        <p className="text-lg text-muted-foreground">
          Enter a URL to get a CRO analysis report.
        </p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center">
          CRO Analysis Report
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Report for:{" "}
          <a
            href={report.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {report.url}
          </a>
        </p>
        <p className="text-xs text-muted-foreground text-center">
          Generated on: {report.timestamp}
        </p>
        {report.confidenceScore && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            AI Confidence:{" "}
            <span className="font-semibold text-primary">
              {(report.confidenceScore * 100).toFixed(0)}%
            </span>
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Layout Structure</h3>
          <p className="text-muted-foreground">{report.croInsights.layout}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Calls to Action (CTAs)</h3>
          <p className="text-muted-foreground">{report.croInsights.ctas}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Image Quality</h3>
          <p className="text-muted-foreground">{report.croInsights.images}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Product Description Clarity</h3>
          <p className="text-muted-foreground">
            {report.croInsights.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
