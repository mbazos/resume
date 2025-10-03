# Resume Website Implementation Plan

## Overview

Build a personal resume website using Astro framework following the astro-resume template pattern (https://github.com/EmaSuriano/astro-resume), populated with data from original_michael_bazos_resume.pdf.

## Implementation Steps

### 1. Project Setup

- Initialize new Astro project using the astro-resume template structure
- Install dependencies: Astro, Tailwind CSS, TypeScript, Playwright
- Configure Tailwind and Astro settings
- Set up project structure (`src/pages/`, `src/components/`, `public/`)

### 2. Content Migration from original_michael_bazos_resume.pdf

**This step will be completed during Step 3 after the Astro project structure is in place.**

Extract all resume data from `original_michael_bazos_resume.pdf` and convert to Markdown format in `src/pages/index.md`:

**Header Section:**

- Name: Michael Bazos
- Title: Software Engineer / Distinguished Engineer
- Contact: mbazos@gmail.com, https://github.com/mbazos, (413) 695-6074
- Location: 135 Far Horizon Drive, 06612 Easton, CT

**Summary/Objective:**
Complete introductory paragraph from the PDF highlighting 15+ years of experience, technical expertise in Java, JavaScript (ES6+), Node.js, TypeScript, Python, and specialization in API design, web services, message brokers, and B2B integration.

**Summary of Qualifications:**
All bullet points from the PDF including:

- 15 years of experience with BS in Computer Science and Minor in Mathematics
- Problem analysis and solution design capabilities
- Technology adaptability
- Technical expertise areas
- Communication and mentorship skills
- Documentation expertise
- Shared component/library management
- JVM dev group leadership at Priceline

**Experience (6 positions with full details):**

1. **Distinguished Engineer Rental Car Services** - Priceline.com (Current)
   - All responsibilities and achievements
   - Relevant Technologies listed
2. **Principal Engineer Rental Car Services** - Priceline.com (Mar 2016-2018)
   - All responsibilities and achievements
   - Relevant Technologies listed
3. **Senior Software Engineer Rental Car Services** - Priceline.com (Apr 2013-2016)
   - All responsibilities and achievements
   - Relevant Technologies listed
4. **Senior Application Developer SE&I** - Cigna (Feb 2011-2013)
   - All responsibilities and achievements
   - Relevant Technologies listed
5. **Senior Application Developer EAS** - Cigna (Jan 2008-2011)
   - All responsibilities and achievements
   - Relevant Technologies listed
6. **Application Developer Single Sign On (SSO)** - Cigna (Jan 2006-2008)
   - All responsibilities and achievements
   - Relevant Technologies listed

**Education:**

- B.S. Computer Science, Sacred Heart University, Fairfield, CT (2002-2006)
- Minor in Mathematics
- GPA 3.406
- Upsilon Pi Epsilon Computer Science Honor Society Spring 2006
- SHU Football NCAA Division I–AA/FCS 2002-2005

**Personal Projects (5 projects with full descriptions):**

1. **Suadeo** (2020-Present) - Social network for TV & movies with full tech stack details
2. **Barnyard Fart Fest** (2014-2017) - Memory matching game with technical learnings
3. **Web Mail Scraper Outlook** (2015-2017) - OWA scraper app with 100k+ downloads
4. **Binary Clock Wallpaper** (2012) - Android live wallpaper with Play Store link
5. **Disposable Camera App** (2012) - Wedding app with geocoding features

### 3. Styling & Theme

- Configure Tailwind CSS for professional appearance
- Implement dark/light mode toggle
- Ensure responsive design for mobile/tablet/desktop
- Apply typography settings using Fontsource
- Match the clean, modern aesthetic of the astro-resume template

### 4. Build & Deploy Configuration

- Set up build scripts:
  - `npm install` / `yarn` - Install dependencies
  - `npm run dev` / `yarn dev` - Local development server
  - `npm run build` / `yarn build` - Production build
  - `npm run preview` / `yarn preview` - Local preview
- Configure PDF generation using Playwright
- Prepare for static hosting (Netlify, Vercel, or GitHub Pages)

### 5. Testing & Refinement

- Test all sections render correctly
- Verify responsive behavior on mobile/tablet/desktop
- Test PDF generation
- Review dark/light mode functionality
- Validate all links (GitHub, Suadeo, etc.)
- Check typography and spacing

## Technologies

- **Framework**: Astro (static site generator)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **PDF Export**: Playwright
- **Typography**: Fontsource
- **Deployment**: Static hosting (Netlify/Vercel/GitHub Pages)

## Key Features

- Markdown-based content for easy updates
- Full Tailwind CSS integration
- Dark/light mode support
- Responsive design
- PDF export capability
- Static site generation for fast loading
- SEO-friendly

## Deliverables

1. Fully functional resume website
2. Markdown-based content (`src/pages/index.md`) **populated with all content from original_michael_bazos_resume.pdf**
3. Responsive design working on all devices
4. Dark/light mode toggle
5. PDF export capability
6. Deployment-ready configuration
7. Clean, professional design matching industry standards

## Content Migration Strategy

The content from `original_michael_bazos_resume.pdf` will be migrated during **Step 3** of the implementation (after project setup is complete). This includes:

- Extracting all text content from the PDF
- Converting to properly formatted Markdown
- Preserving all sections: header, summary, qualifications, experience (all 6 positions with full bullet points), education, and personal projects (all 5 projects with descriptions)
- Maintaining all technical skills lists and relevant technologies for each position
- Including all links (GitHub, Suadeo.io, Play Store links, etc.)

## Reference

- Template: https://github.com/EmaSuriano/astro-resume
- Source: original_michael_bazos_resume.pdf
