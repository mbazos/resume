import { test, expect } from '@playwright/test';

test.describe('Resume Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Page Load and SEO', () => {
    test('should load the page successfully', async ({ page }) => {
      await expect(page).toHaveTitle(/Michael Bazos/);
    });

    test('should have correct meta description', async ({ page }) => {
      const description = await page.getAttribute('meta[name="description"]', 'content');
      expect(description).toContain('Software Architect');
      expect(description).toContain('Engineering Manager');
    });

    test('should have proper viewport meta tag', async ({ page }) => {
      const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
      expect(viewport).toContain('width=device-width');
    });
  });

  test.describe('Header Section', () => {
    test('should display name correctly', async ({ page }) => {
      const heading = page.locator('h1');
      await expect(heading).toContainText('Michael');
      await expect(heading).toContainText('Bazos');
    });

    test('should display job title', async ({ page }) => {
      const subtitle = page.locator('header p').first();
      await expect(subtitle).toContainText('Software Engineer');
      await expect(subtitle).toContainText('Architect');
      await expect(subtitle).toContainText('Engineering Manager');
    });

    test('should have email link', async ({ page }) => {
      const emailLink = page.locator('a[href="mailto:mbazos@gmail.com"]');
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toContainText('mbazos@gmail.com');
    });

    test('should have GitHub link', async ({ page }) => {
      const githubLink = page.locator('a[href="https://github.com/mbazos/"]');
      await expect(githubLink).toBeVisible();
      await expect(githubLink).toHaveAttribute('target', '_blank');
    });

    test('should have LinkedIn link', async ({ page }) => {
      const linkedinLink = page.locator('a[href="https://www.linkedin.com/in/mbazos"]');
      await expect(linkedinLink).toBeVisible();
      await expect(linkedinLink).toHaveAttribute('target', '_blank');
    });

    test('should display phone number', async ({ page }) => {
      await expect(page.locator('header')).toContainText('(413) 695-6074');
    });

    test('should display location', async ({ page }) => {
      await expect(page.locator('header')).toContainText('Easton, CT');
    });
  });

  test.describe('Introduction Section', () => {
    test('should have introduction text', async ({ page }) => {
      const intro = page.locator('section').first();
      await expect(intro).toContainText('Results-driven Software Architect');
    });
  });

  test.describe('Summary of Qualifications Section', () => {
    test('should have Summary of Qualifications heading', async ({ page }) => {
      const heading = page.locator('h2:has-text("Summary of Qualifications")');
      await expect(heading).toBeVisible();
    });

    test('should have qualification bullet points', async ({ page }) => {
      const section = page.locator('section:has(h2:has-text("Summary of Qualifications"))');
      const bullets = section.locator('li');
      expect(await bullets.count()).toBeGreaterThanOrEqual(4);
    });
  });

  test.describe('Experience Section', () => {
    test('should have Experience heading', async ({ page }) => {
      const heading = page.locator('h2:has-text("Experience")');
      await expect(heading).toBeVisible();
    });

    test('should display current position', async ({ page }) => {
      await expect(page.locator('main')).toContainText('Mobility Search & Book Development Manager');
    });

    test('should display Priceline experience', async ({ page }) => {
      await expect(page.locator('main')).toContainText('Priceline.com');
    });

    test('should have multiple job entries', async ({ page }) => {
      const experienceSection = page.locator('section:has(h2:has-text("Experience"))');
      const jobEntries = experienceSection.locator('.border-l-2');
      expect(await jobEntries.count()).toBeGreaterThanOrEqual(5);
    });

    test('should display job titles with dates', async ({ page }) => {
      // Check that job entries have date ranges
      await expect(page.locator('main')).toContainText('October 2025 - Present');
      await expect(page.locator('main')).toContainText('March 2024 - October 2025');
    });

    test('should list relevant technologies', async ({ page }) => {
      await expect(page.locator('main')).toContainText('Relevant Technologies:');
      await expect(page.locator('main')).toContainText('Java');
      await expect(page.locator('main')).toContainText('Kubernetes');
    });
  });

  test.describe('Education Section', () => {
    test('should have Education heading', async ({ page }) => {
      const heading = page.locator('h2:has-text("Education")');
      await expect(heading).toBeVisible();
    });

    test('should display degree information', async ({ page }) => {
      await expect(page.locator('main')).toContainText('B.S. Computer Science');
      await expect(page.locator('main')).toContainText('Sacred Heart University');
    });

    test('should display education details', async ({ page }) => {
      await expect(page.locator('main')).toContainText('Minor in Mathematics');
      await expect(page.locator('main')).toContainText('GPA 3.406');
    });
  });

  test.describe('Personal Projects Section', () => {
    test('should have Personal Interests heading', async ({ page }) => {
      const heading = page.locator('h2:has-text("Personal Interests")');
      await expect(heading).toBeVisible();
    });

    test('should display Volunteer Firefighter entry', async ({ page }) => {
      await expect(page.locator('main')).toContainText('Volunteer Firefighter');
      await expect(page.locator('main')).toContainText('evfc1.com');
    });

    test('should display Suadeo project', async ({ page }) => {
      await expect(page.locator('main')).toContainText('Suadeo');
      await expect(page.locator('main')).toContainText('React Native');
    });
  });

  test.describe('Footer Section', () => {
    test('should have footer with copyright', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toContainText("Michael Bazos's Resume");
      await expect(footer).toContainText(new Date().getFullYear().toString());
    });

    test('should have About This Resume section', async ({ page }) => {
      await expect(page.locator('main')).toContainText('About This Resume');
      await expect(page.locator('main')).toContainText('Claude Code');
    });
  });
});

test.describe('Theme Toggle', () => {
  test('should have theme toggle button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
  });

  test('should toggle dark mode on click', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const html = page.locator('html');
    const themeToggle = page.locator('#theme-toggle');

    // Get initial state
    const initialHasDark = await html.evaluate((el) => el.classList.contains('dark'));

    // Click toggle
    await themeToggle.click();

    // Verify state changed
    const afterClickHasDark = await html.evaluate((el) => el.classList.contains('dark'));
    expect(afterClickHasDark).toBe(!initialHasDark);
  });

  test('should persist theme preference', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const themeToggle = page.locator('#theme-toggle');

    // Set to dark mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    });

    // Click to toggle to dark
    await themeToggle.click();

    // Verify localStorage was updated
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });
});

test.describe('Download Button', () => {
  test('should have download PDF button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const downloadButton = page.locator('#download-pdf');
    await expect(downloadButton).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for h1
    const h1 = page.locator('h1');
    expect(await h1.count()).toBe(1);

    // Check that h2s exist
    const h2s = page.locator('h2');
    expect(await h2s.count()).toBeGreaterThanOrEqual(4);
  });

  test('should have alt text for interactive elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Theme toggle should have aria-label
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toHaveAttribute('aria-label');
  });

  test('should have lang attribute on html', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });
});

test.describe('Responsive Layout', () => {
  test('should be viewable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should be viewable on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should be viewable on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});
