// components/recent-reports-list.tsx
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Report } from "@/lib/api";

interface RecentReportsListProps {
  reports: Report[];
  onSelectReport?: (report: Report) => void; // Optional prop for main page to display selected report
  title?: string;
}

export function RecentReportsList({
  reports,
  onSelectReport,
  title = "Recent Reports",
}: RecentReportsListProps) {
  if (!reports || reports.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4">
        No recent reports found. Analyze a page to get started!
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {reports.map((report) => (
            <li
              key={report.id}
              className="border rounded-lg p-3 hover:bg-muted transition-colors"
            >
              {onSelectReport ? (
                <button
                  onClick={() => onSelectReport(report)}
                  className="w-full text-left"
                >
                  <p className="font-medium text-primary truncate">
                    {report.url}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {report.timestamp}
                  </p>
                </button>
              ) : (
                // For the dedicated reports page, you might link to a detailed view
                // For this demo, we'll just display the list.
                // If you had a dynamic route like /reports/[id], you'd use:
                // <Link href={`/reports/${report.id}`} className="block">
                <div className="block">
                  <p className="font-medium text-primary truncate">
                    {report.url}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {report.timestamp}
                  </p>
                </div>
                // </Link>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
