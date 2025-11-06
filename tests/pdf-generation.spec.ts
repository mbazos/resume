import { test } from '@playwright/test';

test('generate PDF from resume page', async ({ page }) => {
  // Navigate to the resume page
  await page.goto('/');

  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');

  // Optionally, ensure light mode for PDF (remove dark mode)
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });

  // Wait for fonts to load
  await page.waitForTimeout(1500);

  // Wait for any animations to complete
  await page.waitForLoadState('domcontentloaded');

  // Generate PDF with compact settings to maximize content per page
  await page.pdf({
    path: 'michael_bazos_resume.pdf',
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    scale: 0.92,  // Reduce scale for more compact layout
    displayHeaderFooter: false,
    margin: {
      top: '0.35in',
      right: '0.45in',
      bottom: '0.35in',
      left: '0.45in',
    },
  });

  console.log('PDF generated successfully: michael_bazos_resume.pdf');
});
