// app/reports/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getRecentReports, type Report } from "@/lib/api";
import { RecentReportsList } from "@/components/recent-reports-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ReportsPage() {
  const [allReports, setAllReports] = useState<Report[]>([]);

  useEffect(() => {
    setAllReports(getRecentReports());
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8 min-h-screen bg-background">
      <header className="w-full max-w-4xl text-center space-y-4">
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Go back to home">
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex-grow text-center">
            All Past Reports
          </h1>
          <div className="w-10" /> {/* Spacer to balance the back button */}
        </div>
        <p className="text-lg text-muted-foreground">
          Browse through your previously generated CRO analysis reports.
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        <section className="w-full">
          <RecentReportsList reports={allReports} title="All Stored Reports" />
        </section>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} CRO Analyzer. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
