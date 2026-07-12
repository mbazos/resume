/**
 * Generates the downloadable resume PDF from the built site in dist/.
 *
 * The page is rendered with *screen* styles (not print styles) in light mode,
 * so the PDF looks identical to the website. Runs as part of `npm run build`.
 *
 * Requires a Playwright chromium browser (npx playwright install chromium).
 */
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const outputFile = path.join(distDir, 'Michael_Bazos_Resume.pdf');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

if (!existsSync(path.join(distDir, 'index.html'))) {
  console.error('dist/index.html not found - run `astro build` first.');
  process.exit(1);
}

// Minimal static file server for dist/ so chromium can load the built site.
const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let filePath = path.normalize(path.join(distDir, urlPath));
    if (!filePath.startsWith(distDir)) {
      res.writeHead(403).end();
      return;
    }
    if (urlPath.endsWith('/')) {
      filePath = path.join(filePath, 'index.html');
    }
    const body = await readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': contentTypes[ext] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

// CHROMIUM_PATH overrides the Playwright-managed browser (e.g. in CI images
// that ship their own chromium build).
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });

  // Light theme, regardless of any OS-level dark preference.
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));

  // Keep screen styles for the PDF so it matches the website exactly.
  await page.emulateMedia({ media: 'screen' });

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });

  // Hide the floating buttons and keep page breaks from splitting entries.
  // Everything else renders exactly as on screen.
  await page.addStyleTag({
    content: `
      #download-pdf, #theme-toggle { display: none !important; }
      .border-l-2 { break-inside: avoid; }
      h2 { break-after: avoid; }
      li { break-inside: avoid; }
    `,
  });

  // scale 0.8 makes the A4 page ~992 CSS px wide, so the layout paginates at
  // the same width it renders at in a desktop browser window.
  const pdf = await page.pdf({
    format: 'A4',
    scale: 0.8,
    printBackground: true,
    margin: { top: '8mm', bottom: '8mm', left: '0mm', right: '0mm' },
  });

  await writeFile(outputFile, pdf);
  console.log(`PDF generated: ${outputFile}`);
} finally {
  await browser.close();
  server.close();
}
