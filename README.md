# Michael Bazos - Resume Website

A modern, responsive resume website built with Astro and Tailwind CSS.

## Features

- 🎨 Clean, professional design
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive (mobile, tablet, desktop)
- 📄 PDF export capability
- ⚡ Fast static site generation
- 🎯 SEO-friendly
- 🤖 Private AI resume tailoring (`/tailor`, Gemini-powered)

## Technologies

- **Framework**: Astro 4.x (hybrid output — static pages + server API routes)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **PDF Export**: Playwright
- **AI**: Google Gemini (`@google/genai`)
- **Deployment**: Netlify (`@astrojs/netlify` adapter)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321/`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Generate PDF

The PDF is generated automatically at build time by `scripts/generate-pdf.mjs`, which renders the built site in headless Chromium using the website's normal screen styles (light theme, floating buttons hidden) so the PDF looks identical to the website. It is written to `dist/Michael_Bazos_Resume.pdf`, and the site's PDF button is a plain link to that file.

```bash
npm run build          # astro check + astro build + PDF generation
npm run build:only     # build without the PDF step
npm run generate-pdf   # regenerate the PDF from an existing dist/ build
```

Requires a Playwright Chromium browser (one-time setup):

```bash
npx playwright install chromium
```

Note: in `npm run dev` the PDF link 404s until you've run a build, since the file is a build artifact.

## Resume Tailor (`/tailor`)

A private, password-protected tool that tailors the resume to a specific job description using Google Gemini.

**How it works:**

1. Log in at `/tailor/login` (single shared password, no accounts).
2. Paste a job posting URL and click **Fetch** — the server extracts the text. If the site blocks scraping, paste the job description text directly.
3. Pick a Gemini model (`gemini-2.5-flash` default and fastest, `gemini-2.5-pro` highest quality, `gemini-2.5-flash-lite` cheapest; your last choice is remembered) and click **Generate**.
4. The tailored resume opens at `/tailor/view` styled like the main resume, with a header showing the job title, company, and date. **Download PDF** prints it to a single-page PDF via the browser.

Gemini may only select, reorder, trim, or rephrase content from `src/data/resume.ts` — never invent anything. The server additionally verifies every returned experience entry against the real resume and drops (with a warning) anything that doesn't match.

History is stored in browser localStorage only — there is no database and nothing generated is stored server-side.

### Environment variables

Copy `.env.example` to `.env` for local dev and set the same variables in the Netlify dashboard for production:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Google Gemini API key ([aistudio.google.com](https://aistudio.google.com/)) |
| `TAILOR_PASSWORD` | Password for the `/tailor` pages |
| `SESSION_SECRET` | Signs session cookies — generate with `openssl rand -hex 32` |

## Project Structure

```
/
├── public/             # Static assets
│   └── favicon.svg
├── src/
│   ├── components/     # Reusable components
│   ├── data/
│   │   └── resume.ts   # Resume content (single source of truth)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/            # Session, Gemini, and rendering helpers
│   ├── middleware.ts   # Auth guard for /tailor and /api
│   ├── pages/
│   │   ├── index.astro # Main resume page (public, static)
│   │   ├── tailor/     # Private tailoring UI (login, form, view)
│   │   └── api/        # Server endpoints (auth, fetch-jd, tailor)
│   └── env.d.ts        # TypeScript environment types
├── tests/              # Playwright tests
│   └── pdf-generation.spec.ts
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Deployment

The site deploys to **Netlify** (configured in `netlify.toml`). The public resume stays fully static; the `/tailor` pages and `/api` routes run as a Netlify Function via the `@astrojs/netlify` adapter.

Build command: `npm run build`
Output directory: `dist`
Requires Node 20+ and the three environment variables above.

## Customization

### Content

Edit `src/data/resume.ts` to update resume content — it is the single source of truth, rendered by `src/pages/index.astro` and used by the `/tailor` feature.

### Styling

- Modify `tailwind.config.mjs` for theme customization
- Edit component files for structural changes
- Adjust colors, fonts, and spacing in the Astro components

### Dark Mode

The dark mode toggle is automatically enabled. Theme preference is saved to localStorage.

## License

Personal project - All rights reserved.
