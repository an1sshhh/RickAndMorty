import type { Paginated } from "@/types/rick";

export const API_BASE = "https://rickandmortyapi.com/api";

export async function fetcher<T = any>(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch error ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

/**
 * Build a character list url with optional filters
 */
export function buildCharacterUrl(opts: {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}) {
  const params = new URLSearchParams();
  if (opts.page) params.set("page", String(opts.page));
  if (opts.name) params.set("name", opts.name);
  if (opts.status) params.set("status", opts.status);
  if (opts.species) params.set("species", opts.species);
  const qs = params.toString();
  return `${API_BASE}/character${qs ? `?${qs}` : ""}`;
}

/**
 * Build URL to fetch multiple characters by ids (comma separated)
 */
export function buildCharacterIdsUrl(ids: number[]) {
  if (ids.length === 0) return null;
  return `${API_BASE}/character/${ids.join(",")}`;
}
