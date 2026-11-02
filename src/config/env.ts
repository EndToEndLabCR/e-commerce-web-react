/**
 * Centralized access to Vite environment variables.
 *
 * NOTE: Only variables prefixed with `VITE_` are exposed to the client.
 */

export const BASE_API_URL =
  import.meta.env.VITE_BASE_API_URL ?? "http://127.0.0.1:8000";

export const API_VERSION = import.meta.env.VITE_API_VERSION ?? "/api/v1";

const normalizeSlash = (value: string): string => value.replace(/\/+$/, "");
const ensureLeadingSlash = (value: string): string =>
  value.startsWith("/") ? value : `/${value}`;

export const API_BASE_URL =
  normalizeSlash(BASE_API_URL) + ensureLeadingSlash(API_VERSION);
