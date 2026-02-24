/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetailModal } from './DetailModal';

const defaultStats = [
  { label: 'Height', value: '172' },
  { label: 'Mass', value: '77' },
  { label: 'Homeworld', value: 'Tatooine' },
];

describe('DetailModal', () => {
  it('renders title when open', () => {
    render(
      <DetailModal
        title="Luke Skywalker"
        stats={defaultStats}
        open={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByRole('dialog', { name: 'Luke Skywalker' })).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('renders all stats with labels and values', () => {
    render(
      <DetailModal
        title="Character"
        stats={defaultStats}
        open={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('Mass')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('Homeworld')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });

  it('renders numeric stat values as text', () => {
    render(
      <DetailModal
        title="Test"
        stats={[{ label: 'Count', value: 42 }]}
        open={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Count')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders unknown stat value as em dash via StatBadge', () => {
    render(
      <DetailModal
        title="Test"
        stats={[{ label: 'Unknown Field', value: undefined as unknown as string }]}
        open={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Unknown Field')).toBeInTheDocument();
    // StatBadge shows "—" for unknown/n/a values
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renders extras when provided', () => {
    render(
      <DetailModal
        title="Planet"
        stats={[{ label: 'Climate', value: 'Arid' }]}
        extras={[
          { label: 'Featured in', value: 'A New Hope' },
          { label: 'Terrain', value: 'Desert' },
        ]}
        open={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('Desert')).toBeInTheDocument();
  });

  it('does not render extras section when extras is empty', () => {
    render(
      <DetailModal
        title="Minimal"
        stats={defaultStats}
        extras={[]}
        open={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Minimal')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    // No extra labels like "Featured in" from a typical extras list
    expect(screen.queryByText('Featured in')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <DetailModal
        title="Close me"
        stats={defaultStats}
        open={true}
        onClose={onClose}
      />
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
