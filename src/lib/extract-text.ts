/**
 * Hand-rolled HTML → plain text for job postings. The output is fed to an
 * LLM, which tolerates noisy extraction, so no parsing library is needed.
 */

const MAX_TEXT_LENGTH = 30_000;

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  mdash: '—',
  ndash: '–',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
  hellip: '…',
  bull: '•',
  middot: '·',
};

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
}

export function extractText(html: string): string {
  let text = html
    // Drop whole non-content blocks.
    .replace(
      /<(script|style|noscript|svg|iframe|template|head)\b[\s\S]*?<\/\1\s*>/gi,
      ' '
    )
    .replace(/<(nav|header|footer|aside|form)\b[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // Block-level boundaries become newlines, list items become bullets.
    .replace(/<li\b[^>]*>/gi, '\n- ')
    .replace(/<(br|hr)\b[^>]*>/gi, '\n')
    .replace(/<\/(p|div|li|tr|h[1-6]|section|article|ul|ol|table)\s*>/gi, '\n')
    // Strip every remaining tag.
    .replace(/<[^>]+>/g, ' ');

  text = decodeEntities(text)
    .replace(/[ \t\r]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return text.slice(0, MAX_TEXT_LENGTH);
}
