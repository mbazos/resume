import type { APIRoute } from "astro";
import { chromium } from "playwright";

export const prerender = false;

function getFormattedDate(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);
  return `${month}_${day}_${year}`;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    // Check if we're in build mode by checking if the URL is localhost
    // During build, this endpoint is invoked but shouldn't actually run
    const baseUrl = url.origin;
    if (!baseUrl || baseUrl === 'http://localhost:4321' || baseUrl === 'http://localhost:3000') {
      // During build or when base URL is not available, return a helpful message
      // This prevents the build error while allowing the endpoint to work in dev/production
      return new Response(
        JSON.stringify({
          message: "PDF download endpoint - available only when server is running"
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to the home page
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

    // Generate PDF with print styles
    const pdf = await page.pdf({
      format: "A4",
      scale: 0.8,
      printBackground: true,
    });

    await browser.close();

    // Generate filename with current date
    const filename = `Michael_Bazos_Resume_${getFormattedDate()}.pdf`;

    // Convert Buffer to Uint8Array for proper Response handling
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
