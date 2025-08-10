export interface Report {
  id: string;
  url: string;
  timestamp: string;
  croInsights: {
    layout: string;
    ctas: string;
    images: string;
    description: string;
  };
  confidenceScore?: number;
}

const LOCAL_STORAGE_KEY = "cro_reports";
const MAX_REPORTS = 5;

export async function processUrl(url: string): Promise<Report> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!url || !url.startsWith("http")) {
        reject(
          new Error("Invalid URL. Please enter a valid product page URL.")
        );
        return;
      }

      // Simulate AI processing and report generation
      const mockReport: Report = {
        id: crypto.randomUUID(),
        url,
        timestamp: new Date().toLocaleString(),
        croInsights: {
          layout: `The layout of "${url}" is generally good, but consider adding more visual hierarchy to guide the user's eye towards key information. Perhaps a clearer distinction between product details and reviews.`,
          ctas: `The "Add to Cart" button is present, but its color could be more contrasting to stand out. Consider A/B testing different button texts like "Buy Now" or "Add to Bag" for better conversion.`,
          images: `Images are high-resolution, which is great! However, adding a 360-degree view or lifestyle shots could further enhance user engagement and trust. Ensure images are optimized for faster loading.`,
          description: `The product description is informative, but it could benefit from more bullet points for scannability and highlighting key benefits rather than just features. A short, engaging headline would also help.`,
        },
        confidenceScore: Number.parseFloat(
          (Math.random() * (0.95 - 0.7) + 0.7).toFixed(2)
        ), // Simulate a confidence score between 0.7 and 0.95
      };

      // Simulate a random error for demonstration purposes
      if (Math.random() < 0.1) {
        // 10% chance of error
        reject(
          new Error(
            "AI service is temporarily unavailable. Please try again later."
          )
        );
      } else {
        resolve(mockReport);
      }
    }, 1500); // Simulate network latency
  });
}

/**
 * Retrieves the last N reports from local storage.
 * In a real application, this would fetch from your no-code backend's database.
 */
export function getRecentReports(): Report[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const storedReports = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedReports ? JSON.parse(storedReports) : [];
  } catch (error) {
    console.error("Failed to load reports from local storage:", error);
    return [];
  }
}

/**
 * Saves a new report to local storage, keeping only the last MAX_REPORTS.
 * In a real application, this would send the report to your no-code backend for storage.
 */
export function saveReport(report: Report): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const currentReports = getRecentReports();
    const updatedReports = [report, ...currentReports].slice(0, MAX_REPORTS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedReports));
  } catch (error) {
    console.error("Failed to save report to local storage:", error);
  }
}
