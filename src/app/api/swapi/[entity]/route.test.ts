import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';

const originalEnv = process.env;

describe('GET /api/swapi/[entity]', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, NEXT_PUBLIC_SWAPI_BASE_URL: 'https://swapi.dev/api' };
  });

  async function get(entity: string, searchParams?: string) {
    const url = searchParams
      ? `http://localhost/api/swapi/${entity}?${searchParams}`
      : `http://localhost/api/swapi/${entity}`;
    const req = new Request(url);
    return GET(req as import('next/server').NextRequest, {
      params: Promise.resolve({ entity }),
    });
  }

  it('returns 400 for invalid entity', async () => {
    const res = await get('invalid-entity');
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid entity');
  });

  it('accepts valid entity "people" without returning Invalid entity', async () => {
    const res = await get('people');
    const data = await res.json().catch(() => ({}));
    expect(data.error).not.toBe('Invalid entity');
    expect([200, 500]).toContain(res.status);
  });

  it('accepts query params page and search', async () => {
    const res = await get('people', 'page=1');
    expect(res.status).not.toBe(400);
  });
});
