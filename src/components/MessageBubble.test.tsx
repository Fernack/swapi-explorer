/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageBubble } from './MessageBubble';

const baseMessage = {
  id: '1',
  role: 'user' as const,
  content: 'Hello',
  timestamp: new Date('2025-01-15T14:30:00'),
};

describe('MessageBubble', () => {
  it('renders user message content', () => {
    render(<MessageBubble message={baseMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders assistant message content', () => {
    render(
      <MessageBubble
        message={{
          ...baseMessage,
          id: '2',
          role: 'assistant',
          content: 'Hi there! How can I help?',
        }}
      />
    );
    expect(screen.getByText('Hi there! How can I help?')).toBeInTheDocument();
  });

  it('shows timestamp', () => {
    render(<MessageBubble message={baseMessage} />);
    // toLocaleTimeString format depends on locale; check that a time-like string exists
    const timeEl = screen.getByText(/\d{1,2}:\d{2}/);
    expect(timeEl).toBeInTheDocument();
  });

  it('renders multi-line content', () => {
    render(
      <MessageBubble
        message={{
          ...baseMessage,
          content: 'Line one\nLine two',
        }}
      />
    );
    expect(screen.getByText(/Line one/)).toBeInTheDocument();
    expect(screen.getByText(/Line two/)).toBeInTheDocument();
  });
});
