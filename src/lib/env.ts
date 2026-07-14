/**
 * Env var access that works in both runtimes: `astro dev` exposes .env values
 * on import.meta.env, while the deployed Netlify Functions runtime provides
 * dashboard-configured vars on process.env.
 */
export function requireEnv(name: string): string {
  const value =
    (import.meta.env as Record<string, string | undefined>)[name] ??
    process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
