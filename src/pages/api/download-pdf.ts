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
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to the home page
    const baseUrl = url.origin;
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
