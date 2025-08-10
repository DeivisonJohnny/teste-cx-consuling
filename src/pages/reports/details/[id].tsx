"use client";

import { useEffect, useState } from "react";
import { getReportById, type Report } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ReportDetailPage() {
  const router = useRouter();
  const id = router.query.id;
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadReport = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getReportById(String(id));
        setReport(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erro desconhecido ao carregar o relatório."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadReport();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Carregando relatório...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Erro: {error}</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Relatório não encontrado.</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto py-8 px-4 bg-white w-full">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/" aria-label="Voltar para a página inicial">
          <ChevronLeft className="h-6 w-6 text-black" />
        </Link>
      </Button>
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Relatório de Análise CRO
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-700">
            <div>
              <p>
                <strong className="font-semibold">URL:</strong>{" "}
                <a
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all max-w-full block"
                >
                  {report.url}
                </a>
              </p>
              <p>
                <strong className="font-semibold">Data:</strong>{" "}
                {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-start md:justify-end">
              <p className="flex items-center gap-2">
                <strong className="font-semibold">Confiança:</strong>{" "}
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {(report.confidence * 100).toFixed(0)}%
                </Badge>
              </p>
            </div>
          </div>

          <Separator />

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Análise do Layout
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {report.report.layout_analysis}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Avaliação dos CTAs
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {report.report.cta_evaluation}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Qualidade das Imagens
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {report.report.image_quality}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Clareza da Descrição
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {report.report.description_clarity}
            </p>
          </section>

          <Separator />

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Melhorias Sugeridas
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {report.report.improvements.map((improvement, index) => (
                <li key={index} className="leading-relaxed">
                  {improvement}
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
