import type { APIRoute } from "astro";
import { chromium } from "playwright";

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

    // Convert Buffer to Uint8Array for proper Response handling
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Michael_Bazos_Resume.pdf"',
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
