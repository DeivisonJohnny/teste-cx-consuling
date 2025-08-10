"use client";

import { useState, useEffect } from "react";
import { UrlInputForm } from "@/components/url-input-form";
import { ReportDisplay } from "@/components/report-display";
import { RecentReportsList } from "@/components/recent-reports-list";
import { processUrl, getRecentReports, type Report } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Importado Loader2 para o spinner

export default function HomePage() {
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Para o processamento da URL
  const [error, setError] = useState<string | null>(null); // Para erros de processamento da URL
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [isRecentReportsLoading, setIsRecentReportsLoading] = useState(true); // Para o carregamento inicial de relatórios recentes
  const [recentReportsError, setRecentReportsError] = useState<string | null>(
    null
  ); // Para erros de relatórios recentes

  useEffect(() => {
    const loadRecentReports = async () => {
      try {
        setIsRecentReportsLoading(true);
        setRecentReportsError(null);
        const recent = await getRecentReports();
        setRecentReports(recent);
      } catch (err) {
        setRecentReportsError(
          err instanceof Error
            ? err.message
            : "Erro ao carregar relatórios recentes."
        );
      } finally {
        setIsRecentReportsLoading(false);
      }
    };
    loadRecentReports();
  }, []);

  const handleSubmitUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentReport(null); // Limpa o relatório anterior ao enviar uma nova URL
    try {
      const report = await processUrl(url);
      setCurrentReport(report);
      // Após o processamento, atualiza os relatórios recentes
      const recent = await getRecentReports();
      setRecentReports(recent);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro inesperado ao processar a URL."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecentReport = (report: Report) => {
    setCurrentReport(report);
    setError(null); // Limpa quaisquer erros de processamento ao selecionar um relatório recente
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8 min-h-screen bg-white text-foreground">
      <header className="w-full max-w-4xl text-center space-y-4">
        <h1
          className="text-4xl font-extrabold tracking-tight lg:text-5xl text-black
        
        "
        >
          Analisador de Página CRO
        </h1>
        <p className="text-lg text-muted-foreground">
          Obtenha instantaneamente insights de Otimização de Taxa de Conversão
          para suas páginas de produto no e-commerce.
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        <UrlInputForm
          onSubmit={handleSubmitUrl}
          isLoading={isLoading}
          error={error}
        />

        {/* Seção de Exibição do Relatório */}
        <section className="w-full flex justify-center items-center min-h-[200px]">
          {isLoading && !currentReport ? ( // Mostra o spinner apenas ao carregar um novo relatório
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-lg text-muted-foreground">
                Analisando página...
              </p>
            </div>
          ) : (
            <ReportDisplay
              report={currentReport}
              isLoading={isLoading} // Passa isLoading para ReportDisplay para seus estados internos
              error={error} // Passa error para ReportDisplay para seus estados internos
            />
          )}
        </section>

        {/* Seção de Relatórios Recentes */}
        <section className="w-full space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black">
              Suas Análises Recentes
            </h2>
            {recentReports.length > 0 && (
              <Button variant="outline" asChild>
                <Link href="/reports">Ver Todas</Link>
              </Button>
            )}
          </div>
          {isRecentReportsLoading ? (
            <div className="flex flex-col items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">
                Carregando análises recentes...
              </p>
            </div>
          ) : recentReportsError ? (
            <div className="text-center text-destructive">
              <p>{recentReportsError}</p>
            </div>
          ) : recentReports.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>Nenhuma análise recente encontrada.</p>
            </div>
          ) : (
            <RecentReportsList
              reports={recentReports}
              onSelectReport={handleSelectRecentReport}
            />
          )}
        </section>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Analisador CRO. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
