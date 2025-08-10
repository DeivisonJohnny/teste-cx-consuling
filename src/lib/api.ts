export interface Report {
  id: string;
  url: string;
  createdAt: string;
  report: {
    layout_analysis: string;
    cta_evaluation: string;
    image_quality: string;
    description_clarity: string;
    improvements: string[];
  };
  confidence: number;
}

console.log(process.env.NEXT_PUBLIC_LOVABLE_API_BASE_URL);

export async function processUrl(url: string): Promise<Report> {
  if (!url || !url.startsWith("http")) {
    throw new Error("Invalid URL. Please enter a valid product page URL.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOVABLE_API_BASE_URL}/analyze`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to process URL");
  }

  const data = await response.json();
  return data as Report;
}

export async function getRecentReports(): Promise<Report[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOVABLE_API_BASE_URL}/reports`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  const data = await response.json();
  return data.reports || [];
}

export async function getReportById(id: string): Promise<Report> {
  if (!id) {
    throw new Error("Report ID is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOVABLE_API_BASE_URL}/reports/${id}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch report by ID");
  }

  const data = await response.json();
  return data as Report;
}
