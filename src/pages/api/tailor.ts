export const prerender = false;

import type { APIRoute } from 'astro';
import { tailorResume } from '../../lib/gemini';
import {
  DEFAULT_GEMINI_MODEL,
  GEMINI_MODELS,
  type GeminiModel,
} from '../../lib/tailor-types';

const MIN_JD_CHARS = 100;

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Map SDK/API failures to messages safe and useful to show in the UI. */
function friendlyError(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  if (/api.?key|permission|unauthenticated|401|403/i.test(message)) {
    return 'Gemini rejected the API key. Check GEMINI_API_KEY in your environment settings.';
  }
  if (/quota|rate|resource.?exhausted|429/i.test(message)) {
    return 'Gemini quota or rate limit hit. Wait a bit and try again, or switch models.';
  }
  if (/safety|blocked/i.test(message)) {
    return 'Gemini blocked this request (safety filters). Try editing the job description text.';
  }
  if (/timeout|timed out|deadline/i.test(message)) {
    return 'The request timed out. Try again, or use a faster flash model.';
  }
  return message;
}

export const POST: APIRoute = async ({ request }) => {
  let jobDescription: string;
  let model: GeminiModel;
  try {
    const body = await request.json();
    jobDescription = String(body.jobDescription ?? '').trim();
    model = (GEMINI_MODELS as readonly string[]).includes(body.model)
      ? (body.model as GeminiModel)
      : DEFAULT_GEMINI_MODEL;
  } catch {
    return json(400, { error: 'Invalid request body.' });
  }

  if (jobDescription.length < MIN_JD_CHARS) {
    return json(400, {
      error: `The job description is too short to tailor against (need at least ${MIN_JD_CHARS} characters).`,
    });
  }

  try {
    const { tailored, warnings } = await tailorResume(jobDescription, model);
    return json(200, {
      tailored,
      model,
      generatedAt: new Date().toISOString(),
      warnings,
    });
  } catch (err) {
    console.error('Tailor request failed:', err);
    return json(502, { error: friendlyError(err) });
  }
};
