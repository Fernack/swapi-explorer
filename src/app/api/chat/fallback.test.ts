import { describe, it, expect } from 'vitest';
import { fallbackResponse } from './fallback';

describe('fallbackResponse', () => {
  const getReply = (res: Response) => res.json().then((body: { reply: string }) => body.reply);
  const getModel = (res: Response) => res.json().then((body: { model: string }) => body.model);

  it('returns status 200 and model "fallback"', async () => {
    const res = fallbackResponse('hello');
    expect(res.status).toBe(200);
    expect(await getModel(res)).toBe('fallback');
  });

  it('responds about Luke / Skywalker', async () => {
    expect(await getReply(fallbackResponse('Who is Luke?'))).toContain('Luke Skywalker');
    expect(await getReply(fallbackResponse('Tell me about Skywalker'))).toContain('Luke Skywalker');
  });

  it('responds about Vader / Anakin', async () => {
    expect(await getReply(fallbackResponse('Who is Vader?'))).toContain('Darth Vader');
    expect(await getReply(fallbackResponse('Anakin'))).toContain('Darth Vader');
  });

  it('responds about Tatooine', async () => {
    expect(await getReply(fallbackResponse('Where is Tatooine?'))).toContain('Tatooine');
  });

  it('responds about Millennium Falcon', async () => {
    expect(await getReply(fallbackResponse('the millennium falcon'))).toContain('Millennium Falcon');
    expect(await getReply(fallbackResponse('the falcon'))).toContain('Millennium Falcon');
  });

  it('responds about the Force', async () => {
    expect(await getReply(fallbackResponse('What is the force?'))).toContain('Force');
  });

  it('returns default message for unknown questions', async () => {
    const reply = await getReply(fallbackResponse('random question'));
    expect(reply).toContain('C-3PO');
    expect(reply).toContain('OPENAI_API_KEY');
  });

  it('includes notice when no API key is set', async () => {
    const body = (await fallbackResponse('hi').json()) as { notice?: string };
    expect(body.notice).toBeDefined();
    expect(body.notice).toContain('OPENAI_API_KEY');
  });
});
