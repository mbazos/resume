/**
 * Gemini-powered resume tailoring. Server-only — imports @google/genai and
 * reads GEMINI_API_KEY, so this must never be bundled into client scripts.
 */

import { GoogleGenAI, Type } from '@google/genai';
import { resume } from '../data/resume';
import { requireEnv } from './env';
import type { GeminiModel, TailoredResume } from './tailor-types';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    company: {
      type: Type.STRING,
      description: 'Company name extracted from the job description',
    },
    jobTitle: {
      type: Type.STRING,
      description: 'Job title extracted from the job description',
    },
    summary: {
      type: Type.STRING,
      description: 'Professional summary tailored to the job, 3 sentences max',
    },
    qualifications: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Up to 5 qualification bullets most relevant to the job',
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          items: { type: Type.STRING },
        },
        required: ['category', 'items'],
      },
      description: 'Up to 4 skill groups most relevant to the job',
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          company: { type: Type.STRING },
          location: { type: Type.STRING },
          dates: { type: Type.STRING },
          bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
          technologies: { type: Type.STRING },
        },
        required: ['title', 'company', 'location', 'dates', 'bullets', 'technologies'],
      },
      description: 'Up to 4 most relevant experience entries',
    },
    education: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Education lines, e.g. "B.S. Computer Science — Sacred Heart University"',
    },
    changeNotes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        '3-6 one-sentence notes explaining the most significant tailoring decisions — what was emphasized, omitted, reordered, or rephrased, and why, tied to the job description',
    },
  },
  required: [
    'company',
    'jobTitle',
    'summary',
    'qualifications',
    'skills',
    'experience',
    'education',
    'changeNotes',
  ],
};

function buildPrompt(jobDescription: string): string {
  return `You are tailoring a real person's resume to a specific job description.

THE RESUME (JSON, the only source of truth):
${JSON.stringify(resume, null, 2)}

THE JOB DESCRIPTION:
${jobDescription}

RULES — these are absolute:
1. You may ONLY select, reorder, trim, or lightly rephrase content that exists in the resume JSON above.
2. NEVER invent skills, employers, job titles, dates, metrics, technologies, or accomplishments that are not in the resume.
3. Copy "company", "title", "location", and "dates" values for experience entries VERBATIM from the resume JSON.
4. When rephrasing a bullet, preserve its factual claims exactly — no new numbers, no inflated scope.
5. Extract the company name and job title from the job description for the "company" and "jobTitle" fields. If the company is not stated, use "Unknown Company".

SINGLE-PAGE BUDGET — the output must fit one printed page:
- summary: at most 3 sentences.
- qualifications: at most 5 bullets, each chosen for relevance to this job.
- experience: at most 4 entries, most relevant first (keep reverse-chronological within equal relevance). Each entry: at most 3 bullets, each at most 25 words.
- skills: at most 4 categories; within a category you may drop items irrelevant to this job.
- education: 1 line per degree.
- Prefer OMITTING less-relevant content over compressing everything. A focused resume beats a crowded one.

Tailoring guidance: emphasize the resume content that best matches the job description's requirements, mirror the job description's terminology only where the resume genuinely supports it, and lead with the strongest matches.

CHANGE NOTES:
Fill "changeNotes" with 3-6 one-sentence notes explaining your most significant tailoring decisions — what you emphasized, omitted, reordered, or rephrased, and why, tied to specific requirements in the job description. These notes are metadata for the resume owner and are not part of the resume itself.`;
}

export interface TailorResult {
  tailored: TailoredResume;
  warnings: string[];
}

export async function tailorResume(
  jobDescription: string,
  model: GeminiModel
): Promise<TailorResult> {
  const ai = new GoogleGenAI({ apiKey: requireEnv('GEMINI_API_KEY') });

  const response = await ai.models.generateContent({
    model,
    contents: buildPrompt(jobDescription),
    config: {
      responseMimeType: 'application/json',
      responseSchema,
      temperature: 0.3,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error('Gemini returned an empty response.');
  }

  let tailored: TailoredResume;
  try {
    tailored = JSON.parse(text) as TailoredResume;
  } catch {
    throw new Error('Gemini returned invalid JSON.');
  }

  // Faithfulness post-check: every experience entry must correspond to a real
  // one. Drop anything the model altered or invented and surface a warning.
  const realEntries = new Set(
    resume.experience.map((e) => `${e.company}|${e.dates}`)
  );
  const warnings: string[] = [];
  tailored.experience = (tailored.experience ?? []).filter((entry) => {
    if (realEntries.has(`${entry.company}|${entry.dates}`)) return true;
    warnings.push(
      `Dropped an experience entry the model altered or invented: "${entry.title}" at "${entry.company}" (${entry.dates}).`
    );
    return false;
  });

  if (tailored.experience.length === 0) {
    throw new Error(
      'The model failed to produce any faithful experience entries. Try again (or a different model).'
    );
  }

  return { tailored, warnings };
}
