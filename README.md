# Michael Bazos - Resume Website

A modern, responsive resume website built with Astro and Tailwind CSS.

## Features

- 🎨 Clean, professional design
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive (mobile, tablet, desktop)
- 📄 PDF export capability
- ⚡ Fast static site generation
- 🎯 SEO-friendly

## Technologies

- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **PDF Export**: Playwright
- **Deployment**: Static hosting ready

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

## Project Structure

```
/
├── public/             # Static assets
│   └── favicon.svg
├── src/
│   ├── components/     # Reusable components
│   │   └── ThemeToggle.astro
│   ├── layouts/        # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/          # Page routes
│   │   └── index.astro # Main resume page
│   └── env.d.ts        # TypeScript environment types
├── tests/              # Playwright tests
│   └── pdf-generation.spec.ts
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Deployment

This site can be deployed to any static hosting service:

- **Netlify**: Connect your repo and deploy
- **Vercel**: Import project and deploy
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Cloudflare Pages**: Connect repo and configure build

Build command: `npm run build`
Output directory: `dist`

## Customization

### Content

Edit `src/pages/index.astro` to update resume content.

### Styling

- Modify `tailwind.config.mjs` for theme customization
- Edit component files for structural changes
- Adjust colors, fonts, and spacing in the Astro components

### Dark Mode

The dark mode toggle is automatically enabled. Theme preference is saved to localStorage.

## License

Personal project - All rights reserved.
