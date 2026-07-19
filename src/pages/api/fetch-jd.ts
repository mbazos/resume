export const prerender = false;

import type { APIRoute } from 'astro';
import { extractText } from '../../lib/extract-text';

const FETCH_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
const MIN_EXTRACTED_CHARS = 200;

const PASTE_INSTEAD =
  "Couldn't read a job description from that URL (many job sites block automated access). Paste the job description text instead.";

const PRIVATE_HOST_PATTERN =
  /^(localhost|0\.0\.0\.0|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1\]?$)/i;

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let url: URL;
  try {
    const body = await request.json();
    url = new URL(String(body.url ?? ''));
  } catch {
    return jsonError(400, 'Enter a valid URL (including https://).');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return jsonError(400, 'Only http(s) URLs are supported.');
  }
  if (
    PRIVATE_HOST_PATTERN.test(url.hostname) ||
    url.hostname.endsWith('.local')
  ) {
    return jsonError(400, 'That host is not allowed.');
  }

  let response: Response;
  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
  } catch {
    return jsonError(502, PASTE_INSTEAD);
  }

  if (!response.ok) {
    return jsonError(502, PASTE_INSTEAD);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!/text\/html|application\/xhtml|text\/plain/i.test(contentType)) {
    return jsonError(422, PASTE_INSTEAD);
  }

  const buffer = await response.arrayBuffer();
  if (buffer.byteLength > MAX_RESPONSE_BYTES) {
    return jsonError(422, PASTE_INSTEAD);
  }

  const text = extractText(new TextDecoder().decode(buffer));
  if (text.length < MIN_EXTRACTED_CHARS) {
    // Likely a JavaScript-rendered page with no static content.
    return jsonError(422, PASTE_INSTEAD);
  }

  return new Response(JSON.stringify({ text }), {
    headers: { 'Content-Type': 'application/json' },
  });
};