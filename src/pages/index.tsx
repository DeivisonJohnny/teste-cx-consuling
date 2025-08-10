// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { UrlInputForm } from "@/components/url-input-form";
import { ReportDisplay } from "@/components/report-display";
import { RecentReportsList } from "@/components/recent-reports-list";
import {
  processUrl,
  getRecentReports,
  saveReport,
  type Report,
} from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaginaInicial() {
  const [relatorioAtual, setRelatorioAtual] = useState<Report | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [relatoriosRecentes, setRelatoriosRecentes] = useState<Report[]>([]);

  useEffect(() => {
    // Carrega relatórios recentes ao montar o componente
    setRelatoriosRecentes(getRecentReports());
  }, []);

  const aoEnviarUrl = async (url: string) => {
    setCarregando(true);
    setErro(null);
    setRelatorioAtual(null); // Limpa relatório anterior

    try {
      const relatorio = await processUrl(url);
      setRelatorioAtual(relatorio);
      saveReport(relatorio); // Salva o novo relatório
      setRelatoriosRecentes(getRecentReports()); // Atualiza lista de recentes
    } catch (err) {
      setErro(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado."
      );
    } finally {
      setCarregando(false);
    }
  };

  const aoSelecionarRelatorioRecente = (relatorio: Report) => {
    setRelatorioAtual(relatorio);
    setErro(null); // Limpa erros anteriores
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8 min-h-screen bg-white text-black">
      <header className="w-full max-w-4xl text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Analisador de Página CRO
        </h1>
        <p className="text-lg">
          Obtenha instantaneamente insights de Otimização de Taxa de Conversão
          para suas páginas de produto no e-commerce.
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        <UrlInputForm
          onSubmit={aoEnviarUrl}
          isLoading={carregando}
          error={erro}
        />

        <section className="w-full">
          <ReportDisplay
            report={relatorioAtual}
            isLoading={carregando}
            error={erro}
          />
        </section>

        <section className="w-full space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Suas Análises Recentes</h2>
            {relatoriosRecentes.length > 0 && (
              <Button variant="outline" asChild>
                <Link href="/reports">Ver Todas</Link>
              </Button>
            )}
          </div>
          <RecentReportsList
            reports={relatoriosRecentes}
            onSelectReport={aoSelecionarRelatorioRecente}
          />
        </section>
      </main>

      <footer className="mt-auto py-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Analisador CRO. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
