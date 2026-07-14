/**
 * Types and constants shared between the /tailor server endpoints and the
 * browser-side UI. Keep this file free of server-only imports — it is
 * bundled into client scripts.
 */

export const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.5-flash-lite',
] as const;

export type GeminiModel = (typeof GEMINI_MODELS)[number];

export const DEFAULT_GEMINI_MODEL: GeminiModel = 'gemini-2.5-flash';

export interface TailoredSkillGroup {
  category: string;
  items: string;
}

export interface TailoredExperience {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
  technologies: string;
}

export interface TailoredResume {
  company: string;
  jobTitle: string;
  summary: string;
  qualifications: string[];
  skills: TailoredSkillGroup[];
  experience: TailoredExperience[];
  education: string[];
}

export interface HistoryEntry {
  id: string;
  createdAt: string; // ISO timestamp
  company: string;
  jobTitle: string;
  model: string;
  resume: TailoredResume;
  warnings: string[];
}

export const HISTORY_STORAGE_KEY = 'tailor-history';
