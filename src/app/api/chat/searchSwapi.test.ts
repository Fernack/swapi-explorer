import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchSwapi } from './searchSwapi';

describe('searchSwapi', () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = process.env;

  beforeEach(() => {
    process.env.BASE_URL = 'https://swapi.dev/api';
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
  });

  it('builds URL with encoded query and returns parsed JSON', async () => {
    let capturedUrl = '';
    globalThis.fetch = vi.fn((url: string) => {
      capturedUrl = url;
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ count: 1, results: [] }),
      } as Response);
    });

    const result = await searchSwapi('people', 'luke sky');

    expect(capturedUrl).toBe('https://swapi.dev/api/people/?search=luke%20sky');
    expect(result).toEqual({ count: 1, results: [] });
  });

  it('encodes special characters in query', async () => {
    let capturedUrl = '';
    globalThis.fetch = vi.fn((url: string) => {
      capturedUrl = url;
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response);
    });

    await searchSwapi('planets', 'tatooine?x=1');

    expect(capturedUrl).toContain(encodeURIComponent('tatooine?x=1'));
  });

  it('throws when response is not ok', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      } as Response)
    );

    await expect(searchSwapi('people', 'x')).rejects.toThrow('SWAPI request failed: Not Found');
  });
});
