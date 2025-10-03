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

To generate a PDF version of the resume:

1. First, build the site:
   ```bash
   npm run build
   ```

2. Then generate the PDF:
   ```bash
   npm run generate-pdf
   ```

The PDF will be saved as `michael_bazos_resume.pdf` in the project root.

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
