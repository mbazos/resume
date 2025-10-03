import { test, expect } from '@playwright/test';

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

  // Generate PDF
  await page.pdf({
    path: 'michael_bazos_resume.pdf',
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in',
    },
  });

  console.log('PDF generated successfully: michael_bazos_resume.pdf');
});
