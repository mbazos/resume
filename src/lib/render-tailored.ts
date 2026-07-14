/**
 * Renders a tailored resume (from localStorage history) to HTML. Runs in the
 * browser on /tailor/view — keep this free of server-only imports.
 *
 * Uses the main resume's visual language (orange headings, blue left-border
 * entries) in a more compact form so the result fits a single printed page.
 * Tailwind JIT scans this file; classes must be complete literal strings.
 */

import { resume } from '../data/resume';
import type { HistoryEntry, TailoredExperience, TailoredSkillGroup } from './tailor-types';

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function bulletList(items: string[], spacing: string): string {
  return `
    <ul class="${spacing} text-gray-700 dark:text-gray-300">
      ${items
        .map(
          (item) => `
        <li class="flex gap-2">
          <span class="text-orange-600 dark:text-orange-400">•</span>
          <span>${escapeHtml(item)}</span>
        </li>`
        )
        .join('')}
    </ul>`;
}

function sectionHeading(title: string): string {
  return `<h2 class="text-xl font-bold mb-3 text-orange-600 dark:text-orange-400">${title}</h2>`;
}

function renderExperience(job: TailoredExperience): string {
  return `
    <div class="tailored-entry mb-4 border-l-2 border-blue-600 dark:border-blue-400 pl-4">
      <div class="flex justify-between items-start mb-1">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">${escapeHtml(job.title)}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">${escapeHtml(job.company)}, ${escapeHtml(job.location)}</p>
        </div>
        <span class="text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap pl-4">${escapeHtml(job.dates)}</span>
      </div>
      ${bulletList(job.bullets, 'space-y-1 mb-1')}
      <p class="text-sm text-gray-600 dark:text-gray-400">
        <span class="font-semibold">Relevant Technologies:</span> ${escapeHtml(job.technologies)}
      </p>
    </div>`;
}

function renderSkills(groups: TailoredSkillGroup[]): string {
  return `
    <ul class="space-y-1 text-gray-700 dark:text-gray-300">
      ${groups
        .map(
          (group) => `
        <li><span class="font-semibold">${escapeHtml(group.category)}:</span> ${escapeHtml(group.items)}</li>`
        )
        .join('')}
    </ul>`;
}

export function renderTailoredResume(entry: HistoryEntry): string {
  const { resume: tailored } = entry;
  const [firstName, ...restOfName] = resume.name.split(' ');
  const lastName = restOfName.join(' ');
  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
    <header class="mb-6 text-center">
      <h1 class="text-3xl font-bold mb-1">
        ${escapeHtml(firstName)}
        <span class="text-orange-600 dark:text-orange-400">${escapeHtml(lastName)}</span>
      </h1>
      <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400 mb-2">
        <a href="mailto:${escapeHtml(resume.contact.email)}" class="hover:text-orange-600 dark:hover:text-orange-400">${escapeHtml(resume.contact.email)}</a>
        <span>${escapeHtml(resume.contact.phone)}</span>
        <span>${escapeHtml(resume.contact.location)}</span>
        <a href="${escapeHtml(resume.contact.linkedin)}" target="_blank" rel="noopener noreferrer" class="hover:text-orange-600 dark:hover:text-orange-400">linkedin</a>
        <a href="${escapeHtml(resume.contact.github)}" target="_blank" rel="noopener noreferrer" class="hover:text-orange-600 dark:hover:text-orange-400">github</a>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">
        Tailored for ${escapeHtml(tailored.jobTitle)} at ${escapeHtml(tailored.company)} — ${escapeHtml(date)}
      </p>
    </header>

    <section class="mb-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">${escapeHtml(tailored.summary)}</p>
    </section>

    <section class="mb-5">
      ${sectionHeading('Summary of Qualifications')}
      ${bulletList(tailored.qualifications, 'space-y-1')}
    </section>

    <section class="mb-5">
      ${sectionHeading('Technical Skills')}
      ${renderSkills(tailored.skills)}
    </section>

    <section class="mb-5">
      ${sectionHeading('Experience')}
      ${tailored.experience.map(renderExperience).join('')}
    </section>

    <section class="mb-5">
      ${sectionHeading('Education')}
      <ul class="space-y-1 text-gray-700 dark:text-gray-300">
        ${tailored.education.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}
      </ul>
    </section>`;
}
