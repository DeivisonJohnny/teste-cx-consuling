"use client";

import { useState, useEffect } from "react";
import { getRecentReports, type Report } from "@/services/api";
import { RecentReportsList } from "@/components/recent-reports-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react"; // Added Loader2 for loading spinner

export default function ReportsPage() {
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        const response = await getRecentReports();
        setAllReports(response);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError("Falha ao carregar relatórios. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8 min-h-screen bg-white">
      <header className="w-full max-w-4xl space-y-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center w-full">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Voltar para a página inicial">
              <ChevronLeft className="h-6 w-6 text-black" />
            </Link>
          </Button>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center text-black ">
            Todos os Relatórios Anteriores
          </h1>

          <div className="w-10 h-10 flex items-center justify-center" />
        </div>
        <p className="text-lg text-muted-foreground text-center">
          Navegue pelos relatórios de análise CRO gerados anteriormente.
        </p>
      </header>
      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">
              Carregando relatórios...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-destructive">
            <p className="text-lg font-medium">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Tentar Novamente
            </Button>
          </div>
        ) : allReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
            <p className="text-lg">Nenhum relatório encontrado.</p>
            <p className="text-sm">
              Comece a gerar novos relatórios para vê-los aqui.
            </p>
          </div>
        ) : (
          <section className="w-full flex justify-center items-center">
            <RecentReportsList
              reports={allReports}
              title="Todos os Relatórios Armazenados"
            />
          </section>
        )}
      </main>
    </div>
  );
}
