// components/recent-reports-list.tsx
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Report } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/router";
interface RecentReportsListProps {
  reports: Report[];
  onSelectReport?: (report: Report) => void; // Opcional, para seleção na página principal
  title?: string;
}

export function RecentReportsList({
  reports,
  onSelectReport,
  title = "Recent Reports",
}: RecentReportsListProps) {
  const router = useRouter();

  if (!reports || reports.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4">
        No recent reports found. Analyze a page to get started!
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl shadow-md ">
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
                  onClick={() => router.push(`/reports/details/${report.id}`)}
                  className="w-full text-left"
                >
                  <p className="font-medium text-primary truncate">
                    {report.url}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(report.createdAt).toLocaleString()}
                  </p>
                </button>
              ) : (
                <Link href={`/reports/details/${report.id}`} className="block">
                  <p className="font-medium text-primary truncate">
                    {report.url}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(report.createdAt).toLocaleString()}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
