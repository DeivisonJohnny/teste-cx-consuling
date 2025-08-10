import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "./spinner";
import type { Report } from "@/lib/api";

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
      <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg min-h-[200px] border border-dashed border-gray-300">
        <Spinner size={48} className="text-primary animate-spin" />
        <p className="mt-4 text-lg text-muted-foreground font-medium">
          Gerando relatório CRO...
        </p>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Isso pode levar alguns segundos.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 text-red-700 rounded-lg min-h-[200px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xl font-semibold mt-4">Erro ao gerar relatório</p>
        <p className="text-center mt-2 text-red-600">{error}</p>
        <p className="text-sm mt-2 text-muted-foreground">
          Por favor, verifique a URL e tente novamente.
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg min-h-[200px] border border-dashed border-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="mt-4 text-lg text-muted-foreground font-medium">
          Insira uma URL para obter um relatório de análise CRO.
        </p>
        <p className="text-sm text-muted-foreground text-center mt-1">
          O relatório aparecerá aqui após a análise.
        </p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-none">
      <CardHeader className="pb-4 border-b border-gray-200">
        <CardTitle className="text-3xl font-bold text-center text-gray-800">
          Relatório de Análise CRO
        </CardTitle>

        {/* Exibe ID do relatório */}
        <p className="text-xs text-muted-foreground text-center mt-1">
          ID: {report.id}
        </p>

        {/* Link para a URL */}
        <p className="text-sm text-muted-foreground text-center mt-2">
          Relatório para:{" "}
          <a
            href={report.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium break-all"
          >
            {report.url}
          </a>
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-2">
          <p className="text-xs text-muted-foreground">
            Gerado em: {new Date(report.createdAt).toLocaleString()}
          </p>
          {report.confidence !== undefined && (
            <>
              <Separator
                orientation="vertical"
                className="h-4 hidden sm:block"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Confiança da IA:{" "}
                <Badge
                  variant="secondary"
                  className="text-sm px-2 py-0.5 font-semibold"
                >
                  {(report.confidence * 100).toFixed(0)}%
                </Badge>
              </p>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-6">
        {/* Mapeia dinamicamente todos os campos do objeto report.report */}
        {report.report &&
          Object.entries(report.report).map(([key, value]) => (
            <section key={key}>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {formatKey(key)}
              </h3>
              {Array.isArray(value) ? (
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {value.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 leading-relaxed">{String(value)}</p>
              )}
            </section>
          ))}
      </CardContent>
    </Card>
  );
}

/** Formata chave para exibição mais amigável */
function formatKey(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
