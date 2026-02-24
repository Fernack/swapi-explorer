import { describe, it, expect, beforeEach } from 'vitest';

// Required before importing route (which loads openai.ts and creates the client)
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-test-dummy';

import { POST } from './route';

const originalEnv = process.env;

describe('POST /api/chat', () => {
  beforeEach(() => {
    process.env = { ...originalEnv, OPENAI_API_KEY: originalEnv.OPENAI_API_KEY || 'sk-test-dummy' };
  });

  async function post(body: unknown) {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return POST(req as import('next/server').NextRequest);
  }

  it('returns 400 when message is missing', async () => {
    const res = await post({});
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid message');
  });

  it('returns 400 when message is not a string', async () => {
    const res = await post({ message: 123 });
    expect(res.status).toBe(400);
    const resArray = await post({ message: [] });
    expect(resArray.status).toBe(400);
  });

  it('accepts string message and returns 200 (fallback when no API key)', async () => {
    process.env.OPENAI_API_KEY = '';
    const res = await post({ message: 'Hello' });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply).toBeDefined();
    expect(data.model).toBe('fallback');
  });

  it('returns 500 for invalid body (malformed JSON)', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    });
    const res = await POST(req as import('next/server').NextRequest);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe('Failed to process chat message');
  });
});
