/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInterface } from './ChatInterface';

describe('ChatInterface', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('shows welcome message on load', async () => {
    render(<ChatInterface />);
    await waitFor(() => {
      expect(screen.getByText(/Greetings! I am C-3PO/)).toBeInTheDocument();
    });
  });

  it('calls POST /api/chat with message and history when user sends a message', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ reply: 'Test reply from API', model: 'fallback' }),
    } as Response);

    const user = userEvent.setup();
    render(<ChatInterface />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Ask about Star Wars/)).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/Ask about Star Wars/);
    await user.type(input, 'Who is Luke?');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/chat',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const body = JSON.parse((globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
    expect(body.message).toBe('Who is Luke?');
    expect(Array.isArray(body.history)).toBe(true);
    expect(body.history.some((h: { role: string; content: string }) => h.content === 'Who is Luke?')).toBe(true);
  });

  it('displays assistant reply after successful API response', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ reply: 'Luke Skywalker is a hero from Tatooine.', model: 'fallback' }),
    } as Response);

    const user = userEvent.setup();
    render(<ChatInterface />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Ask about Star Wars/)).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/Ask about Star Wars/), 'Who is Luke?');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker is a hero from Tatooine.')).toBeInTheDocument();
    });
  });

  it('shows error when API returns non-ok', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid message' }),
    } as Response);

    const user = userEvent.setup();
    render(<ChatInterface />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Ask about Star Wars/)).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/Ask about Star Wars/), 'Hello');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid message')).toBeInTheDocument();
    });
  });

  it('clicking suggested question sends that message to /api/chat', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ reply: 'Suggested reply', model: 'fallback' }),
    } as Response);

    const user = userEvent.setup();
    render(<ChatInterface />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Who is Luke Skywalker\?/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /Who is Luke Skywalker\?/i }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/chat',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    const body = JSON.parse((globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
    expect(body.message).toBe('Who is Luke Skywalker?');
  });
});
